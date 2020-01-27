import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import App, {
  Search,
  Button,
  Table,
  onSearchChange,
  onSearchSubmit,
  searchTerm,
  onClick
} from "./App";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe("App", () => {
  it("renders App without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });

  test("App has a valid snapshot", () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Search", () => {
  it("renders Search without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Search
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        searchTerm={searchTerm}
      >
        Search
      </Search>,
      div
    );
  });

  test("Search has a valid snapshot", () => {
    const component = renderer.create(
      <Search
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        searchTerm={searchTerm}
      >
        Search
      </Search>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Button", () => {
  it("renders Button without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Button onClick={onClick}>Testing happening here</Button>,
      div
    );
  });

  test("Button has a valid snapshot", () => {
    const component = renderer.create(
      <Button onClick={onClick}>Testing happening here</Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Table", () => {
  const props = {
    list: [
      {
        title: "1",
        author: "2",
        num_comments: "3",
        points: "4",
        objectID: "x"
      },
      { title: "5", author: "6", num_comments: "7", points: "8", objectID: "y" }
    ]
  };

  it("shows two items in list", () => {
    const element = shallow(<Table {...props} />);
    expect(element.find(".table-row").length).toBe(2);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<Table {...props} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
