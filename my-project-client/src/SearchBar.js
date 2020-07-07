import React from 'react'

export default class SearchBar extends React.Component {
  render() {
    return (
      <>
      <label htmlFor="search" placeholder='Search...'>Search Stocks by <strong>Symbol:</strong></label>
      <input text="text" value={this.props.searchInput} onChange={(e) => this.props.handleSearchChange(e)}></input>
      </>
    )
  }
}