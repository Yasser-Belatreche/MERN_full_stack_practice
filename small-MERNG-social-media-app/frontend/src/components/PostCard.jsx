import React, { useState } from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useGlobalContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "./DeleteButton";

const PostCard = ({
  body,
  createdAt,
  id,
  userName,
  likesCount,
  commentsCount,
  likes,
}) => {
  const { user } = useGlobalContext();

  const handleCommentPost = () => {
    console.log("comment post");
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{userName}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{ id, userName, likesCount, likes, user }} />

        <Button
          as="div"
          labelPosition="right"
          onClick={handleCommentPost}
          as={Link}
          to={`/posts/${id}`}
        >
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentsCount}
          </Label>
        </Button>

        {user && user.userName === userName && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
