import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Comments = ({ comments }) => {
  return (
    <Grid container>
      {comments.map((comment, index) => {
        const { body, userImage, userHandle, createdAt } = comment;
        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img
                    src={userImage}
                    alt="profile pic"
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </Grid>
                <Grid item sm={9}>
                  <div style={{ marginLeft: 20 }}>
                    <Typography
                      color="primary"
                      variant="h5"
                      component={Link}
                      to={`/users/${userHandle}`}
                    >
                      {userHandle}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                    </Typography>
                    <hr style={{ border: "none", margin: 4 }} />
                    <Typography variant="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr
                style={{
                  width: "100%",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                  marginBottom: 20,
                }}
              />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
};

export default Comments;
