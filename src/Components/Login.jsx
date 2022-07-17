import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";
import UserLogin from "../Images/user.jpg";

import API from "../API/HackIdeas";

const onlyNumber = /^[0-9]?\d*\.?\d*$/;

const Login = ({ loginUser }) => {
  const [employeeId, setEmployeeId] = useState("");

  const navigate = useNavigate();

  const employeeIdHandler = e => {
    const { value } = e.target;
    if (onlyNumber.test(value)) {
      setEmployeeId(value);
    }
  };

  const loginHandler = async e => {
    e.preventDefault();
    await API.patch(`/loggedUser/currentUser`, {
      userId: employeeId,
    });
    loginUser(employeeId);
    navigate("/");
  };

  return (
    <div className={styles.modal}>
      <form
        className={`${styles.modal__content} ${styles.animate}`}
        onSubmit={loginHandler}
      >
        <div className={styles.imgcontainer}>
          <img src={UserLogin} alt="Avatar" className={styles.avatar} />
        </div>

        <div className={styles.container}>
          <input
            type="text"
            placeholder="Enter Employee ID"
            name="employeeId"
            required
            maxLength={"7"}
            className={styles.employeeId}
            value={employeeId}
            onChange={employeeIdHandler}
          />

          <button type="submit" className={styles.login}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
