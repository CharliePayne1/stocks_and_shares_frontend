import React from 'react'
import {Image, Button} from 'semantic-ui-react'

export default class Stock extends React.Component {

  render() {
  return (
    <>
    <div className= "stock" padding="20px">
         <Image width="300px" src={`http://api.tradingphysics.com/getchart?type=pi&date=${(this.props.stock.date).slice(0,10).replace(/-/g,"")}&indicators=MarketIndicator.$.Outstanding.VolumeQ+MarketIndicator.$.Executed.VolumeA+MarketIndicator.$.Executed.AgeA&stock=${this.props.stock.symbol}&days=2`} wrapped ui={true} />
           <br></br>
            <strong>{this.props.stock.symbol}</strong>
            <br></br>
            <span >Opening price: ${this.props.stock.open}</span>
            <br></br>
            <span >Closing price: ${this.props.stock.close}</span>
            <br></br>
          Difference: ${(this.props.stock.open - this.props.stock.close).toFixed(2)}
          <br></br>
        Last updated: {(this.props.stock.date).slice(0, 10)}
        <br></br>
        <Button className="buyButton" primary onClick={() => this.props.addToPortfolio(this.props.stock)}>Buy</Button>
    
        </div>
        <br></br>
        </>
    )
  }
}

  {/* <Grid item xs={8}>
    <Image src={`http://api.tradingphysics.com/getchart?type=pi&date=${(this.props.stock.date).slice(0,10).replace(/-/g,"")}&indicators=MarketIndicator.$.Outstanding.VolumeQ+MarketIndicator.$.Executed.VolumeA+MarketIndicator.$.Executed.AgeA&stock=${this.props.stock.symbol}&days=2`} wrapped ui={true} />
      <Paper>
      {this.props.stock.symbol}
        <span >Opening price: ${this.props.stock.open}</span>
        <br></br>
        <span >Closing price: ${this.props.stock.close}</span>
        <br></br>
      Difference: ${(this.props.stock.open - this.props.stock.close).toFixed(2)}
      <br></br>
    Last updated: {(this.props.stock.date).slice(0, 10)}
        </Paper>
    <button onClick={() => this.props.addToPortfolio(this.props.stock)}>Buy</button>
  </Grid> */}
      