import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";

// components
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import SkreamSkeleton from "../utils/ScreamSkeleton";

// redux
import store from "../redux/store";
import { getScreams } from "../redux/actions/dataActions";
import { connect } from "react-redux";

const Home = () => {
  useEffect(() => {
    store.dispatch(getScreams());
  }, []);

  const {
    data: { screams, loading },
  } = store.getState();

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {loading ? (
          <SkreamSkeleton />
        ) : (
          screams.map((scream) => {
            return <Scream key={scream.screamId} {...scream} />;
          })
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default connect((state) => ({
  data: state.data,
}))(Home);
