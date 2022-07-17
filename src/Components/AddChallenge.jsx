import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddChallenge.module.css";

const initialChallengeDetails = {
  title: "",
  description: "",
  tags: "feature",
};

const AddChallenge = ({ addNewChallenge }) => {
  const [challengeDetails, setChallengeDetails] = useState(
    initialChallengeDetails
  );

  const navigate = useNavigate();

  const challengeChangeHandler = e => {
    const { name, value } = e.target;
    setChallengeDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearChallengeDetails = () =>
    setChallengeDetails(initialChallengeDetails);

  const addChallengeHandler = e => {
    e.preventDefault();
    addNewChallenge(challengeDetails);
    navigate("/");
  };

  return (
    <div className={`${styles.addchallenge__container}`}>
      <h3 className="text-center mb-4">ADD A NEW CHALLENGE</h3>
      <form onSubmit={addChallengeHandler}>
        <div className="row mb-3">
          <label htmlFor="challengeTitle" className="col-sm-3 col-form-label">
            Title
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="challengeTitle"
              name="title"
              required
              value={challengeDetails.title}
              onChange={challengeChangeHandler}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="challengeDescription"
            className="col-sm-3 col-form-label"
          >
            Description
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="challengeDescription"
              name="description"
              required
              value={challengeDetails.description}
              onChange={challengeChangeHandler}
            />
          </div>
        </div>

        <fieldset className="row mb-3">
          <legend className="col-form-label col-sm-3 pt-0">Tags</legend>
          <div className="col-sm-8">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="tags"
                id="feature"
                value="feature"
                checked={challengeDetails.tags === "feature"}
                onChange={challengeChangeHandler}
              />
              <label className="form-check-label" htmlFor="feature">
                Feature
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="tags"
                id="tech"
                value="tech"
                checked={challengeDetails.tags === "tech"}
                onChange={challengeChangeHandler}
              />
              <label className="form-check-label" htmlFor="tech">
                Tech
              </label>
            </div>
          </div>
        </fieldset>
        <div className="d-flex mt-3 mb-1 ">
          <button
            type="button"
            className="btn btn-danger flex-fill me-1 mx-2 mb-1"
            onClick={clearChallengeDetails}
          >
            Clear
          </button>
          <button
            type="button"
            className="btn btn-secondary flex-fill me-1 mx-2 mb-1"
            onClick={() => navigate("/")}
          >
            Go back
          </button>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Challenge
        </button>
      </form>
    </div>
  );
};

export default AddChallenge;
