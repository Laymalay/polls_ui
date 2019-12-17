import React from "react";
import { useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router";

import { getUsersQuery } from "../../schema/queries";
import UserView from "./user-view";

import "./UserList.css";

const UserList = props => {
  const { data: { users } = {} } = useQuery(getUsersQuery);

  return (
    <div className="user-list-content">
      {users && users.map(user => <UserView key={user.username} user={user} />)}
    </div>
  );
};

export default withRouter(UserList);
