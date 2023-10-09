import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

import "./../../assets/scss/style.scss";
import Aux from "../../hoc/_Aux";
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";

import { registerUser } from "../../api";

const Register = (props) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });
  const [errors, setErrors] = useState({
    firstname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "firstname" && !value) {
      setErrors({ ...errors, firstname: "First name is required" });
    } else if (name === "email" && !value) {
      setErrors({ ...errors, email: "Email is required" });
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      setErrors({ ...errors, email: "Invalid email address" });
    } else if (name === "password" && !value) {
      setErrors({
        ...errors,
        password: "Password is required",
      });
    } else if (name === "password" && value.length < 6) {
      setErrors({
        ...errors,
        password: "Password must be at least 6 characters long",
      });
    } else if (name === "confirmPassword" && !value) {
      setErrors({
        ...errors,
        confirmPassword: "Confirm Password is required",
      });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleRegistration = async () => {
    const { firstname, email, password, confirmPassword } = formData;

    const hasEmptyFields = !firstname || !email || !password;

    if (hasEmptyFields) {
      setErrors({
        ...errors,
        firstname: formData.firstname ? "" : "First name is required",
        email: formData.email ? "" : "Email is required",
        password: formData.password ? "" : "Password is required",
        confirmPassword: confirmPassword ? "" : "Confirm Password is required",
      });

      if (password !== confirmPassword) {
        setErrors({
          ...errors,
          confirmPassword: "Passwords do not match",
        });

        return;
      }

      return;
    }

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      console.log("Validation errors found. Registration not submitted.");
      return;
    }

    try {
      const response = await registerUser(formData);
      if (response === "success") {
        props.history.push("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  return (
    <Aux>
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
                <i className="feather icon-user-plus auth-icon" />
              </div>
              <h3 className="mb-4">Register</h3>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.firstname && "is-invalid"}`}
                  placeholder="First name"
                  name="firstname"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
                {errors.firstname && (
                  <div className="text-danger">{errors.firstname}</div>
                )}
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  name="lastname"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="email"
                  className={`form-control ${errors.email && "is-invalid"}`}
                  placeholder="Email"
                  name="email"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone mumber"
                  name="phonenumber"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="form-group mb-4">
                <input
                  type="password"
                  className={`form-control ${errors.password && "is-invalid"}`}
                  placeholder="Password"
                  name="password"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
                {errors.password && (
                  <div className="text-danger">{errors.password}</div>
                )}
              </div>
              <div className="form-group mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
                {errors.confirmPassword && (
                  <div className="text-danger">{errors.confirmPassword}</div>
                )}
              </div>
              <div className="form-group text-left">
                <div className="checkbox checkbox-fill d-inline">
                  <input
                    type="checkbox"
                    name="checkbox-fill-2"
                    id="checkbox-fill-2"
                  />
                </div>
              </div>
              <button
                className="btn btn-primary shadow-2 mb-4"
                onClick={handleRegistration}
              >
                Register
              </button>
              <p className="mb-0 text-muted">
                Allready have an account? <NavLink to="/login">Login</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};
export default Register;
