import React from 'react'

export default class Stock extends React.Component {


  render() {
    return (
      <div>
        <h5>Stock Name: {this.props.stock.symbol}</h5>
        <button onClick={() => this.props.addToPortfolio(this.props.stock)}>Buy</button>
        <button onClick={() => this.props.removeStock(this.props.stock)}>Sell</button>
        <p>Opening price: ${this.props.stock.open}</p>
        <p>Closing price: ${this.props.stock.close}</p>
        <p>Difference: ${(this.props.stock.open - this.props.stock.close).toFixed(2)}</p>
        <p>Volume: {this.props.stock.volume}</p>
        <p>Last updated: {(this.props.stock.date).slice(0, 10)}</p>
        <img src={`http://api.tradingphysics.com/getchart?type=pi&date=${(this.props.stock.date).slice(0,10).replace(/-/g,"")}&indicators=MarketIndicator.$.Outstanding.VolumeQ+MarketIndicator.$.Executed.VolumeA+MarketIndicator.$.Executed.AgeA&stock=${this.props.stock.symbol}&days=2`} alt="graph"></img>
        <br></br>
      </div>
    )
  }
}