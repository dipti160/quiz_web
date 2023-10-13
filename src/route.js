import React from "react";

const Register = React.lazy(() =>
  import("./Components/Authentication/register")
);
const Login = React.lazy(() => import("./Components/Authentication/login"));

const route = [
  { path: "/register", exact: true, name: "Register", component: Register },
  { path: "/login", exact: true, name: "Login", component: Login },
];

export default route;
