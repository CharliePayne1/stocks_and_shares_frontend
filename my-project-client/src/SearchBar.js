import React from 'react'

export default class SearchBar extends React.Component {
  render() {
    return (
      <>
      <label htmlFor="search">Search by Symbol:</label>
      <input text="text" value={this.props.searchInput} onChange={(e) => this.props.handleSearchChange(e)}></input>
      </>
    )
  }
}