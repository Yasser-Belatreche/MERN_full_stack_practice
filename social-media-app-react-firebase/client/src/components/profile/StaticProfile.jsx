import React from "react";
import dayjs from "dayjs";

// Mui stuff
import MuiLink from "@material-ui/core/Link";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

// redux stuff
import { connect } from "react-redux";

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

const StaticProfile = ({
  profile: { handle, createdAt, imageUrl, bio, website, location },
}) => {
  return (
    <Paper style={styles.paper}>
      <div style={styles.profile}>
        <div style={styles.profile.imageWrapper}>
          <img
            style={styles.profile.profileImage}
            src={imageUrl}
            alt="profile pic"
          />
        </div>

        <hr style={styles.profile.hr} />

        <div style={styles.profile.profileDetails}>
          <MuiLink color="primary" variant="h5" style={{ cursor: "pointer" }}>
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
              <span style={styles.profile.profileDetails.span}>{location}</span>
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
      </div>
    </Paper>
  );
};

export default connect((state) => ({
  data: state.data,
}))(StaticProfile);
