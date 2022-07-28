import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChallengeContex } from "../App";

const NewChallenge = () => {
  const [searchChallenge, setSearchChallenge] = useState("");
  const [sortChallenge, setSortChallenge] = useState("");

  const { searchChallenge: onSearchChallenge, sortChallenge: onSortChallenge } =
    useContext(ChallengeContex);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChallenge(searchChallenge);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchChallenge]);

  const searchChallengeHandler = e => {
    const { value } = e.target;
    setSearchChallenge(value);
  };

  const sortChallengeHandler = e => {
    const { value } = e.target;
    setSortChallenge(value);
    onSortChallenge(value);
  };

  const navigate = useNavigate();
  return (
    <div
      className="d-flex justify-content-end align-items-center text-right mb-4"
      style={{ textAlign: "right" }}
    >
      <div className="row">
        <div className="col-md-4">
          <input
            className="form-control col-md-4 mr-2"
            type="text"
            name="searchInput"
            placeholder="Search"
            aria-label="Search"
            autoComplete="none"
            value={searchChallenge}
            onChange={searchChallengeHandler}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-control col-md-2"
            size="1"
            value={sortChallenge}
            onChange={sortChallengeHandler}
          >
            <option value="" hidden defaultValue>
              sort
            </option>

            <option value="upvote">By Upvote</option>
            <option value="date">By created Date</option>
          </select>
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-primary w-100"
            onClick={() => navigate("/newChallenge")}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewChallenge;
