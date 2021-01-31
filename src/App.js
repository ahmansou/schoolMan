
import "bootstrap/dist/css/bootstrap.min.css"; 
import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import Store from "./hooks/Store";

class App extends Component{
  render () {
    return (  
      <Store>
        <Layout />
      </Store>
    );
  }
}

export default App;
