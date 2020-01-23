import React from "react";
import PieChart from "react-minimal-pie-chart";
import { useQuery } from "react-apollo";
import { Row } from "react-bootstrap";
import randomColor from "randomcolor";
import { createUseStyles } from "react-jss";

import { getQuestionQuery } from "schema/queries";
import Loading from "components/shared/loading";

import styles from "./QuestionStat.styles";

const useStyles = createUseStyles(styles);

const QuestionStat = ({ question: { id } }) => {
  const classes = useStyles();

  const { data: { question } = {}, loading, error } = useQuery(
    getQuestionQuery,
    {
      variables: {
        id
      }
    }
  );

  if (loading) return <Loading />;
  if (error) return <>Error</>;

  const { answeredQuestions, choices, answer } = question;

  let stat = {};

  choices.forEach(
    ({ id, title }) =>
      (stat[id] = {
        value: 0,
        title: title,
        color: randomColor({
          luminosity: "bright",
          hue: "random",
          format: "rgba",
          alpha: 0.6
        })
      })
  );

  const statView = () => {
    return answeredQuestions.length > 0 ? (
      <PieChart
        className={classes.questionChart}
        animate
        label
        labelPosition={50}
        labelStyle={{
          fill: "white",
          fontFamily: "sans-serif",
          fontSize: "13px"
        }}
        data={Object.values(stat).filter(({ value }) => value !== 0)}
      />
    ) : (
      <p className={classes.waitAlert}>waiting for answers</p>
    );
  };

  answeredQuestions.forEach(answer => {
    stat[answer.choice.id].value += 1;
  });

  return (
    <div className={classes.questionStatContent}>
      <p className={classes.questionStatTitle}>{question.title}</p>

      <div className={classes.questionStatChoices}>
        {Object.values(stat).map(({ title, color }) => (
          <Row key={title} className={classes.line}>
            <div>
              <span style={{ color }} className="oi oi-media-record"></span>
              &nbsp;
              {title}
            </div>
            {answer === title && <span className="oi oi-check"></span>}
          </Row>
        ))}
      </div>
      {statView()}
    </div>
  );
};

export default QuestionStat;
