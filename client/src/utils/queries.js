import { gql } from '@apollo/client';
//This query is used to specify the data that will be requested from the server
export const GET_ME = gql`
    query me {
        me {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            
        }
        }
    }
    `;

    