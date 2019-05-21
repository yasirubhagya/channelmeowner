import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import MainAdminPannel from './AdminSection/Main';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import { Route, Switch ,Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
class App extends Component {

  state={
    user:localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):null
  }

  setUserHandle=(user)=>{
    this.setState({user:user});
  }
   
  render() {
    
    return (
      <BrowserRouter>
      {this.state.user?
        <MainAdminPannel setUserHandle={this.setUserHandle}/>
        
        :
        <Login setUserHandle={this.setUserHandle}/>
       
      }
      
            
      </BrowserRouter>
    );

  }
}

export default App;
