import React from 'react'
import Stock from './Stock'

export default class StockContainer extends React.Component {
    
    renderStocks = () => {
        this.props.stocks.map(stock => < Stock key={stock.id} stock={stock.content["$t"]}/> )
    }

  render() {
    return (
      <div>
        All Stocks:
      </div>
    )
  }
}