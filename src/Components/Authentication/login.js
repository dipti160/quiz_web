import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./../../assets/scss/style.scss";
import Aux from "../../hoc/_Aux";
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";
import { loginUser } from "../../api";

import { Alert } from "react-bootstrap";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (email !== "" && password !== "") {
      try {
        const data = {
          email: email,
          password: password,
        };
        const res = await loginUser(data);

        if (Object.values(res)?.length) {
          const data = await res;
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.data));
          localStorage.setItem("role", data.data.role);

          switch (data.data.role) {
            case "admin":
              props.history.push("/admin/dashboard");
              break;
            case "instructor":
              props.history.push("/instructor/dashboard");
              break;
            case "student":
              props.history.push("/student/dashboard");
              break;
            default:
              console.error("Invalid role");
          }
        } else {
          console.log("Authentication failed");
          setError("Authentication failed.");
        }
      } catch (error) {
        setError("Authentication failed.");
        console.log("Error occurred while authenticating: ", error);
      }
    } else {
      if (!email) {
        setError("Please enter your email.");
      } else {
        setError("Please enter your password.");
      }
    }
  };

  return (
    <Aux>
      {error ? <Alert variant="danger">{error}</Alert> : ""}
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <h3 className="mb-4">Login</h3>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary shadow-2 mb-4"
                onClick={handleLogin}
              >
                Login
              </button>
              {/* <p className="mb-2 text-muted">
                Forgot password?{" "}
                <NavLink to="/auth/reset-password-1">Reset</NavLink>
              </p> */}
              <p className="mb-0 text-muted">
                Don’t have an account?{" "}
                <NavLink to="/register">Register</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default Login;
