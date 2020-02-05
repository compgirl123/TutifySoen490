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
import {sessionLogout} from '../helper/sessionHelper';


export class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      Toggle: false,
      userType: "",
    };
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
          this.setState({ Toggle: true, email: true, userType: res.userInfo.__t });
        }
        else {
          sessionLogout()
          this.setState({ Toggle: false, email: true });
        }    
      })
      .catch(err => {
        console.error("An error occured while checking the current session: "+err)
        sessionLogout()
      });
  };

  appBarPosition(location){
    return location === "dashboard" ? "fixed" : "absolute"
  }

  render() {
    const { classes, location } = this.props;
    const { open } = this.state;

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
            {this.state.Toggle ? <></>:
              <Link href="/" className={classes.title} style={{ textDecoration: 'none', color: '#FFF' }}>
                <Typography variant="h6" color="inherit" >
                  Tutify
               </Typography>
              </Link>
            }

            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            </Typography>

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
