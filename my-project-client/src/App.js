import React from 'react';
import './App.css';
import Authorised from './Authorised';


export default class App extends React.Component {
  state = {
    username: "",
    password: "",
    loggedIn: false
    }

componentDidMount = () => {
  if (localStorage.jwt) {
    fetch('http://localhost:3000/profile', {
      headers: {Authorization: localStorage.jwt}
    })
    .then(resp => resp.json())
    .then(data => this.setState({loggedIn: true}))
    .catch(error => console.log(error.message));
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
          username: "",
          password: ""
        })
      }
      return res;
    }).then(console.log)
    .catch(error => console.log(error.message))
};

handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  getUserName = () => {
    return JSON.parse(atob(this.getToken().split(".")[1])).username;
  };

  getToken = () => {
    return localStorage.getItem("jwt");
  };

  logOut = () => {
    localStorage.removeItem("jwt");
    this.setState({
      loggedIn: false,
    });
  };
  
  render() {
    return (
      <div>
        <h4>Homepage</h4>
          {this.state.loggedIn
            ?
            <>
            < Authorised />
            <button onClick={this.logOut}>log out</button>
            </>
            :
          <>
          <form onSubmit={this.handleCreate}>
            <input
              name="username"
              onChange={this.handleInputChange}
              type="text"
              placeholder="username"
            />
            <input
              name="password"
              onChange={this.handleInputChange}
              type="password"
              placeholder="password"
            />
            <input type="submit" value="sign up" />
          </form>
          <form onSubmit={this.handleLogin}>
            <input
              name="username"
              onChange={this.handleInputChange}
              type="text"
              placeholder="username"
            />
            <input
              name="password"
              onChange={this.handleInputChange}
              type="password"
              placeholder="password"
            />
            <input type="submit" value="log in" />
          </form> 
          </> }
      </div>
    );
  }
}