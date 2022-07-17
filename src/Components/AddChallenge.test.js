const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

import { shallow } from "enzyme";
import AddChallenge from "./AddChallenge";

const PROP_DEFAULTS = {
  addNewChallenge: () => jest.mock(),
};

const renderComponent = (props = {}) => {
  const receivedProps = { ...PROP_DEFAULTS, ...props };
  return shallow(<AddChallenge {...receivedProps} />);
};

describe("AddChallenge component is rendering", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it(`Renders non empty AddChallenge component without crashing`, () => {
    expect(wrapper).toBe.exist;
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toHaveLength(1);
  });
  it(`User changes Challenge Title`, () => {
    const inputBox = wrapper.find('input[name="title"]');
    const mockEvent = { target: { value: "React" } };
    inputBox.simulate("change", mockEvent);
  });
  it(`User changes Challenge description`, () => {
    const inputBox = wrapper.find('input[name="description"]');
    const mockEvent = { target: { value: "what is vdom" } };
    inputBox.simulate("change", mockEvent);
  });
  it(`User Clicks Clear button`, () => {
    const buttonBox = wrapper.find("button").at(0);
    buttonBox.simulate("click");
  });
  it(`AddChallenge is clicked`, () => {
    const submitButton = wrapper.find("form");
    const mockEvent = { preventDefault() {} };
    submitButton.simulate("click", mockEvent);
  });
});
