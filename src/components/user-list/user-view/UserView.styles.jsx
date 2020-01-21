const style = {
  userViewBlock: {
    height: "auto",
    backgroundColor: "rgba(29, 214, 243, 0.2)",
    margin: "20px 0",
    borderRadius: 10,
    padding: 15,
    justifyContent: "flex-start",
    opacity: 0.8,
    boxShadow: "none",
    transition: "all 0.4s ease-in",
    display: "flex",
    flexDirection: "row"
  },
  userViewPic: {
    height: 160,
    width: 160,
    border: "solid white",
    marginRight: 20,
    objectFit: "cover"
  },
  userViewBlockHover: {
    opacity: 1,
    boxShadow: "0px 0px 20px 0px rgba(43, 139, 151, 0.3)"
  },
  userViewUsername: {
    textTransform: "capitalize",
    letterSpacing: 1.5
  }
};

export default style;
