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
    $questions: [QuestionInputType]!
    $choices: [ChoiceInputType]!
  ) {
    createPoll(
      title: $title
      description: $description
      imagePath: $imagePath
      questions: $questions
      choices: $choices
    ) {
      title
      description
      imagePath
      id
      creator {
        username
        id
        avatar
      }
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
    $avatar: Upload
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      about: $about
      avatar: $avatar
    ) {
      id
      firstName
      lastName
      email
      about
      avatar
    }
  }
`;

export const uploadFileMutation = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file) {
      success
    }
  }
`;
