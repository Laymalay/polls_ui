const style = {
  navbarTitle: {
    letterSpacing: "0.1cm",
    color: "white",
    textTransform: "uppercase",
    fontFamily: "Staatliches, cursive",
    "&:hover": {
      color: "white",
      fontWeight: "bold"
    }
  },
  navLink: {
    color: "rgba(255, 255, 255, 0.5)",
    marginLeft: 30,
    "&:hover": {
      color: "rgb(255, 255, 255) !important"
    }
  },
  navbar: {
    boxShadow: "0 4px 6px 2px rgba(0, 0, 0, 0.3)",
    backgroundColor: "rgba(23, 163, 184, 1)"
  },
  userLink: {
    marginLeft: 10,
    "&:hover": {
      color: "rgba(255, 255, 255, 0.411)",
      fontWeight: "bold"
    }
  },
  settingsLink: {
    color: "white",
    marginLeft: 5
  },
};

export default style;
