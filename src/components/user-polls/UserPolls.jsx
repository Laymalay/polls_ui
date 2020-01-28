import React from "react";
import { useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router-dom";
import { createUseStyles } from "react-jss";

import { getAllPollsQuery } from "schema/queries";
import PollList from "components/poll-list/PollList";
import Loading from "components/shared/loading";
import AddButton from "components/shared/add-button";
import ErrorContainer from "components/shared/error";

import styles from "./UserPolls.styles";

const useStyles = createUseStyles(styles);

const UserPolls = ({
  match: {
    params: { id }
  },
  history: { push }
}) => {
  const classes = useStyles();

  const {
    data: { allPolls: polls = {} } = {},
    loading: loadingPolls,
    error: errorPolls
  } = useQuery(getAllPollsQuery, {
    variables: { creator: id },
    fetchPolicy: "network-only"
  });

  const addPoll = () => push("/createpoll");

  if (loadingPolls) return <Loading />;
  if (errorPolls) return <ErrorContainer />;

  return (
    <>
      {polls.length === 0 ? (
        <p className={classes.noPollsMessage}>That user don't have any polls</p>
      ) : (
        <PollList polls={polls} />
      )}
      <AddButton onClick={addPoll} />
    </>
  );
};

export default withRouter(UserPolls);
