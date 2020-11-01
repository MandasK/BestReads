import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import CurrentUserProfile from "./Users/CurrentUserProfile";
import EditCurrentUserProfile from "./Users/EditCurrentUserProfile";
import BookSearch from "./Books/BookSearch";
import AddBook from "./Books/AddBook";
import BookDetails from './Books/BookDetails';
import UserList from './Users/UserList';
import UserDetails from './Users/UserDetails';
import AddBookReadState from './Books/AddBookReadState'
import { ReadStateProvider } from '../providers/ReadStateProvider';

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
        <Route path="/book/:googleId/details" exact>
          {isLoggedIn ? <AddBook /> : <Redirect to="/login" />}
        </Route>
        <Route path="/users/" exact>
          {isLoggedIn ? <UserList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/users/:id/details" exact>
          {isLoggedIn ? <UserDetails /> : <Redirect to="/login" />}
        </Route>.
        <Route path="/books/:id/AddState" exact>
          {isLoggedIn ? <AddBookReadState /> : <Redirect to="/login" />}
        </Route>
        <Route path="/books/:readStateId/details" >
          {isLoggedIn ? <BookDetails /> : <Redirect to="/login" />}
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