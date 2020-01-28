import React from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";

import { getAllPollsQuery } from "schema/queries";
import PollList from "components/poll-list/PollList";
import Loading from "components/shared/loading";
import AddButton from "components/shared/add-button";
import ErrorContainer from "components/shared/error";

const AllPolls = props => {
  const { data, loading, error } = useQuery(getAllPollsQuery, {
    fetchPolicy: "network-only"
  });

  if (loading) return <Loading />;
  if (error) return <ErrorContainer />;

  const { allPolls: polls } = data;

  const addPoll = () => {
    props.history.push("/createpoll");
  };

  return (
    <>
      {polls && <PollList polls={polls} />}
      <AddButton onClick={addPoll} />
    </>
  );
};

export default withRouter(AllPolls);
