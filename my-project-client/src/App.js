import React from 'react';
import './App.css';
import StockContainer from './StockContainer';
import Portfolio from './Portfolio'
import NavBar from './NavBar'

export default class Model extends React.Component {
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

        handleDateChange = (e) => {
          this.setState({
            dateSelected: e.target.value
          }, this.updateStocks)
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
          .then(data => this.setState({stocks: data}))
        }

  render() {
    return (
      <div className="App">
      Stocks and Shares App
      < NavBar />
      < Portfolio portfolio={this.state.portfolio} removeStock={this.removeStock}/>
      < StockContainer 
      stocks={this.state.stocks} 
      addToPortfolio={this.addToPortfolio}
      handleDateChange={this.handleDateChange}
      dateSelected={this.state.dateSelected}
      />
    </div>
    )
  }
}