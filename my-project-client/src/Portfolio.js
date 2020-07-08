import React from 'react'
import PortfolioStock from './PortfolioStock'

export default class Portfolio extends React.Component {
    renderPortfolio = () => {
        return this.props.portfolio.map((transaction) => < PortfolioStock key={transaction.id} transaction={transaction} removeStock={this.props.removeStock}/> )
    }

  render() {
    return (
      <div>
        <strong>Available Funds: £</strong>
        <br></br>
          <strong>Portfolio</strong>
        {this.renderPortfolio()}
      </div>
    )
  }
}