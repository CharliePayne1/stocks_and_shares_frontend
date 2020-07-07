import React from 'react'
import StockContainer from './StockContainer';
import Portfolio from './Portfolio'
import Home from './Home'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";

export default class Authorised extends React.Component {
    state = {
        stocks: [], 
        portfolio: [],
        dateSelected: "2020-07-02"
    }

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

    render() {
        return (
            <Router>
                <h4>Welcome {this.state.username}</h4>
                <Link to="/">Home   | </Link>
                <Link to="/portfolio">Portfolio   | </Link>
                <Link to="/stocks">Stocks</Link>

            <Switch>
                <Route path="/portfolio">
                < Portfolio portfolio={this.state.portfolio} removeStock={this.removeStock}/>
                </Route>
                <Route path="/stocks">
                < StockContainer 
                    stocks={this.state.stocks} 
                    addToPortfolio={this.addToPortfolio}
                    handleDateChange={this.handleDateChange}
                    dateSelected={this.state.dateSelected}
                    />
                </Route>
                <Route exact path="/">
                <Home />
                </Route>
                <Redirect to="/"/>
            </Switch>
        </Router>
        );
    }
}