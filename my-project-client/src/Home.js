import React from 'react'
import ArticleCard from './ArticleCard'

export default class Home extends React.Component {
  renderArticles = () => {
    return this.props.news.map((article, index) => <ArticleCard  key={index} article={article}/>)
  }

  render() {
    return (
      <div className="newsHeader">
        <h2>Daily business news update</h2>
        <div className="articleGrid">{this.renderArticles()}</div>
      </div>
    )
  }
}