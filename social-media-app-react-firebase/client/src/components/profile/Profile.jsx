import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
import ProfileSceleton from "../../utils/ProfileSceleton";

// Mui stuff
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ToolTip from "@material-ui/core/Tooltip";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

// redux stuff
import store from "../../redux/store";
import { connect } from "react-redux";
import { uploadImage, logoutUser } from "../../redux/actions/userActions";

const styles = {
  paper: {
    padding: 20,
  },
  profile: {
    imageWrapper: {
      textAlign: "center",
      position: "relative",
      button: {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    profileImage: {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    profileDetails: {
      textAlign: "center",
      span: {
        verticalAlign: "middle",
      },
      svg: {
        verticalAlign: "middle",
      },
      a: {
        color: "#00bcd4",
      },
    },
    hr: {
      border: "none",
      margin: "0 0 10px 0",
    },
    svg: {
      button: {
        cursor: "pointer",
      },
    },
  },
  button: {
    textAlign: "center",
    a: {
      margin: "20px 10px",
    },
  },
};

const Profile = () => {
  const {
    user: {
      credentials: { handle, createdAt, imageUrl, bio, website, location },
      authenticated,
      loading,
    },
  } = store.getState();

  const handleImageChange = (e) => {
    const image = e.target.files[0];

    // send to server
    const formData = new FormData();
    formData.append("image", image, image.name);

    store.dispatch(uploadImage(formData));
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("image-input");

    fileInput.click();
  };

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper style={styles.paper}>
        <div style={styles.profile}>
          <div style={styles.profile.imageWrapper}>
            <img
              style={styles.profile.profileImage}
              src={imageUrl}
              alt="profile pic"
            />
            <input
              type="file"
              hidden="hidden"
              id="image-input"
              onChange={handleImageChange}
            />
            <ToolTip title="edit profile picture" placement="top">
              <IconButton
                onClick={handleEditPicture}
                style={styles.profile.imageWrapper.button}
              >
                <EditIcon color="primary" />
              </IconButton>
            </ToolTip>
          </div>

          <hr style={styles.profile.hr} />

          <div style={styles.profile.profileDetails}>
            <MuiLink
              style={{
                ...styles.profile.profileDetails.svg,
                cursor: "pointer",
              }}
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr style={styles.profile.hr} />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr style={styles.profile.hr} />
            {location && (
              <>
                <LocationOn
                  color="primary"
                  style={styles.profile.profileDetails.svg}
                />{" "}
                <span style={styles.profile.profileDetails.span}>
                  {location}
                </span>
                <hr style={styles.profile.hr} />
              </>
            )}
            {website && (
              <>
                <LinkIcon
                  color="primary"
                  style={styles.profile.profileDetails.svg}
                />
                <a
                  style={styles.profile.profileDetails.a}
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                >
                  {"  "}
                  {website}
                </a>
                <hr style={styles.profile.hr} />
              </>
            )}
            <CalendarToday
              color="primary"
              style={styles.profile.profileDetails.svg}
            />{" "}
            {"  "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>

          <ToolTip title="logout" placement="top">
            <IconButton onClick={() => store.dispatch(logoutUser())}>
              <KeyboardReturn />
            </IconButton>
          </ToolTip>

          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper style={styles.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div style={styles.button}>
          <Button
            style={styles.button.a}
            color="primary"
            variant="contained"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            style={styles.button.a}
            color="secondary"
            variant="contained"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <ProfileSceleton />
  );

  return profileMarkup;
};

export default connect((state) => ({
  user: state.user,
}))(Profile);
