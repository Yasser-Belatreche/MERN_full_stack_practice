import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

// redux
import { connect } from "react-redux";
import store from "../../redux/store";
import { getScream } from "../../redux/actions/dataActions";

// MUI stuff
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ToolTip from "@material-ui/core/Tooltip";
import ChatIcon from "@material-ui/icons/Chat";

// icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import CircularProgress from "@material-ui/core/CircularProgress";
import LikeButton from "./LikeButton";
import { CLEAR_ERRORS } from "../../redux/types";

const styles = {
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  closeBtn: {
    position: "absolute",
    right: "1%",
    top: "3%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
};

const ScreamDialog = ({ screamId, userHandle, openDialog }) => {
  const {
    data: {
      scream: { body, userImage, comments, commentCount, likeCount, createdAt },
    },
    UI: { loading },
  } = store.getState();

  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState("");

  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
  }, []);

  const handleOpen = () => {
    let oldPath = window.location.pathname;

    setOldPath(window.location.pathname);

    let newPath = `/users/${userHandle}/scream/${screamId}`;

    window.history.pushState(null, null, newPath);

    if (oldPath === newPath) {
      setOldPath(`/users/${userHandle}`);
    }

    setOpen(true);
    store.dispatch(getScream(screamId));
  };

  const handleClose = () => {
    window.history.pushState(null, null, oldPath);

    setOpen(false);
    store.dispatch({ type: CLEAR_ERRORS });
  };

  const dialogMarkup = loading ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "50px",
      }}
    >
      <CircularProgress size={100} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={2}>
      <Grid item sm={5}>
        <img
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src={userImage}
          alt="profile pic"
        />
      </Grid>

      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr style={styles.invisibleSeparator} />
        <Typography color="textSecondary" variant="body2">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr style={styles.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>

        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>

        <ToolTip title="comment" placement="top">
          <IconButton>
            <ChatIcon color="primary" />
          </IconButton>
        </ToolTip>

        <span>{commentCount} comments</span>
      </Grid>

      <hr
        style={{
          width: "100%",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          marginBottom: 20,
        }}
      />
      <CommentForm screamId={screamId} />
      <Comments comments={comments} />
    </Grid>
  );

  return (
    <>
      <Tooltip title="Expand scream!" placement="top">
        <IconButton onClick={handleOpen} style={styles.expandButton}>
          <UnfoldMore />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Tooltip title="Close" placement="top">
          <IconButton onClick={handleClose} style={styles.closeBtn}>
            <CloseIcon />
          </IconButton>
        </Tooltip>

        <DialogTitle id="form-dialog-title">Scream</DialogTitle>

        <DialogContent style={{ padding: 20 }}>{dialogMarkup}</DialogContent>
      </Dialog>
    </>
  );
};

export default connect((state) => ({
  data: state.data,
  UI: state.UI,
}))(ScreamDialog);
