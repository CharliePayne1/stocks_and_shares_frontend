import React from 'react';
import './App.css';
import Authorised from './Authorised';


export default class App extends React.Component {
  state = {
    username: "",
    user_id: "",
    password: "",
    portfolio: [],
    loggedIn: false
  }
  
  getToken = () => {
    return localStorage.getItem("jwt");
  };

componentDidMount = () => {
  if (localStorage.jwt) {
    fetch('http://localhost:3000/profile', {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
    },
  })
    .then(resp => resp.json())
    .then(console.log)
    .then(res => this.setState({
      loggedIn: true,
      portfolio: res.transactions,
      password: ""
    }))
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
        console.log(res)
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


  logOut = () => {
    localStorage.removeItem("jwt");
    this.setState({
      loggedIn: false,
      username: "",
      user_id: ""
    });
  };
  
  render() {
    return (
      <div>
        <h4>Homepage</h4>
          {this.state.loggedIn
            ?
            <>
            < Authorised username={this.state.username} user_id={this.state.user_id} portfolio={this.state.portfolio}/>
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