import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SchoolIcon from '@material-ui/icons/School';
import * as NavBarStyles from '../styles/DashBoardNavBar-styles';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavDrawer } from "./NavDrawer";
import { Link } from '@material-ui/core';
import { sessionLogout } from '../helper/sessionHelper';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import NavbarNotification from './UserDashboardPage/Notification/NavbarNotification'
import axios from 'axios';


export class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      Toggle: false,
      userType: "",
      anchorEl: null,
      notifications: [],
      notifCount: 0,
      id: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  toggleDrawer = booleanValue => () => {
    this.setState({
      drawerOpened: booleanValue
    });
  };

  componentDidMount() {
    this.checkSession();
  }

  checkSession = () => {
    console.info("Fetching session...");
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          console.log("User is loggged in.");
          this.setState({ 
            Toggle: true, email: true, 
            id: res.userInfo._id,
            userType: res.userInfo.__t,
            notifications: res.userInfo.notifications,
            notifCount: res.userInfo.nbNewNotifications, 
          });
        }
        else {
          sessionLogout()
          this.setState({ Toggle: false, email: true });
        }
      })
      .catch(err => {
        console.error("An error occured while checking the current session: " + err)
        sessionLogout()
      });
  };

  appBarPosition(location) {
    return location === "dashboard" ? "fixed" : "absolute"
  }


  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClick = event => {
    if(this.state.notifCount > 0) {
      axios.post('/api/clearNewNotificationCount', {
        student: this.state.id,
      })
    }
    this.setState({ 
      anchorEl: event.currentTarget,
      notifCount: 0,
    });
  };

  render() {
    const { classes, location } = this.props;
    const { open, anchorEl, notifications, notifCount } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position={this.appBarPosition(location)} className={clsx(classes.appBar, open && classes.appBarShift)} style={{ background: 'linear-gradient(45deg, rgba(0,200,83,1) 0%, rgba(200,255,75,1) 100%)' }}>

          <Toolbar className={classes.toolbar}>
            {this.state.Toggle && location !== "dashboard" ? <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.toggleDrawer(true)}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton> : null}


            <SchoolIcon />
            <Box m={1} />

            {this.state.Toggle && this.state.userType === 'student' ?
              <Link href="/dashboard" className={classes.title} style={{ textDecoration: 'none', color: '#FFF' }}>
                <Typography variant="h6" color="inherit" >
                  Tutify
                </Typography>
              </Link>
              : <></>
            }
            {this.state.Toggle && this.state.userType === 'tutor' ?
              < Link href="/profile" className={classes.title} style={{ textDecoration: 'none', color: '#FFF' }}>
                <Typography variant="h6" color="inherit" >
                  Tutify
                </Typography>
              </Link> : <></>
            }
            {this.state.Toggle ? <></> :
              <Link href="/" className={classes.title} style={{ textDecoration: 'none', color: '#FFF' }}>
                <Typography variant="h6" color="inherit" >
                  Tutify
               </Typography>
              </Link>
            }

            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            </Typography>

            <IconButton aria-label="bell" color="inherit" onClick={this.handleClick}>
              <Badge color="secondary" badgeContent={notifCount}>
                <NotificationsIcon fontSize="medium" />
              </Badge>
            </IconButton>
            <Menu
              className={classes.notif}
              id="notif-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <NavbarNotification notifications={notifications}/>
            </Menu>

          </Toolbar>
        </AppBar>
        {
          location !== "dashboard" ?
            <NavDrawer
              drawerOpened={this.state.drawerOpened}
              toggleDrawer={this.toggleDrawer}
            /> : <></>
        }

      </div>

    );
  }
}
export default withStyles(NavBarStyles.styles, { withTheme: true })(NavBar);
