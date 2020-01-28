import React, { useState, useEffect } from "react";
import { useQuery } from "react-apollo";
import { withRouter } from "react-router";
import { useLazyQuery } from "@apollo/react-hooks";

import {
  pollPassedByUserQuery,
  getPollQuery,
  getCurrentUserQuery
} from "schema/queries";
import Loading from "components/shared/loading";
import PassedPoll from "components/passed-poll";
import PollPassing from "components/poll-passing";
import BackButton from "components/shared/back-button";
import PollStat from "components/poll-stat";
import ErrorContainer from "components/shared/error";

const PollView = ({
  match: {
    params: { id }
  },
  history: { push }
}) => {
  const [passAgain, setPassAgain] = useState(undefined);
  const {
    data: {
      currentUser: { username }
    },
    loading: getCurrentUserQueryLoading,
    error: getCurrentUserQueryError
  } = useQuery(getCurrentUserQuery);

  const {
    data: { poll = undefined } = {},
    loading: getPollQueryLoading,
    error: getPollQueryError
  } = useQuery(getPollQuery, {
    variables: {
      id
    }
  });

  const [
    getPollPassedByUser,
    {
      data: { pollPassedByUser = undefined } = {},
      loading: pollPassedByUserLoading,
      error: pollPassedByUserError
    }
  ] = useLazyQuery(pollPassedByUserQuery, {
    variables: {
      poll: id
    },
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    getPollPassedByUser();
  }, [getPollPassedByUser, passAgain]);

  const loadPollView = () => {
    if (poll.creator && poll.creator.username === username) {
      return <PollStat poll={poll} />;
    }

    if (pollPassedByUser && !passAgain) {
      return (
        <PassedPoll
          passedPollId={pollPassedByUser.id}
          passRequest={setPassAgain}
        />
      );
    }

    return <PollPassing poll={poll} passRequest={setPassAgain} />;
  };

  if (
    getCurrentUserQueryLoading ||
    getPollQueryLoading ||
    pollPassedByUserLoading
  )
    return <Loading />;

  if (getCurrentUserQueryError || getPollQueryError || pollPassedByUserError)
    return <ErrorContainer />;

  return (
    <>
      <BackButton onClick={() => push("/polls")} />
      {poll && loadPollView()}
    </>
  );
};

export default withRouter(PollView);
