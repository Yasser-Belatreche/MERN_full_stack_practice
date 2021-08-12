import React from "react";
import store from "../../redux/store";
import { deleteScream } from "../../redux/actions/dataActions";

// Mui stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutline";

const DeleteScream = ({ screamId }) => {
  const [open, setOpen] = React.useState(false);

  const handleRemoveClick = () => {
    store.dispatch(deleteScream(screamId));

    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Delete Scream" placement="top">
        <IconButton
          style={{ top: "10%", left: "90%", position: "absolute" }}
          onClick={() => setOpen(true)}
        >
          <DeleteIcon color="secondary" />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Are you sure you want to delete this Scream ?
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleRemoveClick}
            color="secondary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteScream;
