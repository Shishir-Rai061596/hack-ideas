const mockeddeleteChallenge = jest.fn();
const mockedchallnegeUpvote = jest.fn();
const mockedUsedNavigate = jest.fn();

const deleteChallenge = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const loggedUser = "741";
jest.mock("react", () => {
  return {
    ...jest.requireActual("react"),
    useContext: () => ({
      loggedUser,
      mockeddeleteChallenge,
      mockedchallnegeUpvote,
    }),
  };
});

import { shallow } from "enzyme";
import Challenge from "./Challenge";

const PROP_DEFAULTS = {
  challenge: {
    id: 1,
    createdBy: "shishir",
    upvotes: ["1", "741"],
    createdOn: "15/07/2022",
    title: "HTML 5",
    description: "What are semantic tags",
    tags: "feature",
  },
};

const renderComponent = (props = {}) => {
  const receivedProps = { ...PROP_DEFAULTS, ...props };
  return shallow(<Challenge {...receivedProps} />);
};

describe("Challenge component is rendering", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it(`Renders non empty Challenge component without crashing`, () => {
    expect(wrapper).toBe.exist;
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toHaveLength(1);
  });

  it(`Displays  "upvoted" icon if logged user has already  upvoted it`, () => {
    expect(wrapper.find("span").at(1).prop("className")).toBe("fa fa-heart");
    expect(wrapper.find(".fa fa-heart").exists()).toBe(false);
    expect(wrapper.find(".fa fa-heart-o").exists()).toBe(false);
  });

  it(`Displays No "upvoted" icon if logged user has not  upvoted it`, () => {
    const wrapper = renderComponent({
      challenge: {
        id: 1,
        createdBy: "shishir",
        upvotes: ["1"],
        createdOn: "15/07/2022",
        title: "HTML 5",
        description: "What are semantic tags",
        tags: "feature",
      },
    });
    expect(wrapper.find("span").at(1).prop("className")).toBe("fa fa-heart-o");
    expect(wrapper.find(".fa fa-heart-o").exists()).toBe(false);
    expect(wrapper.find(".fa fa-heart").exists()).toBe(false);
  });
});
