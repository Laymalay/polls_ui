const answer = {
  justifyContent: "space-between",
  borderRadius: 5,
  padding: "15px 0",
  margin: "10px 0",
  borderWidth: 1,
  borderStyle: "solid"
};

const style = {
  correct: {
    ...answer,
    borderColor: "rgba(23, 163, 184, 1)",
    backgroundColor: "rgba(23, 163, 184, 0.05)",
    borderWidth: "0 0 0 5px"
  },
  wrong: {
    ...answer,
    borderColor: " rgba(220, 53, 70, 1)",
    backgroundColor: "rgba(220, 53, 70, 0.05)",
    borderWidth: "0 0 0 5px"
  },
  passAgainBtn: {
    float: "right",
    marginBottom: 20
  },
  passedPollScore: {
    textAlign: "right"
  },
  mainContent: {
    width: 900,
    margin: "0 auto"
  }
};

export default style;
