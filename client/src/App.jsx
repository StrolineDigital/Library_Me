import './App.css';
import { Outlet } from 'react-router-dom';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
//This code is used to create a new Apollo client
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

import Navbar from './components/Navbar';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <Navbar />
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;

