import { useState,useEffect } from 'react'; // Import React explicitly
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const { loading, error, data } = useQuery(GET_ME);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (data) {
      setUserData(data.me);
    }
  }, [data]);

  const [removeBookMutation] = useMutation(REMOVE_BOOK);

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBookMutation({
        variables: { bookId },
      });

      // Assuming the mutation returns the updated user data
      const updatedUser = data.removeBook.user;

      setUserData(updatedUser);
      removeBookId(bookId);
      console.log('Book deleted successfully!');
    } catch (error) {
      console.error(error);
      console.log('Book failed to delete!');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data!</p>;

  return (
    <>
      <div className="text-light bg-dark p-5"> {/* Removed 'fluid' */}
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container fluid> {/* Added fluid property here */}
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => (
            <Col md="4" key={book.bookId}>
              <Card border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
