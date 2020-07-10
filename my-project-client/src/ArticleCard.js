import React from 'react'

export default class ArticleCard extends React.Component {
  render() {
    return (
      <div className="article">
        <a href={this.props.article.url} target="_blank">
        <img height="400" src={this.props.article.multimedia[0].url} />
        <h5>{this.props.article.title}</h5>
        <p>{this.props.article.byline}</p></a>
      </div>
    )
  }
}