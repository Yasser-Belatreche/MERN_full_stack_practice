import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DeleteButton from "./DeleteButton";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

// MUI stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import IconButton from "@material-ui/core/IconButton";
import ToolTip from "@material-ui/core/Tooltip";

// redux
import { connect } from "react-redux";
import store from "../../redux/store";

const Scream = ({
  userHandle,
  likeCount,
  commentCount,
  createdAt,
  userImage,
  body,
  screamId,
  openDialog,
}) => {
  dayjs.extend(relativeTime);

  const {
    user: {
      credentials: { handle },
      authenticated,
    },
  } = store.getState();

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteButton screamId={screamId} />
    ) : null;

  return (
    <Card style={{ display: "flex", marginBottom: 20, position: "relative" }}>
      <CardMedia
        image={userImage}
        title="Profile image"
        style={{ minWidth: 200, objectFit: "cover" }}
      />

      <CardContent style={{ padding: 25 }}>
        <Typography
          variant="h4"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>

        {deleteButton}

        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>

        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>

        <ToolTip title="comment" placement="top">
          <IconButton>
            <ChatIcon color="primary" />
          </IconButton>
        </ToolTip>

        <span>{commentCount} comments</span>

        <ScreamDialog
          screamId={screamId}
          userHandle={userHandle}
          openDialog={openDialog}
        />
      </CardContent>
    </Card>
  );
};

export default connect((state) => ({
  user: state.user,
}))(Scream);
