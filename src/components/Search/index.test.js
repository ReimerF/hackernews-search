import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Search from "./index";

describe("Search", () => {
  it("renders Search without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Search
        onSearchChange={jest.fn()}
        onSearchSubmit={jest.fn()}
        searchTerm="test"
      >
        Search
      </Search>,
      div
    );
  });

  test("Search has a valid snapshot", () => {
    const component = renderer.create(
      <Search
        onSearchChange={jest.fn()}
        onSearchSubmit={jest.fn()}
        searchTerm="test"
      >
        Search
      </Search>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
