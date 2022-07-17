const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

import { shallow } from "enzyme";
import App from "./App";

const renderComponent = () => {
  return shallow(<App />);
};

describe("App component is rendering", () => {
  it(`Renders non empty App component without crashing`, () => {
    const wrapper = renderComponent();
    expect(wrapper).toBe.exist;
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toHaveLength(1);
  });
});
