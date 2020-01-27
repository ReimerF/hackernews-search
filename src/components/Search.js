import React from "react";
import PropTypes from "prop-types";

const Search = ({ onSearchChange, onSearchSubmit, searchTerm, children }) => (
  <div>
    <form onSubmit={onSearchSubmit}>
      <button type="submit">{children} ></button>
      <input type="text" onChange={onSearchChange} value={searchTerm} />
    </form>
  </div>
);

Search.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Search;
