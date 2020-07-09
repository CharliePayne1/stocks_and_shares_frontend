import React from 'react'
import { Grid, Image, Button} from 'semantic-ui-react'


export default class PortfolioStock extends React.Component {
    

    calculateCashReturn = () => {
        const upToDateStock = this.props.stocks.find(stock => stock.symbol === this.props.transaction.stock_symbol)
        console.log(upToDateStock)
        return upToDateStock ? (upToDateStock.close - this.props.transaction.cost).toFixed(2) : null
      }

      calculatePercentageReturn = () => {
        const upToDateStock = this.props.stocks.find(stock => stock.symbol === this.props.transaction.stock_symbol)
        console.log(upToDateStock)
        return upToDateStock ? (((upToDateStock.close - this.props.transaction.cost) / this.props.transaction.cost ) * 100).toFixed(4) : null
      }

  render() {
    return (
        <div padding="20px">
            <strong>{this.props.transaction.stock_symbol}</strong>
            <br></br>
            Cost of share: ${this.props.transaction.cost}
            <br></br>
            Return on investment: ${this.calculateCashReturn()}
            <br></br>
            % Return on investment: {this.calculatePercentageReturn()}%
            <br></br>
            <Button color='red' onClick={() => this.props.removeStock(this.props.transaction)}>Sell</Button>
      </div>
    )
  }
}