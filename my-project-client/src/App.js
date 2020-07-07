import React from 'react';
import './App.css';
import StockContainer from './StockContainer';
import Portfolio from './Portfolio'
import Home from './Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
} from "react-router-dom";


export default class App extends React.Component {
  state = {
    stocks: [], 
    portfolio: [],
    dateSelected: "2020-07-02",
    username: "",
    password: "",
    loggedIn: false
    }

    // handle login, logout as pieces of apps state
    // 
  
    componentDidMount() {
          fetch('http://localhost:3000/stocks')
          .then(resp => resp.json())
          .then(data => this.setState({stocks: data.data}))
          .catch(error => console.log(error.message));
        }

addToPortfolio = (stock) => {
  return this.state.portfolio.find(portfolioStock => portfolioStock === stock) ? null :
  this.setState({portfolio: [...this.state.portfolio, stock]})
}

  removeStock = (stock) => {
    this.setState({
      portfolio: this.state.portfolio.filter(portfolioStock => portfolioStock !== stock) 
      })
        }

        handleDateChange = async (e) => {
          await this.setState({
            dateSelected: e.target.value
          })
          this.updateStocks()
        }

        updateStocks = () => {
          fetch("http://localhost:3000/stocks", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date: this.state.dateSelected })
          })
          .then(res => res.json())
          .then(data => this.setState({stocks: data.data})
          ) 
        }

        
        //       render() {
          //         return (
            //           <Router>
            //             <h4>Stocks and Shares App</h4>
            //         <div>
            //           {/* if logged in render auhtorised, if logged out render unauthosed */}
            //           {/* turn this into Unathorised  */}
            //               <Link to="/">Home   | </Link>
            //               {/* turn these two into "authorised" component */}
            //               <Link to="/portfolio">Portfolio   | </Link>
            //               <Link to="/stocks">Stocks</Link>
            
            
            //           <Switch>
            //             <Route path="/portfolio">
            //             < Portfolio portfolio={this.state.portfolio} removeStock={this.removeStock}/>
            //             </Route>
            //             <Route path="/stocks">
            //             < StockContainer 
            //                 stocks={this.state.stocks} 
            //                 addToPortfolio={this.addToPortfolio}
            //                 handleDateChange={this.handleDateChange}
            //                 dateSelected={this.state.dateSelected}
            //                 />
            //             </Route>
            //             <Route exact path="/">
            //               <Home />
            //             </Route>
            //             <Redirect to="/"/>
            //           </Switch>
            //         </div>
            //       </Router>
            //     );
            // }

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
  event.target.reset();
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
      localStorage.setItem("jwt", res.jwt);
      this.setState({
        loggedIn: true,
      });
      return res;
    })
    .then(console.log);
};

handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
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
        <p>
          {this.state.loggedIn
            ? `logged in as ${this.getUserName()}`
            : `logged out`}
        </p>

          <form onSubmit={this.handleCreate}>
            <input
              id="username"
              onChange={this.handleInputChange}
              type="text"
              placeholder="username"
            />
            <input
              id="password"
              onChange={this.handleInputChange}
              type="password"
              placeholder="password"
            />
            <input type="submit" value="sign up" />
          </form>
          <form onSubmit={this.handleLogin}>
            <input
              id="username"
              onChange={this.handleInputChange}
              type="text"
              placeholder="username"
            />
            <input
              id="password"
              onChange={this.handleInputChange}
              type="password"
              placeholder="password"
            />
            <input type="submit" value="log in" />
          </form>

        <button onClick={this.logOut}>log out</button>
      </div>
    );
  }
}