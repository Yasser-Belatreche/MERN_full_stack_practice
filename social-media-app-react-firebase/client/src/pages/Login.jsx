import React, { useState } from "react";
import appIcon from "../images/—Pngtree—cute monkey head_4242404.png";
import { Link } from "react-router-dom";

// MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// redux stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import store from "../redux/store";

const styles = {
  form: {
    textAlign: "center",
  },
  title: {
    margin: "20px auto",
  },
  image: {
    margin: "20px auto",
  },
  textField: {
    margin: "10px auto",
  },
  btn: {
    marginTop: 20,

    width: 75,
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
};

const Login = (props) => {
  const { dispatch } = store;
  const {
    UI: { loading, errors },
  } = store.getState();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(userInfo, props.history));
  };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <Grid container style={styles.form}>
      <Grid item sm />
      <Grid item sm>
        <img width="50px" src={appIcon} alt="app icon" styles={styles.image} />
        <Typography variant="h2" style={styles.title}>
          Login
        </Typography>

        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            helperText={errors.email}
            error={errors.email ? true : false}
            style={styles.textField}
            value={userInfo.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            helperText={errors.password}
            error={errors.password ? true : false}
            style={styles.textField}
            value={userInfo.password}
            onChange={handleChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" style={styles.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={styles.btn}
            disabled={loading ? true : false}
          >
            {loading ? <CircularProgress color="inherit" size={24} /> : "Login"}
          </Button>
          <br />
          <small>
            Don't have an account ? sign up{" "}
            <Link to="/signup" style={{ color: "blue" }}>
              here
            </Link>
          </small>
        </form>
      </Grid>

      <Grid item sm />
    </Grid>
  );
};

export default connect((state) => ({
  user: state.user,
  UI: state.UI,
}))(Login);
