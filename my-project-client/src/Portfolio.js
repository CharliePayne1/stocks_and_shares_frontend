import React from 'react'
import PortfolioStock from './PortfolioStock'
import { Grid, Image, Button} from 'semantic-ui-react'


export default class Portfolio extends React.Component {
    renderPortfolio = () => {
        return this.props.portfolio.length && this.props.portfolio.map((transaction) => < PortfolioStock key={transaction.id} transaction={transaction} removeStock={this.props.removeStock} stocks={this.props.stocks}/> )
    }

    caclulateTotalInvestmentSpend = () => {
      return this.props.portfolio.reduce((a, b) => a + b.cost, 0)
    }

    averageSpend = () => {
      return this.caclulateTotalInvestmentSpend() / this.props.portfolio.length
    }

  render() {
    return (
      <div className="portfolio">
        <h2>Available Funds: £</h2>
        <h5>Portfolio Analytics</h5>
        <p>Total cost of investments: ${this.caclulateTotalInvestmentSpend()}</p>
        <p>Average spend per share: ${this.averageSpend()}</p>
          <h3>Portfolio</h3>
          <p>Showing all {this.props.portfolio.length} shares in your portfolio</p>
        <div className="portfolioContainer">{this.renderPortfolio()}</div>
      </div>
    )
  }
}