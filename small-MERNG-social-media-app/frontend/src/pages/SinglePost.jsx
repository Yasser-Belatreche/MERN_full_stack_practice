import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import {
  Card,
  Grid,
  Image,
  Button,
  Label,
  Icon,
  Form,
} from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import { useGlobalContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";

const SinglePost = (props) => {
  const postId = props.match.params.postId;
  const { user } = useGlobalContext();

  const [comment, setComment] = useState("");

  const result = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment("");
    },
    variables: {
      postId: postId,
      body: comment,
    },
  });

  const deletePostCallBack = () => {
    props.history.push("/");
  };

  let postMurkup;

  if (!result.data) {
    postMurkup = "Loading Post";
  } else {
    const {
      id,
      body,
      createdAt,
      userName,
      comments,
      likes,
      likesCount,
      commentsCount,
    } = result.data.getPost;

    postMurkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="right"
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{userName}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />

              <Card.Content extra>
                <LikeButton post={{ id, userName, likesCount, likes, user }} />

                <Button as="div" labelPosition="right">
                  <Button color="blue" basic>
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentsCount}
                  </Label>
                </Button>

                {user && user.userName === userName && (
                  <DeleteButton postId={id} callback={deletePostCallBack} />
                )}
              </Card.Content>
            </Card>

            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment === ""}
                        onClick={createComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}

            {comments.map((comment) => {
              return (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user &&
                      (user.userName === comment.userName ||
                        user.userName === userName) && (
                        <DeleteButton postId={id} commentId={comment.id} />
                      )}
                    <Card.Header>{comment.userName}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              );
            })}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMurkup;
};

const FETCH_POST_QUERY = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      userName
      comments {
        id
        createdAt
        userName
        body
      }
      commentsCount
      likes {
        userName
      }
      likesCount
    }
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        userName
        createdAt
      }
      commentsCount
    }
  }
`;

export default SinglePost;
