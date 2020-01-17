const style = {
  pollCard: {
    margin: 20,
    width: "18em",
    minHeight: 130,
    opacity: 0.8,
    borderRadius: 10,
    boxShadow: "0px 0px 20px 0px rgba(19, 66, 62, 0.2)",
    transition: "all 0.4s ease-in",
    "&:hover": {
      opacity: 1,
      boxShadow: "0px 0px 20px 0px rgba(19, 66, 62, 0.3)"
    },
    "&:hover $passBtn": {
      opacity: 1,
      height: "auto",
      visibility: "visible"
    },
    "&:hover $cardText": {
      opacity: 1,
      visibility: "visible",
      marginTop: 10,
      height: "auto"
    }
  },
  cardImg: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    minHeight: 200
  },
  passBtn: {
    color: "white",
    opacity: 0,
    transition: " all 0.5s ease-in",
    alignSelf: "flex-end",
    visibility: "hidden"
  },
  cardText: {
    transition: "all 0.5s ease-in",
    position: "absolute",
    padding: 4,
    top: 0,
    right: 0,
    maxHeight: "30%",
    overflow: "hidden",
    opacity: 0,
    height: 0,
    maxWidth: "-webkit-fill-available",
    visibility: "hidden",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.747)"
  },
  cardTitle: {
    fontWeight: "bold",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontSize: 25,
    fontFamily: "Staatliches, cursive"
  },
  cards: {
    margin: "10px 60px 10px 20px"
  },
  // ?
  cardColumns: {
    "-webkit-column-count": 3,
    " -moz-column-count": 3,
    columnCount: 4
  },
  pollMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  pollListCreatorPic: {
    height: 100,
    width: 100,
    marginTop: -50,
    marginLeft: "37%",
    objectFit: "cover",
    zIndex: 100,
    border: "solid white"
  }
};

export default style;
