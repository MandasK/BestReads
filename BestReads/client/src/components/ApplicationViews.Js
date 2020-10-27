import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import CurrentUserProfile from "./Users/CurrentUserProfile";
import EditCurrentUserProfile from "./Users/EditCurrentUserProfile";
import BookSearch from "./Books/BookSearch";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route path="/myProfile" exact>
          {isLoggedIn ? <CurrentUserProfile /> : <Redirect to="/login" />}
        </Route>
        <Route path="/myProfile/edit" exact>
          {isLoggedIn ? <EditCurrentUserProfile /> : <Redirect to="/login" />}
        </Route>
        <Route path="/books/search" exact>
          {isLoggedIn ? <BookSearch /> : <Redirect to="/login" />}
        </Route>

        

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};