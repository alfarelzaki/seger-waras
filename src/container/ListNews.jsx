import React, { Component } from 'react';
import  axios from 'axios'
import './App.css';
import { Button, Card } from 'antd';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articleList: []
    }
  }

  componentDidMount() {
    axios.get('https://newsapi.org/v2/everything?q=health&sources=bbc-news&apiKey=2b12af439fb44401863d04f54f2bddba')
    .then(res => {
      this.setState({
        articleList: res.data.articles
      })
      console.log(res.data)
    })
  }

  render() {
    return (
      <div>
        <CardList articles={this.state.articleList}></CardList>
        <Button type="primary">Add article</Button>
      </div>
    );
  }
}

const CardList = (props) => {
  return (
    <div className="article-list">
      {props.articles.map((article) =>
        <Card title={article.title}>
          {article.content}
        </Card>   
      )}
    </div>
  );
}

export default App;
