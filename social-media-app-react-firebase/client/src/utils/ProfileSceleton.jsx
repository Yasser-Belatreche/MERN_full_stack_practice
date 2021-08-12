import React from "react";
import noImage from "../images/no-image.jpg";

// MUI
import Paper from "@material-ui/core/Paper";

const styles = {
  handle: {
    height: 20,
    width: 60,
    backgroundColor: "#00bcd4",
    marginBottom: 20,
    marginTop: 20,
  },
  fullLine: {
    height: 15,
    width: "90%",
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0, 0.4)",
  },
  halfLine: {
    height: 15,
    width: "50%",
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0, 0.6)",
  },
  paper: {
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
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
  },
};

const SkreamSkeleton = () => {
  const content = (
    <Paper style={styles.paper}>
      <div style={styles.profile.imageWrapper}>
        <img
          style={styles.profile.profileImage}
          src={noImage}
          alt="profile image"
        />
      </div>
      <div style={styles.handle} />
      <div style={styles.fullLine} />
      <div style={styles.fullLine} />
      <div style={styles.fullLine} />
      <div style={styles.fullLine} />
      <div style={styles.fullLine} />
    </Paper>
  );

  return <>{content}</>;
};

export default SkreamSkeleton;
