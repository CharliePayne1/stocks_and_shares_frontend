import React from 'react';
import './App.css';
import StockContainer from './StockContainer';

export default class Model extends React.Component {
  state = {
    stocks: []
    }
  
    componentDidMount() {
          fetch('http://localhost:3000/stocks')
          .then(resp => resp.json())
          .then(data => this.setState({stocks: data.feed.entry}))
          .catch(error => console.log(error.message));
        }

  render() {
    return (
      <div className="App">
      Stocks and Shares App
      < StockContainer stocks={this.state.stocks}/>
    </div>
    )
  }
}