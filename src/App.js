import React, { Component } from 'react';
import './App.css';
import Search from './components/Search.js';
import Table from './components/Table.js';
import Button from './components/Button.js';
import fetch from 'isomorphic-fetch';

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
      results: null,
      searchKey: '',
      list,
      error: null,
      searchTerm: DEFAULT_QUERY,
      page: 0
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  setSearchTopStories = (result) => {
    const { hits, page } = result;
    const { results, searchKey } = this.state;

    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      results: { ...results, [searchKey]: {hits: updatedHits, page}}
    });

    this.setState({list: results[searchKey].hits})
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    console.log(`fetching ${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => this.setState({error: e}));
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    this.setState({ searchKey: searchTerm });
  }

  onDismiss = (id) => {
    console.log('starting onDismiss...')
    const {results, searchKey} = this.state;
    const {hits, page} = results[searchKey];
    const updatedList = hits.filter(item => item.objectID !== id);
    this.setState({ 
      results: {...results, [searchKey]: { hits: updatedList, page}}
    });
  }

  onSearchChange = (textoBusca) => {
    this.setState({ searchTerm: textoBusca.target.value });
  }

  onSearchSubmit = (event) => {
    const { searchTerm } = this.state;
    this.setState({searchKey: searchTerm});
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  render() {
    const { searchTerm, results, searchKey, error } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;

    return (
      <div className="page">
        <div className="interactions">
          <Search searchTerm={searchTerm} onSearchSubmit={this.onSearchSubmit} onSearchChange={this.onSearchChange}> Search </Search>
        </div>
        {results && error ? <Table list={results[searchKey].hits} searchTerm={searchTerm} onDismiss={this.onDismiss}/> : <h3>Something went wrong.</h3>}
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}> More </Button>
        </div>
      </div>
    );
  }
}

export default App;

export { Button, Search, Table};