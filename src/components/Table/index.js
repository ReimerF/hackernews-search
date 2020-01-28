import React from "react";
import Button from "../Button";
import PropTypes from "prop-types";

const largeColumn = {
  width: "40%"
};
const midColumn = {
  width: "30%"
};
const smallColumn = {
  width: "10%"
};

const Table = ({ list, onDismiss, onSort, sortKey, SORTS }) => (
  <div className="table">
    <div key="header-row" className="table-row">
      <span style={largeColumn} onClick={() => onSort("TITLE")}>
        Title
      </span>
      <span style={midColumn} onClick={() => onSort("AUTHOR")}>
        Author
      </span>
      <span style={smallColumn} onClick={() => onSort("COMMENTS")}>
        Comments
      </span>
      <span style={smallColumn} onClick={() => onSort("POINTS")}>
        Points
      </span>
      <span style={smallColumn} onClick={() => onSort("NONE")}>
        Options
      </span>
    </div>
    {SORTS[sortKey](list).map(item => (
      <div key={item.objectID} className="table-row">
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={midColumn}>{item.author}</span>
        <span style={smallColumn}>{item.num_comments}</span>
        <span style={smallColumn}>{item.points}</span>
        <Button
          onClick={() => onDismiss(item.objectID)}
          className={"button-inline"}
        >
          {" "}
          Dismiss{" "}
        </Button>
      </div>
    ))}
  </div>
);

Table.propTypes = {
  list: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default Table;
