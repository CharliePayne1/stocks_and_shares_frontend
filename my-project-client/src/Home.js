import React from 'react'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <span>Log in Page</span>
        <br></br>
        <label>Username:</label>
        <input type="text"></input>
        <label>Password:</label>
        <input type="password"></input>
      </div>
    )
  }
}