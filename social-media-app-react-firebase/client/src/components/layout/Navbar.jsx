import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications";

// redux
import store from "../../redux/store";

// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";

const Navbar = () => {
  const {
    user: { authenticated },
  } = store.getState();

  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <>
            <PostScream />
            <Link to="/">
              <Tooltip title="Home" placement="top">
                <IconButton>
                  <HomeIcon style={{ color: "#fff" }} />
                </IconButton>
              </Tooltip>
            </Link>

            <Notifications />
          </>
        ) : (
          <>
            <Button
              color="inherit"
              style={{ cursor: "pointer" }}
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              color="inherit"
              style={{ cursor: "pointer" }}
              component={Link}
              to="/"
            >
              Home
            </Button>
            <Button
              color="inherit"
              style={{ cursor: "pointer" }}
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default connect((state) => ({
  user: state.user,
}))(Navbar);
