import React from "react";
import { useMutation } from "react-apollo";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import _ from "underscore";

import { getAllPollsQuery } from "../../schema/queries";
import QuestionStat from "./question-stat";
import BackButton from "../shared/back-button";
import { deletePollMutation } from "../../schema/mutations";
import HeaderForm from "./header-form";

import "./PollStat.css";

const PollStat = ({ history, poll }) => {
  const { questions } = poll;

  const [deletePoll] = useMutation(deletePollMutation, {
    update(cache, { data: { deletePoll } }) {
      const { allPolls } = cache.readQuery({ query: getAllPollsQuery });
      const deleteIndex = _.findIndex(
        allPolls,
        item => item.id === deletePoll.id
      );

      if (deleteIndex < 0) {
        return;
      }

      allPolls.splice(deleteIndex, 1);
      cache.writeQuery({
        query: getAllPollsQuery,
        data: { allPolls }
      });
    }
  });

  const handleDelete = () => {
    deletePoll({ variables: { id: poll.id } }).then(data => {
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
