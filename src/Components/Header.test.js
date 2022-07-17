const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

import { shallow } from "enzyme";
import Header from "./Header";

const PROP_DEFAULTS = {
  loggedUser: "123",
  logoutUser: () => undefined,
};

const renderComponent = (props = {}) => {
  const receivedProps = { ...PROP_DEFAULTS, ...props };
  return shallow(<Header {...receivedProps} />);
};

describe("Header component is rendering", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it(`Renders non empty Header component without crashing`, () => {
    expect(wrapper).toBe.exist;
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toHaveLength(1);
  });

  it(`Has 'bg-sucesss`, () => {
    expect(wrapper.is(".bg-success")).toBe(true);
  });

  it(`Has "Hack Ideas" brand`, () => {
    expect(
      wrapper.contains(<span className="navbar-brand mb-0 h1">Hack Ideas</span>)
    ).toBe(true);
    expect(wrapper.find("span").at(0).text()).toBe("Hack Ideas");
  });

  it(`Has "Logout" button if user is already loggedIn`, () => {
    const wrapper = renderComponent({ loggedUser: "741" });
    expect(wrapper.find("button").at(0).text()).toBe("Logout");
    wrapper.find("button").simulate("click");
  });

  it(`Has No "Logout" button if user is not  loggedIn`, () => {
    const wrapper = renderComponent({ loggedUser: "" });
    expect(wrapper.find("button")).toEqual({});
  });
});
