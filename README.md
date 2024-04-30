# Library_Me: An application for finding and saving books
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]
  ## Description
  This project was designed as a proof of concept that a typical mongoDB based app can be refactored using graphql. The application is meant to allow the user to log in and select books they want to read by clicking the saved button. These saved books will then end up on their saved books page and can be looked at and deleted as desired. 

  ## Link to the app
  https://library-me-f6bf0424056f.herokuapp.com/
  
   ## Installation
 The application does not need to be installed, simply follow the link, make an account, and then enjoy searching for and saving books to your profile. If you desire, this repository can be saved to your local machine and then run by first using "cd" to get into the main folder of the repository. Assuming you already have node.js installed in your machine, the next step is to use the command "npm install" in the terminal which will populate the node modules. Then you use the command "npm run build" which builds the dist folder. Lastly the command "npm run start" or "npm run develop" can be used to open the application in the browser using localhost:3000.  

   ## User Story
  AS AN avid reader
I WANT to search for new books to read
SO THAT I can keep a list of books to purchase

  ## Acceptance Criteria
  GIVEN a book search engine
WHEN I load the search engine
THEN I am presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button
WHEN I click on the Search for Books menu option
THEN I am presented with an input field to search for books and a submit button
WHEN I am not logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site
WHEN I click on the Login/Signup menu option
THEN a modal appears on the screen with a toggle between the option to log in or sign up
WHEN the toggle is set to Signup
THEN I am presented with three inputs for a username, an email address, and a password, and a signup button
WHEN the toggle is set to Login
THEN I am presented with two inputs for an email address and a password and login button
WHEN I enter a valid email address and create a password and click on the signup button
THEN my user account is created and I am logged in to the site
WHEN I enter my account’s email address and password and click on the login button
THEN I the modal closes and I am logged in to the site
WHEN I am logged in to the site
THEN the menu options change to Search for Books, an option to see my saved books, and Logout
WHEN I am logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site and a button to save a book to my account
WHEN I click on the Save button on a book
THEN that book’s information is saved to my account
WHEN I click on the option to see my saved books
THEN I am presented with all of the books I have saved to my account, each featuring the book’s title, author, description, image, and a link to that book on the Google Books site and a button to remove a book from my account
WHEN I click on the Remove button on a book
THEN that book is deleted from my saved books list
WHEN I click on the Logout button
THEN I am logged out of the site and presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button  
  ## Usage
 Once the installation instructions have been followed, the user can create a user profile which will allow them to search for books and save them
 ## Challenges
 I ran into many challenges trying to refactor this code. Ultimately the project won and I didn't. I spent nearly 20 hours on this project and didn't even get it complete. I used 2 tutoring sessions, plus office hours to try and get assistance which helped me eliminate some of the bugs but didn't even allow the project to be completed. Here is what the code in the repository WILL do when installed on your local machine, it will allow you to sign up or log in which will reveal the save buttons when a book is searched for. When a save button is pushed an error message will appear in the console saying that the user must be logged in. I can tell from the amount of time I spent TRYING to get this to work that there is something wrong with authentication which isn't allowing the server-side to recognize the client-side is logged in. I experimented extensively with different plugins and server.js and auth.js configurations as well as trying to modify the SAVE_BOOK resolver. While many bugs I came across I did successfully eliminate, ultimately I ran out of tutoring sessions, and ran out of time. The app was deployed to Heroku as well as Render but will not even load on either platform because there is an error with the app platforms communicating with the mongoDB database. Again, I ran out of time and help. So with that, I present to you, what is most definitely not my finest work, but just know that I did try VERY HARD to make this work out. 
  ## Contributing
  This project was created by Luke Stroehlein with base code from BCS and the BCS tutors Charles Puente-Matos and Benicio Lopez for debugging the application. Justing Gonzalez also worked with me extensively over chat and video, trying to help, but the limiting factor is the relative unfamiliarity with graphql amongst my peers. Much help was found on the internet including resources such as w3schools and stack overflow.
  ## License
  This project is licensed under the MIT license.
  ## Tests
  The best way to test this project is to follow the installation instructions for running it on your local machine.


  ## Questions
  If you have any questions, please feel free to reach out to me at strolinedigital@gmail.com. 
  You can also view my GitHub profile at https://github.com/StrolineDigital