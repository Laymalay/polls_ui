import gql from "graphql-tag";

export const updatePollMutation = gql`
  mutation updatePoll(
    $title: String
    $description: String
    $imagePath: String
    $id: String!
  ) {
    updatePoll(
      id: $id
      title: $title
      description: $description
      imagePath: $imagePath
    ) {
      id
      title
      description
      imagePath
    }
  }
`;

export const deletePollMutation = gql`
  mutation deletePoll($id: ID!) {
    deletePoll(id: $id) {
      id
    }
  }
`;

export const createPollMutation = gql`
  mutation createPoll(
    $title: String!
    $description: String!
    $imagePath: String!
  ) {
    createPoll(
      title: $title
      description: $description
      imagePath: $imagePath
    ) {
      title
      description
      imagePath
      id
      creator {
        username
      }
    }
  }
`;
export const createQuestionMutation = gql`
  mutation createQuestion($title: String!, $pollId: Int!, $answer: String!) {
    createQuestion(title: $title, pollId: $pollId, answer: $answer) {
      id
    }
  }
`;
export const createChoiceMutation = gql`
  mutation createChoice($title: String!, $questionId: Int!) {
    createChoice(title: $title, questionId: $questionId) {
      title
    }
  }
`;
export const signupMutation = gql`
  mutation signupMutation(
    $email: String!
    $password: String!
    $username: String!
  ) {
    createUser(email: $email, password: $password, username: $username) {
      email
      username
    }
  }
`;

export const loginMutation = gql`
  mutation loginMutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const createPassedPollMutation = gql`
  mutation createPassedPoll(
    $pollId: Int!
    $answeredQuestions: [AnsweredQuestionInputType]
  ) {
    createPassedPoll(pollId: $pollId, answeredQuestions: $answeredQuestions) {
      id
      poll {
        id
        title
      }
      user {
        username
      }
      score
    }
  }
`;

export const updateUserMutation = gql`
  mutation updateUser(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $about: String!
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      about: $about
    ) {
      id
      firstName
      lastName
      email
      about
    }
  }
`;
