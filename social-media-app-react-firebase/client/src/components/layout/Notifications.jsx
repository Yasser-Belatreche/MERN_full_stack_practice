import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

// icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import store from "../../redux/store";
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

const Notifications = () => {
  dayjs.extend(relativeTime);

  const {
    user: { notifications },
  } = store.getState();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

    const notificationIds = notifications
      .filter((notif) => !notif.read)
      .map((notif) => {
        return notif.notificationId;
      });

    if (notificationIds.length > 0) {
      store.dispatch(markNotificationsRead(notificationIds));
    }
  };

  let notificationIcon;
  if (notifications && notifications.length > 0) {
    const numOfNotifUnread = notifications.filter(
      (notif) => notif.read === false
    ).length;
    numOfNotifUnread > 0
      ? (notificationIcon = (
          <Badge badgeContent={numOfNotifUnread} color="secondary">
            <NotificationsIcon style={{ color: "#fff" }} />
          </Badge>
        ))
      : (notificationIcon = <NotificationsIcon style={{ color: "#fff" }} />);
  } else {
    notificationIcon = <NotificationsIcon style={{ color: "#fff" }} />;
  }

  const notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((notif) => {
        const verb = notif.type === "like" ? "liked" : "commented on";
        const time = dayjs(notif.createdAt).fromNow();
        const iconColor = notif.read ? "primary" : "secondary";
        const icon =
          notif.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} />
          );

        return (
          <MenuItem
            key={notif.createdAt}
            onClick={handleClose}
            component={Link}
            to={`/users/${notif.recipient}/scream/${notif.screamId}`}
          >
            {icon}
            <Typography color="default" variant="body1">
              {notif.sender} {verb} Your Scream {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );

  return (
    <div>
      <Tooltip title="Notifications" placement="top">
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notificationsMarkup}
      </Menu>
    </div>
  );
};

export default connect((state) => ({
  user: state.user,
}))(Notifications);
