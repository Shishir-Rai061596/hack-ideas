import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ loggedUser, logoutUser }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    logoutUser();
    navigate("/user");
  };

  return (
    <nav className="navbar navbar-light bg-success">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Hack Ideas</span>
        {loggedUser && (
          <button className="btn btn-warning" onClick={logoutHandler}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
