import React from "react";
import PieChart from "react-minimal-pie-chart";
import { useQuery } from "react-apollo";
import { Row } from "react-bootstrap";
import randomColor from "randomcolor";

import { getQuestionQuery } from "../../../schema/queries";
import Loading from "../../shared/loading";

import "./QuestionStat.css";

const QuestionStat = ({ question: { id } }) => {
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
        className="question-chart"
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
      <p className="wait-alert">waiting for answers</p>
    );
  };

  answeredQuestions.forEach(answer => {
    stat[answer.choice.id].value += 1;
  });

  return (
    <div className="question-stat-content">
      <p className="question-stat-title">{question.title}</p>

      <div className="question-stat-choices">
        {Object.values(stat).map(({ title, color }) => (
          <Row key={title} className="row-flex line">
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
