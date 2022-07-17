import React from "react";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

import { shallow } from "enzyme";
import Login from "./Login";

const PROP_DEFAULTS = {
  loginUser: () => undefined,
};

const renderComponent = (props = {}) => {
  const receivedProps = { ...PROP_DEFAULTS, ...props };
  return shallow(<Login {...receivedProps} />);
};

describe("Login component is rendering", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it(`Renders non empty Login component without crashing`, () => {
    expect(wrapper).toBe.exist;
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toHaveLength(1);
  });
  it(`User changes Employee ID`, () => {
    const inputBox = wrapper.find("input");
    const mockEvent = { target: { value: "123" } };
    inputBox.simulate("change", mockEvent);
  });
  test(`Login button is clicked`, () => {
    const submitButton = wrapper.find("form");
    const mockEvent = { preventDefault() {} };
    submitButton.simulate("click", mockEvent);
  });
});
