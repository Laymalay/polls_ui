import React from "react";
import { useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router-dom";
import { createUseStyles } from "react-jss";

import { getAllPollsQuery } from "../../schema/queries";
import PollList from "../poll-list/PollList";
import Loading from "../shared/loading";
import AddButton from "../shared/add-button";

import styles from "./UserPolls.styles";

const useStyles = createUseStyles(styles);

const UserPolls = ({ match, history }) => {
  const classes = useStyles();

  const {
    data: { allPolls: polls = {} } = {},
    loading: loadingPolls,
    error: errorPolls
  } = useQuery(getAllPollsQuery, {
    variables: { creator: match.params.id },
    fetchPolicy: "network-only"
  });

  const addPoll = () => history.push("/createpoll");

  if (loadingPolls) return <Loading />;
  if (errorPolls) return <>Error</>;

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
