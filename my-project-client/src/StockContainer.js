import React from 'react'
import Stock from './Stock'
import SearchBar from './SearchBar'
import Calender from './Calender'


export default class StockContainer extends React.Component {
  state = {
    searchInput: "",
    }

    handleSearchChange = (e) => {
      this.setState({
        searchInput: e.target.value
      })
    }
    
    searchedStocks = () => {
      const newStocks = this.props.stocks.filter(stock => stock.symbol.toLowerCase().includes(this.state.searchInput.toLowerCase()))
      return newStocks.map((stock, index) => < Stock key={index} stock={stock} addToPortfolio={this.props.addToPortfolio}/> )
    }
    
    showStocks = () => {
      return this.props.stocks.map((stock, index) => < Stock key={index} stock={stock} addToPortfolio={this.props.addToPortfolio}/> )
    }

    renderStocks = () => {
    if (this.state.searchInput === "") {
      return this.showStocks()
    } 
    return this.searchedStocks()
    }

  render() {
    return (
      <div>
        <h5>All Stocks</h5>
        < SearchBar searchInput={this.state.searchInput} handleSearchChange={this.handleSearchChange}/>
        <Calender 
        handleDateChange={this.props.handleDateChange}
        dateSelected={this.props.dateSelected}
        />
        {this.renderStocks()}
      </div>
    )
  }
}