import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation ($input: loginInput) {
    login(input: $input) {
      token
    }
  }
`;

export { LOGIN_USER };
