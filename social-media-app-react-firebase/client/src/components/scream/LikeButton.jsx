import React from "react";
import { Link } from "react-router-dom";

// MUI stuff
import FavouriteIcon from "@material-ui/icons/Favorite";
import FavouriteBorder from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import ToolTip from "@material-ui/core/Tooltip";

// redux
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";
import store from "../../redux/store";

const LikeButton = ({ screamId }) => {
  const {
    user: { authenticated, likes },
  } = store.getState();

  const isScreamLiked = () => {
    if (likes && likes.find((like) => like.screamId === screamId)) {
      return true;
    }
    return false;
  };

  const likeThisScream = () => {
    store.dispatch(likeScream(screamId));
  };

  const unlikeThisScream = () => {
    store.dispatch(unlikeScream(screamId));
  };

  if (!authenticated) {
    return (
      <>
        <ToolTip title="like" placement="top">
          <Link to="/login">
            <IconButton>
              <FavouriteBorder color="primary" />
            </IconButton>
          </Link>
        </ToolTip>
      </>
    );
  } else {
    return (
      <>
        <ToolTip title={isScreamLiked() ? "unlike" : "like"} placement="top">
          <IconButton
            onClick={() =>
              isScreamLiked() ? unlikeThisScream() : likeThisScream()
            }
          >
            {isScreamLiked() ? (
              <FavouriteIcon color="primary" />
            ) : (
              <FavouriteBorder color="primary" />
            )}
          </IconButton>
        </ToolTip>
      </>
    );
  }
};

export default connect((state) => ({
  user: state.user,
}))(LikeButton);
