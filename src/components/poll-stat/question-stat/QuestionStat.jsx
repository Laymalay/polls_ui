import React, { useEffect, useState } from "react";
import PieChart from "react-minimal-pie-chart";
import { useQuery } from "react-apollo";
import { Row } from "react-bootstrap";
import randomColor from "randomcolor";
import { createUseStyles } from "react-jss";

import { getQuestionQuery } from "schema/queries";
import Loading from "components/shared/loading";
import ErrorContainer from "components/shared/error";

import styles from "./QuestionStat.styles";

const useStyles = createUseStyles(styles);

const QuestionStat = ({ question: { id } }) => {
  const classes = useStyles();
  const [statistic, setStatistic] = useState([]);

  const { data: { question = {} } = {}, loading, error } = useQuery(
    getQuestionQuery,
    {
      variables: {
        id,
        stat: true
      }
    }
  );

  const { answeredQuestions, answer, stat } = question;

  const getColor = () =>
    randomColor({
      luminosity: "bright",
      hue: "random",
      format: "rgba",
      alpha: 0.6
    });

  useEffect(() => {
    if (stat) {
      let parsedStat = JSON.parse(stat);
      parsedStat = parsedStat.map(item => ({ ...item, color: getColor() }));

      setStatistic(parsedStat);
    }
  }, [stat]);

  if (loading) return <Loading />;
  if (error) return <ErrorContainer />;

  const statView = () =>
    answeredQuestions.length > 0 ? (
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
        data={statistic.filter(({ value }) => value !== 0)}
      />
    ) : (
      <p className={classes.waitAlert}>waiting for answers</p>
    );

  return (
    <div className={classes.questionStatContent}>
      <p className={classes.questionStatTitle}>{question.title}</p>

      <div className={classes.questionStatChoices}>
        {statistic.map(({ title, color }) => (
          <Row key={title} className={classes.line}>
            <div>
              <span
                style={{ color, marginRight: 5 }}
                className="oi oi-media-record"
              ></span>
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
