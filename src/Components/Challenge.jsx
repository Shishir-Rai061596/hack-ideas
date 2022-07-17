import React, { useContext } from "react";
import { ChallengeContex } from "../App";
import styles from "./Challenge.module.css";

const Challenge = ({ challenge }) => {
  const { loggedUser, deleteChallenge, challnegeUpvote } =
    useContext(ChallengeContex);

  const deleteChallengehandler = () => deleteChallenge(challenge.id);
  const challnegeUpvoteHandler = () => challnegeUpvote(challenge.id);

  return (
    <div
      className={`col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-2 mb-5 pt-2 pb-2 ${styles.card__border} ${styles.card__style}`}
      onClick={undefined}
    >
      <div className={`col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2`}>
        <div className={`${styles.card__title}`}>
          <div className="row">
            <div className="col-sm-10 col-md-10 col-lg-10 col-xl-10">
              <span className={`${styles.card__title_uppercase} bold`}>
                {challenge.title}
              </span>
            </div>
            <div
              className={`col-sm-1 col-md-1 col-lg-1 col-xl-1 ${styles.card__upvote}`}
            >
              <span
                className={
                  challenge.upvotes.includes(loggedUser)
                    ? "fa fa-heart"
                    : "fa fa-heart-o"
                }
                onClick={challnegeUpvoteHandler}
              ></span>
              <span>{challenge.upvotes.length}</span>
            </div>
            <div className="col-sm-1 col-md-1 col-lg-1 col-xl-1 text-right">
              <div className="upvoteclasshere">
                <span
                  className="fa fa-trash"
                  onClick={deleteChallengehandler}
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2`}>
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-5 col-xl-6 my-auto mx-4">
            <span> {challenge.description}</span>
          </div>
          <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 my-auto mx-4">
            <span> {challenge.tags}</span>
          </div>

          <div className="col-sm-3 col-md-3 col-lg-3 col-xl 4 my-auto">
            <span>{challenge.createdOn}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
