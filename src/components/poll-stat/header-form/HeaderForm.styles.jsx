const style = {
  updatePollBtn: {
    height: "fit-content",
    marginRight: 5
  },
  headerFormContent: {
    padding: "20px 10px 10px 10px",
    display: "flex",
    flexDirection: "column",
    top: 50,
    justifyContent: "space-between",
    height: 400,
    width: 900,
    backgroundImage: ({ imagePath }) => `url(${imagePath})`,
    backgroundColor: "rgba(23, 163, 184, 0.2)",
    borderRadius: 5,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    marginTop: "-10px"
  },
  pollStatForm: {
    $formControl: {
      background: "white"
    }
  },
  pollStatTitle: {
    fontFamily: "Staatliches, cursive",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    fontSize: 25
  },
  rowFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  updateSuccessAlert: {
    width: "fit-content",
    right: 15,
    position: "absolute",
    bottom: 0
  }
};

export default style;
