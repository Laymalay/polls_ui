import React from "react";
import { useQuery } from "react-apollo-hooks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { getCurrentUserQuery, isUserLoggedInQuery } from "schema/queries";
import CreatePoll from "./create-poll";
import PollView from "./poll-view";
import UserPolls from "./user-polls";
import AllPolls from "./all-polls";
import Header from "./header";
import Login from "./login";
import Loading from "./shared/loading";
import UserProfile from "./user-profile";
import PrivateRoute from "./PrivateRoute";
import PageNotFound from "./page-not-found";
import UserList from "./user-list";
import UserPage from "./user-page";

const App = () => {

  const { data: { isLoggedIn } = false } = useQuery(isUserLoggedInQuery);

  // update current user in the cache after reloading page
  const { data: { currentUser } = {}, loading } = useQuery(getCurrentUserQuery, {
    fetchPolicy: "network-only"
  });

  if (loading) return <Loading />;



  return (
    <Router>
      {isLoggedIn && <Header />}

      <Route path="/login" component={Login} />

      <Switch>
        <PrivateRoute exact path="/" component={AllPolls} />
        <PrivateRoute path="/polls" component={AllPolls} />
        <PrivateRoute path="/pollview/:id" component={PollView} />
        <PrivateRoute path="/userpolls/:id" component={UserPolls} />
        <PrivateRoute path="/userprofile" component={UserProfile} />
        <PrivateRoute path="/createpoll" component={CreatePoll} />
        <PrivateRoute path="/users" component={UserList} />
        <PrivateRoute path="/user/:id" component={UserPage} />
        <PrivateRoute component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default App;
