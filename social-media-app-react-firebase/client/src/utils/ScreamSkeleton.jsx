import React from "react";
import noImage from "../images/no-image.jpg";

// MUI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25,
  },
  cover: {
    minWidth: 200,
    objectFit: "cover",
  },
  handle: {
    height: 20,
    width: 60,
    backgroundColor: "#00bcd4",
    marginBottom: 7,
  },
  data: {
    height: 12,
    width: 100,
    backgroundColor: "rgba(0,0,0, 0.3)",
    marginBottom: 10,
  },
  fullLine: {
    height: 15,
    width: "90%",
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0, 0.6)",
  },
  halfLine: {
    height: 15,
    width: "50%",
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0, 0.6)",
  },
};

const SkreamSkeleton = () => {
  const content = Array.from({ length: 5 }).map((item, index) => {
    return (
      <Card style={styles.card} key={index}>
        <CardMedia style={styles.cover} image={noImage} />

        <CardContent style={styles.cardContent}>
          <div style={styles.handle} />
          <div style={styles.date} />
          <div style={styles.fullLine} />
          <div style={styles.fullLine} />
          <div style={styles.halfLine} />
        </CardContent>
      </Card>
    );
  });

  return <>{content}</>;
};

export default SkreamSkeleton;
