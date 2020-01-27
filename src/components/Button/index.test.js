import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Button from "./index";

describe("Button", () => {
  it("renders Button without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Button onClick={jest.fn()}>Testing happening here</Button>,
      div
    );
  });

  test("Button has a valid snapshot", () => {
    const component = renderer.create(
      <Button onClick={jest.fn()}>Testing happening here</Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
