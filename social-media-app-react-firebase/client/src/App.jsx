import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiStrictModeTheme";
import jwtDecode from "jwt-decode";
import axios from "axios";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { getUserData, logoutUser } from "./redux/actions/userActions";

// Components
import Navbar from "./components/layout/Navbar";
// Pages
import home from "./pages/Home";
import login from "./pages/Login";
import signup from "./pages/Signup";
import AuthRoute from "./utils/AuthRoute";
import User from "./pages/User";

const Theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c0dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
});

// check for token and authenticate the user and get it's information
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < new Date()) {
    store.dispatch(logoutUser());

    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });

    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={Theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute path="/login" component={login} />
              <AuthRoute path="/signup" component={signup} />
              <Route exact path="/users/:handle" component={User} />
              <Route
                exact
                path="/users/:handle/scream/:screamId"
                component={User}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
