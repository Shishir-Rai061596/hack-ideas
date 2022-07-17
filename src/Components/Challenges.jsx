import React, { useContext } from "react";
import { ChallengeContex } from "../App";
import NewChallenge from "./NewChallenge";
import Challenge from "./Challenge";

const Challenges = () => {
  const { challenges } = useContext(ChallengeContex);
  return (
    <div>
      <NewChallenge />
      {challenges.map(challenge => (
        <Challenge key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
};

export default Challenges;
