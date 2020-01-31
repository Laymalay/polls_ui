import React from "react";
import { useQuery } from "react-apollo-hooks";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

import { getCurrentUserQuery, isUserLoggedInQuery } from "schema/queries";
import CreatePoll from "./create-poll";
import PollView from "./poll-view";
import UserPolls from "./user-polls";
import AllPolls from "./all-polls";
import Header from "./header";
import Login from "./login";
import Loading from "./shared/loading";
import UserProfile from "./user-profile";
import PageNotFound from "./page-not-found";
import UserList from "./user-list";
import UserPage from "./user-page";
import ErrorContainer from "components/shared/error";

const App = () => {
  const { data: { isLoggedIn = false } = {} } = useQuery(isUserLoggedInQuery);

  // update current user in the cache after reloading page
  const { data: { currentUser } = {}, error, loading } = useQuery(
    getCurrentUserQuery,
    {
      fetchPolicy: "network-only"
    }
  );

  if (loading) return <Loading />;
  if (error && error.networkError) return <ErrorContainer />;

  return (
    <Router>
      {!isLoggedIn && <Redirect to="/login" />}
      <Route path="/login" component={Login} />

      {isLoggedIn && (
        <>
          <Header />
          <Switch>
            <Route exact path="/" component={AllPolls} />
            <Route path="/polls" component={AllPolls} />
            <Route path="/pollview/:id" component={PollView} />
            <Route path="/userpolls/:id" component={UserPolls} />
            <Route path="/userprofile" component={UserProfile} />
            <Route path="/createpoll" component={CreatePoll} />
            <Route path="/users" component={UserList} />
            <Route path="/user/:id" component={UserPage} />
            <Route component={PageNotFound} />
          </Switch>
        </>
      )}
    </Router>
  );
};

export default App;
