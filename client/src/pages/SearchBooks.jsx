import { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchGoogleBooks } from '../utils/API';
import { saveBookIds} from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';

//The searchBooks component is used to search for books using the Google Books API and a graphql mutation to save the book to the database
const SearchBooks = () => {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState([]);

  const [saveBookMutation] = useMutation(SAVE_BOOK);

  useEffect(() => {
    saveBookIds(savedBookIds);
  }, [savedBookIds]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => {
        // Check if volumeInfo and authors exist before accessing them
        const authors = book.volumeInfo && book.volumeInfo.authors ? book.volumeInfo.authors : ['No author to display'];
      //This returs the book data
        return {
          bookId: book.id,
          authors: Array.isArray(authors) ? authors : [authors], // Convert authors to array if it's not already
          title: book.volumeInfo ? book.volumeInfo.title : 'No title available',
          description: book.volumeInfo ? book.volumeInfo.description : 'No description available',
          image: book.volumeInfo && book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail || '' : '',
        };
      });
      
      
      setSavedBookIds(bookData);
      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };
//This function is used to save the book to the database
  const handleSaveBook = async (bookData) => {
    console.log ('handling saved book')
    console.log(bookData);
    if (!bookData) {
      console.error('Invalid book data:', bookData);
      return;
    }
  
    const { bookId, authors, description, title, image } = bookData;
      console.log('this is bookId', bookId);
    // Provide a default value for authors if it's undefined
    const bookToSave = {
      bookId: bookId, // Assigning the value of bookId
      authors: authors ? authors : ['No author to display'],
      description: description || '',
      title: title || '',
      image: image?.thumbnail || '',
    };
      console.log(bookToSave);
  //This block of code checks to see if the user is logged in and if they are it saves the book to the database
    const token = Auth.loggedIn() ? Auth.getToken() : null;
  
    if (!token) {
      return false;
    }

    console.log(token)
  
    try {
      
      const {data } = await saveBookMutation({
        variables: { 
          authors: authors,
          description: description,
          title: title,
          bookId: bookId,
          image: image 
        }
      });
      
      console.log(data);
     

      setSavedBookIds(bookData);
      console.log(bookId);
      console.log('Book saved successfully!');
    } catch (error) {
      console.error(error);
      console.log('Book failed to save!');
    }
  };
  return (
<>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                      disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(book)}>
                      {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                        ? 'This book has already been saved!'
                        : 'Save this Book!'}
                    </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;

