import React, { Component } from 'react';
import './App.css';
import Search from './components/Search.js';
import Table from './components/Table.js';
import Button from './components/Button.js';

  const list = [];

  const DEFAULT_QUERY = 'redux';
  const DEFAULT_HPP = '100';

  const PATH_BASE = 'https://hn.algolia.com/api/v1';
  const PATH_SEARCH = '/search';
  const PARAM_SEARCH = 'query=';
  const PARAM_PAGE = 'page=';
  const PARAM_HPP = 'hitsPerPage=';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result: null,
      list,
      searchTerm: DEFAULT_QUERY,
      page: 0
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  setSearchTopStories(result) {
    const { hits, page } = result;

    const oldHits = page !== 0 ? this.state.result.hits : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      result: { hits: updatedHits, page}
    });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    console.log(`fetching ${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss = (id) => {
    const updatedList = this.state.result.hits.filter(item => item.objectID !== id);

    this.setState({ 
      result: {...this.state.result, hits: updatedList}
    });
  }

  onSearchChange = (textoBusca) => {
    this.setState({ searchTerm: textoBusca.target.value });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  render() {
    const { searchTerm, result } = this.state;
    const page = (result && result.page) || 0;

    return (
      <div className="page">
        <div className="interactions">
          <Search searchTerm={searchTerm} onSearchSubmit={this.onSearchSubmit} onSearchChange={this.onSearchChange}> Search </Search>
        </div>
        {result && <Table result={result.hits} searchTerm={searchTerm} onDismiss={this.onDismiss}/>}
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}> More </Button>
        </div>
      </div>
    );
  }
}

export default App;
