const style = {
  createForm: {
    margin: "0 auto",
    maxWidth: 900
  },
  creator: {
    lineHeight: "1.6em",
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.479)"
  },
  firstLine: {
    justifyContent: "space-between",
    display: "flex"
  },
  pollQuestionsTitle: {
    letterSpacing: "0.1cm",
    marginTop: 15
  },
  createPollBtn: {
    float: "right",
    width: "auto",
    marginBottom: 20
  },
  headerStyle: {
    backgroundImage: ({imagePath})=>`url(${imagePath})`,
    backgroundColor: "rgba(23, 163, 184, 0.2)",
    padding: 10,
    backgroundSize: "100% 100%",
    backgroundRepeat: "repeat",
    backgroundPosition: "center center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    height: 400,
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
};

export default style;
