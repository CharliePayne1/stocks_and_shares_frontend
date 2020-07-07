import React from 'react'
import Stock from './Stock'


export default class Portfolio extends React.Component {
    renderPortfolio = () => {
        return this.props.portfolio.map(stock => < Stock key={stock.symbol} stock={stock} removeStock={this.props.removeStock}/> )
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