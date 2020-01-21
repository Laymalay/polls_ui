const style = {
  userContent: {
    width: 800,
    margin: "0 auto",
    padding: "20px 20px 60px 20px",
    backgroundColor: "rgba(23, 163, 184, 0.1)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    boxShadow: "0px 0px 25px -1px rgba(19, 66, 62, 0.2)"
  },
  userAbout: {
    marginTop: 20
  },
  sizedTextarea: {
    maxHeight: 250,
    minHeight: 50
  },
  userPic: {
    height: 260,
    width: 260,
    borderRadius: "50%",
    border: "solid white",
    marginBottom: 20,
    objectFit: "cover"
  },
  username: {
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    fontSize: 25,
    fontFamily: "'Staatliches', cursive",
    marginBottom: 30
  },
  mainUserInfo: {
    padding: "10px 0 10px 50px",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column"
  },
  userPollsLink: {
    color: "rgba(23, 163, 184, 1)"
  },
  userPollsLinkHover: {
    color: "rgb(13, 108, 122)",
    textDecoration: "none"
  },
  changeUserPhotoBtn: {
    width: 120,
    margin: "0 auto"
  },
  updateUserBtn: {
    float: "right"
  },
  updateSuccessAlert: {
    width: "fit-content",
    right: 15,
    position: "absolute",
    bottom: 0
  },
  inputAvatarHidden: {
    display: "none"
  },
  fixedSize: {
    width: 280
  },
  columnFlex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  rowFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  hr: {
    marginTop: "1rem",
    marginBottom: "1rem",
    border: 0,
    borderTop: "1px solid rgba(0, 0, 0, 0.13)"
  }
};

export default style;
