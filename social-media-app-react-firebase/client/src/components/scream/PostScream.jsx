import React from "react";
import { connect } from "react-redux";

// redux
import store from "../../redux/store";
import { postScream } from "../../redux/actions/dataActions";
import { CLEAR_ERRORS } from "../../redux/types";

// MUI stuff
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

import CircularProgress from "@material-ui/core/CircularProgress";

const PostScream = () => {
  const {
    UI: { errors, loading },
  } = store.getState();

  const [open, setOpen] = React.useState(false);
  const [body, setBody] = React.useState("");

  const handlePostScream = () => {
    store.dispatch(postScream(body));

    if (!(body.trim() === "")) {
      handleClose();
    }
  };

  const handleClose = () => {
    store.dispatch({ type: CLEAR_ERRORS });
    setOpen(false);
    setBody("");
  };
  return (
    <>
      <Tooltip title="Post a scream!" placement="top">
        <IconButton onClick={() => setOpen(true)}>
          <AddIcon style={{ color: "#fff" }} />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Post new scream</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="body"
            label="SCREAM!!"
            placeholder="Scream at your fellow apes"
            type="text"
            helperText={errors.body}
            error={errors.body ? true : false}
            value={body}
            multiline
            rows={3}
            onChange={(e) => setBody(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{ width: 75, margin: 10 }}
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePostScream}
            color="primary"
            variant="contained"
            style={{ margin: 10 }}
          >
            {loading ? <CircularProgress color="inherit" size={24} /> : "Post"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default connect((state) => ({
  UI: state.UI,
}))(PostScream);
