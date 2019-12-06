import React from "react";
import { useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router-dom";

import { getAllPollsQuery, getCurrentUserQuery } from "../../schema/queries";
import PollList from "../poll-list/PollList";
import Loading from "../shared/loading";
import AddButton from "../shared/add-button";

import "./UserPolls.css";

const UserPolls = props => {
  const {
    data: {
      currentUser: { id: userId }
    }
  } = useQuery(getCurrentUserQuery);

  const {
    data: { allPolls: polls = {} } = {},
    loading: loadingPolls,
    error: errorPolls
  } = useQuery(getAllPollsQuery, { variables: { creator: userId } });

  const addPoll = () => props.history.push("/createpoll");

  if (loadingPolls) return <Loading />;
  if (errorPolls) return <>Error</>;

  return (
    <>
      {polls.length === 0 ? (
        <p className="no-polls-message">You don't have any polls</p>
      ) : (
        <PollList polls={polls} />
      )}
      <AddButton onClick={addPoll} />
    </>
  );
};

export default withRouter(UserPolls);
