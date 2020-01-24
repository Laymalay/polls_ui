import React from "react";
import PieChart from "react-minimal-pie-chart";
import { useQuery } from "react-apollo";
import { Row } from "react-bootstrap";
import randomColor from "randomcolor";
import { createUseStyles } from "react-jss";

import { getQuestionQuery } from "schema/queries";
import Loading from "components/shared/loading";
import Error from "components/shared/error";

import styles from "./QuestionStat.styles";

const useStyles = createUseStyles(styles);

const QuestionStat = ({ question: { id } }) => {
  const classes = useStyles();

  const { data: { question } = {}, loading, error } = useQuery(
    getQuestionQuery,
    {
      variables: {
        id,
        stat: true
      }
    }
  );

  if (loading) return <Loading />;
  if (error) return <Error />;

  const { answeredQuestions, choices, answer, stat } = question;
  
  const statistic = JSON.parse(stat);

  // Added color and title to statistic
  choices.forEach(
    ({ id, title }) =>
      (statistic[id] = {
        value: statistic[id],
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
        data={Object.values(statistic).filter(({ value }) => value !== 0)}
      />
    ) : (
      <p className={classes.waitAlert}>waiting for answers</p>
    );
  };

  return (
    <div className={classes.questionStatContent}>
      <p className={classes.questionStatTitle}>{question.title}</p>

      <div className={classes.questionStatChoices}>
        {Object.values(statistic).map(({ title, color }) => (
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
