import React, { useState } from "react";
import { useQuery, useMutation } from "react-apollo";
import { withRouter } from "react-router";
import { Form, Button, Col, Row } from "react-bootstrap";

import { pollPassedByUserQuery, getPollQuery } from "../../schema/queries";
import Loading from "../shared/loading";
import PassedPoll from "../passed-poll";
import QuestionStat from "./question-stat";
import PollPassing from "../poll-passing";
import BackButton from "../shared/back-button";
import { getCurrentUserQuery } from "../../schema/queries";
import { deletePollMutation } from "../../schema/mutations";
import PollHeader from "../shared/poll-header";
import HeaderForm from "./header-form";

import "./PollStat.css";

const PollStat = ({ history, poll }) => {
  const { questions } = poll;
  const [deletePoll] = useMutation(deletePollMutation);

  const handleDelete = () => {
    deletePoll({ variables: { id: poll.id } }).then(data => {
      console.log("delete poll:", data);
      history.push("/polls");
    });
  };

  return (
    <>
      <div className="main-content poll-stat-form">
        <BackButton onClick={() => history.push("/polls")} />
        <HeaderForm poll={poll} />
        <p className="poll-stat-questions">Answer statistics:</p>
        {questions &&
          questions.map(question => <QuestionStat question={question} />)}
        <Button
          size="lg"
          className="bottom-button"
          onClick={handleDelete}
          variant="outline-danger"
        >
          Delete poll
        </Button>
      </div>
    </>
  );
};

export default withRouter(PollStat);
