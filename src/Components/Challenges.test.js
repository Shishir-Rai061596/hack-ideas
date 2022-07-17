const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const challenges = [
  {
    id: 1,
    createdBy: "shishir",
    upvotes: ["1", "741"],
    createdOn: "15/07/2022",
    title: "HTML 5",
    description: "What are semantic tags",
    tags: "feature",
  },
];

jest.mock("react", () => {
  return {
    ...jest.requireActual("react"),
    useContext: () => ({ challenges }),
  };
});

import { shallow } from "enzyme";
import Challenges from "./Challenges";

const PROP_DEFAULTS = {
  challenges: [],
};

const renderComponent = (props = {}) => {
  const receivedProps = { ...PROP_DEFAULTS, ...props };
  return shallow(<Challenges {...receivedProps} />);
};

describe("Challenges component is rendering", () => {
  it(`Renders non empty Challenges component without crashing`, () => {
    const wrapper = renderComponent();
    expect(wrapper).toBe.exist;
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toHaveLength(1);
  });
});
