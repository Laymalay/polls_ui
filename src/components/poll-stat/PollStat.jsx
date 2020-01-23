import React from "react";
import { useMutation } from "react-apollo";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import { createUseStyles } from "react-jss";

import QuestionStat from "./question-stat";
import BackButton from "components/shared/back-button";
import { deletePollMutation } from "schema/mutations";
import HeaderForm from "./header-form";

import styles from "./PollStat.styles";

const useStyles = createUseStyles(styles);

const PollStat = ({ history, poll }) => {
  const classes = useStyles();

  const { questions } = poll;

  const [deletePoll] = useMutation(deletePollMutation);

  const handleDelete = () => {
    deletePoll({ variables: { id: poll.id } }).then(data => {
      history.push("/polls");
    });
  };

  return (
    <>
      <div className={classes.pollStatForm}>
        <BackButton onClick={() => history.push("/polls")} />
        <HeaderForm poll={poll} />
        <p className={classes.pollStatQuestions}>Answer statistics:</p>
        {questions &&
          questions.map(question => (
            <QuestionStat key={question.title} question={question} />
          ))}
        <Button
          size="lg"
          className={classes.bottomButton}
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
