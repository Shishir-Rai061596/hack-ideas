const mockedonSearchChallenge = jest.fn();
const mockedonSortChallenge = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("react", () => {
  return {
    ...jest.requireActual("react"),
    useContext: () => ({ mockedonSearchChallenge, mockedonSortChallenge }),
  };
});

import { shallow } from "enzyme";
import NewChallenge from "./NewChallenge";

const PROP_DEFAULTS = {
  loginUser: () => undefined,
};

const renderComponent = (props = {}) => {
  const receivedProps = { ...PROP_DEFAULTS, ...props };
  return shallow(<NewChallenge {...receivedProps} />);
};

describe("NewChallenge component is rendering", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it(`Renders non empty NewChallenge component without crashing`, () => {
    expect(wrapper).toBe.exist;
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toHaveLength(1);
  });
});
