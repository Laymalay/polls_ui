const style = {
  pollHeader: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    marginTop: -10,
    backgroundImage: ({ imagePath }) => `url(${imagePath})`,
    backgroundColor: "rgba(23, 163, 184, 0.2)",
    borderRadius: 5,
    height: 400,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center"
  },
  pollShadow: {
    marginTop: 50,
    boxShadow: "0 0 10px rgba(184, 184, 184, 0.9)",
    color: "#17A3B8",
    backgroundColor: "white",
    width: "fit-content",
    height: "fit-content",
    padding: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: "2"
  },
  pollTitle: {
    padding: "10px 0 0 5px",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    fontSize: 25,
    fontFamily: "'Staatliches', cursive"
  },
  pollDesc: {
    margin: "15px 0 30px 0",
    minHeight: 50,
    wordBreak: "break-all"
  },
  pollCreator: {
    paddingLeft: 5,
    fontSize: 20
  },
  creatorPic: {
    height: 150,
    width: 150,
    margin: 30,
    zIndex: "2",
    objectFit: "cover",
    border: "solid white"
  },
  dash: {
    height: 10,
    borderTop: "solid white",
    position: "absolute",
    marginTop: 100,
    width: 900,
    zIndex: "1"
  }
};

export default style;
