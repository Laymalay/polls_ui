import React from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import { createUseStyles } from "react-jss";

import { getAllPollsQuery } from "schema/queries";
import PollList from "components/poll-list/PollList";
import Loading from "components/shared/loading";
import AddButton from "components/shared/add-button";
import Error from "components/shared/error";

import styles from "./AllPolls.styles";

const useStyles = createUseStyles(styles);

const AllPolls = props => {
  const classes = useStyles();

  const { data, loading, error } = useQuery(getAllPollsQuery, {
    fetchPolicy: "network-only"
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

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
