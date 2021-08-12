import React from "react";
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

// Mui stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

// redux
import store from "../../redux/store";

const EditDetails = () => {
  const {
    user: {
      credentials: { bio, website, location },
    },
  } = store.getState();

  const [open, setOpen] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({
    bio: bio || "",
    website: website || "",
    location: location || "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    store.dispatch(editUserDetails(userDetails));
  };

  return (
    <>
      <Tooltip title="Edit details" placement="top">
        <IconButton onClick={handleClickOpen} style={{ float: "right" }}>
          <EditIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Edit personal information
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            multiline
            rows={3}
            label="Bio"
            type="text"
            value={userDetails.bio}
            onChange={(e) =>
              setUserDetails({ ...userDetails, bio: e.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            id="location"
            label="Location"
            type="text"
            value={userDetails.location}
            onChange={(e) =>
              setUserDetails({ ...userDetails, location: e.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            id="website"
            label="website"
            type="text"
            value={userDetails.website}
            onChange={(e) =>
              setUserDetails({ ...userDetails, website: e.target.value })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ margin: 10 }} onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            style={{ margin: 10 }}
            onClick={handleSave}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default connect((state) => ({
  user: state.user,
}))(EditDetails);
