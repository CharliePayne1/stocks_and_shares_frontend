import React from 'react'
import Stock from './Stock'
import SearchBar from './SearchBar'


export default class StockContainer extends React.Component {
    
    renderStocks = () => {
        return this.props.stocks.map(stock => < Stock key={stock.symbol} stock={stock} addToPortfolio={this.props.addToPortfolio}/> )
    }

  render() {
    return (
      <div>
        <strong>All Stocks</strong>
        < SearchBar />
        {this.renderStocks()}
      </div>
    )
  }
}