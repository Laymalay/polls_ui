import gql from "graphql-tag";

export const getAllPollsQuery = gql`
  query allPolls($creator: Int) {
    allPolls(creator: $creator) {
      id
      title
      imagePath
      description
      creator {
        avatar
        id
        username
      }
    }
  }
`;

export const getPollQuery = gql`
  query poll($id: Int!) {
    poll(id: $id) {
      id
      title
      imagePath
      description
      creator {
        avatar
        id
        username
      }
      questions {
        id
        title
        choices {
          id
          title
        }
      }
    }
  }
`;

export const getPassedPollQuery = gql`
  query passedPoll($id: Int!) {
    passedPoll(id: $id) {
      score
      answers {
        question {
          title
          answer
          choices {
            id
            title
          }
        }
        choice {
          id
          title
        }
        correct
      }
      poll {
        title
        imagePath
        description
        creator {
          avatar
          username
        }
      }
      user {
        username
      }
    }
  }
`;

export const meQuery = gql`
  query me {
    me {
      id
      username
      email
      firstName
      lastName
      about
      isStaff
      avatar
    }
  }
`;

export const pollPassedByUserQuery = gql`
  query pollPassedByUser($poll: Int!) {
    pollPassedByUser(poll: $poll) {
      id
    }
  }
`;

export const isUserLoggedInQuery = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const getQuestionQuery = gql`
  query question($id: Int!) {
    question(id: $id) {
      id
      title
      answer
      choices {
        id
        title
      }
      answeredQuestions {
        id
        correct
        choice {
          id
          title
        }
        passedPoll {
          user {
            id
            username
          }
        }
      }
    }
  }
`;

export const getUsersQuery = gql`
  query users {
    users {
      id
      username
      firstName
      lastName
      avatar
      about
    }
  }
`;

export const getUserQuery = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      email
      username
      firstName
      lastName
      avatar
      about
    }
  }
`;
