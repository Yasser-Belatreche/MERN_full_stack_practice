import React, { useState } from "react";

// MUI stuff
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// redux stuff
import { connect } from "react-redux";
import { postComment } from "../../redux/actions/dataActions";
import store from "../../redux/store";

const CommentForm = ({ screamId }) => {
  const {
    user: { authenticated },
    UI: { errors },
  } = store.getState();
  const [commentBody, setCommentBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    store.dispatch(postComment(screamId, commentBody));
    setCommentBody("");
  };

  const commentFormMarkup = authenticated && (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={errors.comment && true}
          helperText={errors.comment}
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
          style={{}}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: 10 }}
        >
          Submit
        </Button>
      </form>

      <hr
        style={{
          width: "100%",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          marginBottom: 20,
        }}
      />
    </Grid>
  );

  return <>{commentFormMarkup}</>;
};

export default connect((state) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
}))(CommentForm);
