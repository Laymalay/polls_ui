import React from "react";
import { useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";

import { getCurrentUserQuery } from "../../schema/queries";
import { AUTH_TOKEN } from "../../constants";
import { Navbar, Nav } from "react-bootstrap";

import "./Header.css";

export const Header = props => {
  const client = useApolloClient();

  const {
    data: {
      currentUser: { username, isStaff }
    }
  } = useQuery(
    getCurrentUserQuery,
    { pollInterval: 500 } // get user after cache updated
  );

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    client.writeData({ data: { isLoggedIn: false } });
  };

  return (
    <Navbar sticky="top" variant="dark">
      <Navbar.Brand className="navbar-title">
        <Link className="navbar-title" to="/polls">
          PollPool
        </Link>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Link className="nav-link" to="/polls">
          All Polls
        </Link>
        <Link className="nav-link" to="/userpolls">
          My Polls
        </Link>
        <Link className="nav-link" to="/test">
          Test
        </Link>
      </Nav>

      {username && (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as:{" "}
            <Link className="user-link" to="/userprofile">
              {username}
            </Link>
          </Navbar.Text>
          {isStaff && (
            <a
              className="settings-link"
              href="http://localhost:8000/admin"
              target="_blank"
            >
              <span className="oi oi-wrench"></span>
            </a>
          )}
        </Navbar.Collapse>
      )}

      <Link onClick={logout} className="nav-link" to="/login">
        Logout
      </Link>
    </Navbar>
  );
};

export default withRouter(Header);
