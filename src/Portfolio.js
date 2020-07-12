import React from 'react'
import PortfolioStock from './PortfolioStock'
import { Grid, Image, Button} from 'semantic-ui-react'


export default class Portfolio extends React.Component {
  state = {
    cashReturn: []
    }

    countCash = (cash) => {
      this.setState({
        cashReturn: [...this.state.cashReturn, cash]
      })
    }

    renderPortfolio = () => {
        return this.props.portfolio.length && this.props.portfolio.map((transaction) => < PortfolioStock key={transaction.id} transaction={transaction} removeStock={this.props.removeStock} stocks={this.props.stocks} countCash={this.countCash}/> )
    }

    caclulateTotalInvestmentSpend = () => {
      return this.props.portfolio.reduce((a, b) => a + b.cost, 0)
    }

    averageSpend = () => {
      return (this.caclulateTotalInvestmentSpend() / this.props.portfolio.length).toFixed(2)
    }

    caclulateTotalInvestmentReturn = () => {
      return this.props.portfolio.reduce((a, b) => a + parseFloat(b.return_on_investment), 0).toFixed(2)
    }

  render() {
    return (
      <div className="portfolio">
        <h5>Portfolio Analytics</h5>
        <p>total return on investments: ${this.caclulateTotalInvestmentReturn()}</p>
        <p>Total cost of investments: ${this.caclulateTotalInvestmentSpend()}</p>
        <p>Average spend per share: ${this.averageSpend()}</p>
          <h3>Portfolio</h3>
          <p>Showing all {this.props.portfolio.length} shares in your portfolio</p>
        <div className="portfolioContainer">{this.renderPortfolio()}</div>
      </div>
    )
  }
}