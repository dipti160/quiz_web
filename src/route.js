import React from "react";

const SignUp1 = React.lazy(() =>
  import("./Demo/Authentication/SignUp/SignUp1")
);
const Signin1 = React.lazy(() =>
  import("./Demo/Authentication/SignIn/SignIn1")
);

const route = [
  { path: "/register", exact: true, name: "Signup 1", component: SignUp1 },
  { path: "/login", exact: true, name: "Signin 1", component: Signin1 },
];

export default route;
