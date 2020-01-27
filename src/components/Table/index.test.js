import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Table from "./index";

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
    ],
    onDismiss: jest.fn()
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
