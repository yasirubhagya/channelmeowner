import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';

const authToken = localStorage.getItem('authToken');
const client = new ApolloClient({
  uri: 'https://channelmebackend.herokuapp.com/graphql',
  cache: new InMemoryCache(),
  headers: {authorization:authToken? `Bearer ${authToken}` :null}
  });

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));

