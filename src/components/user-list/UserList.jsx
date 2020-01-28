import React from "react";
import { useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router";
import { createUseStyles } from "react-jss";

import { getUsersQuery } from "schema/queries";
import UserView from "./user-view";

import styles from "./UserList.styles";

const useStyles = createUseStyles(styles);

const UserList = () => {
  const classes = useStyles();

  const { data: { users = [] } = {} } = useQuery(getUsersQuery, {
    fetchPolicy: "network-only"
  });

  return (
    <div className={classes.userListContent}>
      {users.map(user => (
        <UserView key={user.username} user={user} />
      ))}
    </div>
  );
};

export default withRouter(UserList);
