import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const PostForm = () => {
  const [values, setValues] = useState({
    body: "",
  });

  const [createPost, { error }] = useMutation(FEATCH_ADD_POST_MUTATION, {
    variables: {
      ...values,
    },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      const newData = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: newData },
      });
      values.body = "";
    },
    onError(err) {
      console.log(err);
    },
  });

  const handlePostSubmit = () => {
    createPost();
  };

  const handleInputPostChange = (e) => {
    setValues({
      ...values,
      body: e.target.value,
    });
  };

  return (
    <>
      <Form onSubmit={handlePostSubmit}>
        <h2>Create a new post :</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi world!"
            name="body"
            onChange={handleInputPostChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default PostForm;

const FEATCH_ADD_POST_MUTATION = gql`
  mutation addPost($body: String!) {
    createPost(body: $body) {
      id
      userName
      body
      createdAt
      likesCount
      commentsCount
    }
  }
`;
