import React from 'react'

export default class PortfolioStock extends React.Component {
  render() {
    return (
        <div className="portfolioStock">
            <strong>{this.props.transaction.stock_symbol}</strong>
                <h5>Cost of share: ${this.props.transaction.cost}</h5>
                <h5>Return on investment: ${this.props.transaction.return_on_investment.toFixed(2)}</h5>
                <h5>% Return on investment: {this.props.transaction.return_percentage.toFixed(2)}%</h5>
            <button className="sell" onClick={() => this.props.removeStock(this.props.transaction)}>Sell</button>
      </div>
    )
  }
}