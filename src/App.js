import React, { Component } from "react";
import "./App.css";
import Search from "./components/Search";
import Table from "./components/Table";
import Button from "./components/Button";
import fetch from "isomorphic-fetch";
import { sortBy } from "lodash";

const list = [];

const DEFAULT_QUERY = "redux";
const DEFAULT_HPP = "100";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const PARAM_HPP = "hitsPerPage=";

const Loading = () => <div>Loading...</div>;

const withLoading = Component => ({ isLoading, ...rest }) =>
  isLoading ? <Loading /> : <Component {...rest} />;

const ButtonWithLoading = withLoading(Button);

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, "title"),
  AUTHOR: list => sortBy(list, "author"),
  COMMENTS: list => sortBy(list, "num_comments").reverse(),
  POINTS: list => sortBy(list, "points").reverse()
};

class App extends Component {
  state = {
    results: null,
    searchKey: "",
    list,
    error: null,
    searchTerm: DEFAULT_QUERY,
    page: 0,
    isLoading: false,
    sortKey: "NONE",
    isSortReverse: false
  };

  setSearchTopStories = result => {
    const { hits, page } = result;
    const { results, searchKey } = this.state;

    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];

    const updatedHits = [...oldHits, ...hits];
    const updatedResults = {
      ...results,
      [searchKey]: { hits: updatedHits, page }
    };
    const updatedList = updatedResults[searchKey].hits;

    this.setState({
      ...this.state,
      results: updatedResults,
      list: updatedList,
      isLoading: false
    });
  };

  fetchSearchTopStories = (searchTerm, page = 0) => {
    this.setState({ isLoading: true });
    console.log(
      `fetching ${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`
    );
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => {
        this.setState({ error: e, isLoading: false });
      });
  };

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    this.setState({ searchKey: searchTerm });
  }

  onDismiss = id => {
    console.log("starting onDismiss...");
    const { results, searchKey } = this.state;
    const { hits, page } = results[searchKey];
    console.log("hits", hits);
    const updatedList = hits.filter(item => item.objectID !== id);
    console.log("updated list", updatedList);
    console.log("current list before update", this.state.list);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedList, page }
      },
      list: updatedList
    });
    console.log("list after update", this.state.list);
  };

  onSearchChange = textoBusca => {
    this.setState({ searchTerm: textoBusca.target.value });
  };

  onSearchSubmit = event => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  };

  onSort = sortKey => {
    const isSortReverse =
      this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  };

  render() {
    const {
      searchTerm,
      results,
      list,
      searchKey,
      isLoading,
      sortKey,
      isSortReverse
    } = this.state;
    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;

    return (
      <div className="page">
        <div className="interactions">
          <Search
            searchTerm={searchTerm}
            onSearchSubmit={this.onSearchSubmit}
            onSearchChange={this.onSearchChange}
          >
            {" "}
            Search{" "}
          </Search>
        </div>

        <>
          <Table
            list={list}
            searchTerm={searchTerm}
            onDismiss={this.Dismiss}
            onSort={this.onSort}
            sortKey={sortKey}
            SORTS={SORTS}
            isSortReverse={isSortReverse}
          />
          <div className="interactions">
            <ButtonWithLoading
              isLoading={isLoading}
              onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
            >
              {" "}
              More{" "}
            </ButtonWithLoading>
          </div>
        </>
      </div>
    );
  }
}

export default App;

export { Button, Search, Table };
