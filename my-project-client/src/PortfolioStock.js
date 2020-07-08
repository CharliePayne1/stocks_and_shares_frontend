import React from 'react'
import { Card, CardContent, CardHeader, CardMeta } from 'semantic-ui-react'


export default class PortfolioStock extends React.Component {



  render() {
    return (
        <Card>
            <CardContent>
                <CardHeader>{this.props.transaction.stock_symbol||"nothing"}</CardHeader>
                <CardMeta>Cost ${this.props.transaction.cost||"nothing"}</CardMeta>
            </CardContent>
            <button onClick={() => this.props.removeStock(this.props.transaction)}>Sell</button>
        </Card>
    )
  }
}