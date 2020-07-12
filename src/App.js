import React from 'react';
import './App.css';
import Authorised from './Authorised';
import {Input} from 'semantic-ui-react'

export default class App extends React.Component {
  state = {
    username: "",
    user_id: "",
    password: "",
    portfolio: [],
    loggedIn: false,
    isLoading: true,
  }
  
  getToken = () => {
    return localStorage.getItem("jwt");
  };

componentDidMount = () => {
  if (localStorage.jwt) {
    fetch('http://localhost:3000/profile', {
      headers: {
        Authorization: this.getToken()
    },
  })
    .then(resp => resp.json())
    .then(res => this.setState({
        loggedIn: true,
        username: res.user.username,
        user_id: res.user.id,
        portfolio: res.transactions,
        password: "",
        isLoading: false,
    }))
    .catch(error => {console.log(error.message)
      localStorage.removeItem("jwt")
      this.setState({
        isLoading: false
      })
    });
  } else {
    this.setState({ isLoading: false })
  }
}

handleCreate = (event) => {
  event.preventDefault();
  event.target.reset();
  const { username, password } = this.state;
  const userData = { username, password };
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ user: userData }),
  })
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem("jwt", res.jwt);
      return res;
    })
    .then(console.log);
};

handleLogin = (event) => {
  event.preventDefault();
  const { username, password } = this.state;
  const userData = { username, password };
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ user: userData }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.jwt) {
        localStorage.setItem("jwt", res.jwt)
        this.setState({
          loggedIn: true,
          username: res.user.username,
          user_id: res.user.id,
          portfolio: res.transactions,
          password: ""
        })
      }
      return res;
    }).catch(error => console.log(error.message))
};

handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  getUserName = () => {
    return JSON.parse(atob(this.getToken().split(".")[1])).username;
  };


  logOut = () => {
    localStorage.removeItem("jwt");
    this.setState({
      loggedIn: false,
      username: "",
      user_id: ""
    });
  };
  
  render() {
    if (this.state.isLoading) return  null 
    
    return (
      <div >
          {this.state.loggedIn
            ?
            <>
            < Authorised username={this.state.username} user_id={this.state.user_id} portfolio={this.state.portfolio} logOut={this.logOut}/>
            </>
            :
          < div className="loginPage" Align='center'>
          <h5>Log In</h5>
          <form onSubmit={this.handleLogin} Align='center'>
            <Input className="input"
              name="username"
              onChange={this.handleInputChange}
              type="text"
              placeholder="username"
            />
            <Input className="input"
              name="password"
              onChange={this.handleInputChange}
              type="password"
              placeholder="password"
            />
            <button className="input buttun" type="submit" >Log In</button>
          </form> 
          <h5>Sign up</h5>
          <form onSubmit={this.handleCreate} >
            <Input className="input"
              name="username"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Username"
            />
            <Input className="input"
              name="password"
              onChange={this.handleInputChange}
              type="password"
              placeholder="password"
            />
            <button className="input buttun" type="submit" >Sign Up</button>
          </form>
          </div> }
      </div>
    );
  }
}