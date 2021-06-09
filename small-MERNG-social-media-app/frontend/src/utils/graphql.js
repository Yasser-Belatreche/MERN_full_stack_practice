import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      userName
      likesCount
      commentsCount
      likes {
        userName
      }
      comments {
        id
        userName
        body
        createdAt
      }
    }
  }
`;
