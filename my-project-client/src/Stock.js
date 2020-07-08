import React from 'react'
import { Card, Image } from 'semantic-ui-react'

export default class Stock extends React.Component {

  render() {
  return (
  <Card>
    <Image src={`http://api.tradingphysics.com/getchart?type=pi&date=${(this.props.stock.date).slice(0,10).replace(/-/g,"")}&indicators=MarketIndicator.$.Outstanding.VolumeQ+MarketIndicator.$.Executed.VolumeA+MarketIndicator.$.Executed.AgeA&stock=${this.props.stock.symbol}&days=2`} wrapped ui={true} />
    <Card.Content>
      <Card.Header>{this.props.stock.symbol}</Card.Header>
      <Card.Meta>
        <span className='date'>Opening price: ${this.props.stock.open}</span>
      </Card.Meta>
      <Card.Meta>
        <span className='date'>Closing price: ${this.props.stock.close}</span>
      </Card.Meta>
      <Card.Description>
      Difference: ${(this.props.stock.open - this.props.stock.close).toFixed(2)}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
    Last updated: {(this.props.stock.date).slice(0, 10)}
    </Card.Content>
    <button onClick={() => this.props.addToPortfolio(this.props.stock)}>Buy</button>
  </Card>
      )
  }
}