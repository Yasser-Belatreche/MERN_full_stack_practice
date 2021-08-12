import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

// components
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import Profile from "../components/profile/Profile";
import SkreamSkeleton from "../utils/ScreamSkeleton";
import ProfileSceleton from "../utils/ProfileSceleton";

// redux
import store from "../redux/store";
import { getUserData } from "../redux/actions/dataActions";
import { connect } from "react-redux";

const User = (props) => {
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [screamIdParam, setScreamIdParam] = useState(null);

  const {
    data: { screams, loading },
    user: {
      credentials: { handle },
    },
  } = store.getState();

  useEffect(() => {
    const handle = props.match.params.handle;
    const screamId = props.match.params.screamId;

    if (screamId) {
      setScreamIdParam(screamId);
    }

    store.dispatch(getUserData(handle));

    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data.credentials);
        setLoadingProfile(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {loading ? (
          <SkreamSkeleton />
        ) : screams.length === 0 ? (
          <p>No screams from this user</p>
        ) : !screamIdParam ? (
          screams.map((scream) => {
            return <Scream key={scream.screamId} {...scream} />;
          })
        ) : (
          screams.map((scream) => {
            if (scream.screamId !== screamIdParam) {
              return <Scream key={scream.screamId} {...scream} />;
            } else {
              return (
                <Scream key={scream.screamId} {...scream} openDialog={true} />
              );
            }
          })
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        {loadingProfile ? (
          <ProfileSceleton />
        ) : profile.handle !== handle ? (
          <StaticProfile profile={profile} />
        ) : (
          <Profile />
        )}
      </Grid>
    </Grid>
  );
};

export default connect((state) => ({
  data: state.data,
}))(User);
