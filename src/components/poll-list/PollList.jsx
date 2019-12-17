import React from "react";
import { useQuery } from "react-apollo-hooks";
import { Card, Button, CardColumns, Image } from "react-bootstrap";
import { withRouter } from "react-router";

import { getCurrentUserQuery } from "../../schema/queries";

import "./PollList.scss";

const PollList = props => {
  const openPollView = pollId => props.history.push(`/pollView/${pollId}`);
  const polls = props.polls;
  const defaultPollPic =
    "https://www.petanos.com/wp-content/uploads/2019/08/Cute-Cat-whiskers-Animal-Eyes-Pink-background-Wallpaper.jpg";
  const defaultPic =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6rgutjxxjJkzrNNuUjDHc1_0XWRBvvMRCAEWsT0MzVt3xjYf&s";

  const {
    data: {
      currentUser: { username }
    }
  } = useQuery(getCurrentUserQuery);
  return (
    <div>
      <CardColumns className="cards">
        {polls.map(poll => (
          <Card
            key={poll.title}
            bg="light"
            border="light"
            className="poll-card"
          >
            <Card.Img
              variant="top"
              onError={e => (e.target.src = defaultPollPic)}
              src={poll.imagePath}
              className="card-img"
            />
            {poll.creator.avatar && (
              <Image
                onError={e => (e.target.src = defaultPic)}
                className="poll-list-creator-pic"
                roundedCircle
                src={poll.creator.avatar}
              />
            )}

            <Card.Body>
              <div className="poll-main">
                <div>
                  <Card.Title className="card-title">{poll.title}</Card.Title>
                  <Card.Subtitle>By {poll.creator.username}</Card.Subtitle>
                </div>
                <Button
                  onClick={() => openPollView(poll.id)}
                  className="pass-btn"
                  variant="info"
                  size="lg"
                >
                  {username === poll.creator.username ? "View" : "Pass"}
                </Button>
              </div>

              <Card.Text className="card-text">{poll.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
};

export default withRouter(PollList);
