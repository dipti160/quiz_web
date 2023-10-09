import React from "react";

const Register = React.lazy(() => import("./Demo/Authentication/register"));
const Signin1 = React.lazy(() =>
  import("./Demo/Authentication/SignIn/SignIn1")
);

const route = [
  { path: "/register", exact: true, name: "Register", component: Register },
  { path: "/login", exact: true, name: "Signin 1", component: Signin1 },
];

export default route;
