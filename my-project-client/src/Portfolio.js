import React from 'react'
import Stock from './Stock'
import SearchBar from './SearchBar'


export default class Portfolio extends React.Component {
    renderPortfolio = () => {
        return this.props.portfolio.map(stock => < Stock key={stock.symbol} stock={stock} removeStock={this.props.removeStock}/> )
    }

  render() {
    return (
      <div>
          <strong>Portfolio</strong>
          < SearchBar />
        {this.renderPortfolio()}
      </div>
    )
  }
}