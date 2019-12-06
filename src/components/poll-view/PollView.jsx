import React, { useState } from "react";
import { useQuery } from "react-apollo";
import { withRouter } from "react-router";

import { pollPassedByUserQuery, getPollQuery } from "../../schema/queries";
import Loading from "../shared/loading";
import PassedPoll from "../passed-poll";
import PollPassing from "../poll-passing";
import BackButton from "../shared/back-button";
import { getCurrentUserQuery } from "../../schema/queries";
import PollStat from "../poll-stat";

const PollView = ({ match, history }) => {
  const [passAgain, setPassAgain] = useState(false);

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


  const { data: { pollPassedByUser = {} } = {}, loading, error } = useQuery(
    pollPassedByUserQuery,
    {
      variables: {
        poll: match.params.id
      }
    }
  );

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
  if (error) return <>Error</>;

  return (
    <>
      <BackButton onClick={() => history.push("/polls")} />
      {poll && loadPollView()}
    </>
  );
};

export default withRouter(PollView);
