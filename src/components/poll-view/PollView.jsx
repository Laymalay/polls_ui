import React, { useState, useEffect } from "react";
import { useQuery } from "react-apollo";
import { withRouter } from "react-router";
import { useLazyQuery } from "@apollo/react-hooks";

import { pollPassedByUserQuery, getPollQuery } from "schema/queries";
import Loading from "components/shared/loading";
import PassedPoll from "components/passed-poll";
import PollPassing from "components/poll-passing";
import BackButton from "components/shared/back-button";
import { getCurrentUserQuery } from "schema/queries";
import PollStat from "components/poll-stat";
import Error from "components/shared/error";

const PollView = ({ match, history }) => {
  const [passAgain, setPassAgain] = useState(undefined);
  const {
    data: {
      currentUser: { username }
    }
  } = useQuery(getCurrentUserQuery);

  const { data: { poll } = {} } = useQuery(getPollQuery, {
    variables: {
      id: match.params.id
    }
  });
  
  const [
    getPollPassedByUser,
    { loading, data: { pollPassedByUser = {} } = {}, error }
  ] = useLazyQuery(pollPassedByUserQuery, {
    variables: {
      poll: match.params.id
    },
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    getPollPassedByUser();
  }, [getPollPassedByUser, passAgain]);

  const loadPollView = () => {
    if (poll.creator.username === username) {
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

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <BackButton onClick={() => history.push("/polls")} />
      {poll && loadPollView()}
    </>
  );
};

export default withRouter(PollView);
