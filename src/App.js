import { useState, useEffect, createContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "./Components/Header";
import Challenges from "./Components/Challenges";
import AddChallenge from "./Components/AddChallenge";
import Login from "./Components/Login";

import API from "./API/HackIdeas";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

export const ChallengeContex = createContext();

const App = () => {
  const [loggedUser, setLoggedUser] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [challengesDuplicate, setChallengesDuplicate] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getChallenges = async () => {
      const {
        data: [{ userId }],
      } = await API.get(`/loggedUser`);
      const response = await API.get(`/challenges`);
      if (!userId) {
        navigate("/user");
      }
      setLoggedUser(userId);
      setChallengesDuplicate(response.data);
      setChallenges(response.data);
    };
    getChallenges();
  }, []);

  const addNewChallenge = async challengeDetails => {
    const newChallenge = {
      id: Math.floor(Math.random() * 100000) + 1,
      createdBy: loggedUser,
      upvotes: [],
      createdOn: getCreatedDate(),
      ...challengeDetails,
    };
    setChallenges(prevChallenges => [...prevChallenges, newChallenge]);
    setChallengesDuplicate(prevChallenges => [...prevChallenges, newChallenge]);
    await API.post(`/challenges`, newChallenge);
  };

  const deleteChallenge = async id => {
    const deletedChallenge = challenges.filter(
      challenge => challenge.id !== id
    );
    setChallenges(deletedChallenge);
    await API.delete(`challenges/${id}`);
  };

  const searchChallenge = value => {
    const filteredChallenge = challengesDuplicate.filter(
      challenge =>
        challenge.title.toLowerCase().includes(value.toLowerCase()) ||
        challenge.tags.toLowerCase().includes(value.toLowerCase()) ||
        challenge.description.toLowerCase().includes(value.toLowerCase())
    );
    setChallenges(filteredChallenge);
  };

  const sortChallenge = value => {
    const sortedChallenges = [...challenges];
    switch (value) {
      case "upvote":
        sortedChallenges.sort((a, b) => a.upvotes.length - b.upvotes.length);
        break;
      case "date":
        sortedChallenges.sort((a, b) => {
          a = a.createdOn.toString().split("/");
          b = b.createdOn.toString().split("/");
          return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
        });
        break;
      default:
        break;
    }

    setChallenges(sortedChallenges);
  };

  const getCreatedDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const challnegeUpvote = async id => {
    const allChallenges = [...challenges];
    const selectedChallenge = allChallenges.findIndex(
      challenge => challenge.id === id
    );
    const userAlreadyUpvoted =
      allChallenges[selectedChallenge].upvotes.includes(loggedUser);

    const newUpvotes = userAlreadyUpvoted
      ? allChallenges[selectedChallenge].upvotes.filter(
          user => user !== loggedUser
        )
      : [...allChallenges[selectedChallenge].upvotes, loggedUser];

    allChallenges[selectedChallenge].upvotes = newUpvotes;

    setChallenges(allChallenges);
    setChallengesDuplicate(allChallenges);
    await API.patch(`challenges/${id}`, {
      upvotes: newUpvotes,
    });
  };

  const loginUser = userId => setLoggedUser(userId);

  const logoutUser = async () => {
    setLoggedUser("");
    await API.patch(`/loggedUser/currentUser`, {
      userId: "",
    });
  };

  return (
    <ChallengeContex.Provider
      value={{
        loggedUser,
        challenges,
        deleteChallenge,
        searchChallenge,
        sortChallenge,
        challnegeUpvote,
      }}
    >
      <div>
        <Header loggedUser={loggedUser} logoutUser={logoutUser} />
        <div className="container mt-3 mb-1">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <Routes>
                <Route path="/" element={<Challenges />} />
                <Route
                  path="/newChallenge"
                  element={<AddChallenge addNewChallenge={addNewChallenge} />}
                />
                <Route path="/user" element={<Login loginUser={loginUser} />} />
                <Route path="*" element={<h1>Page not found</h1>} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </ChallengeContex.Provider>
  );
};

export default App;
