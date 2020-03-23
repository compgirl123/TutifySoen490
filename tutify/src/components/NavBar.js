import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SchoolIcon from '@material-ui/icons/School';
import { Link } from '@material-ui/core';
import * as NavBarStyles from '../styles/NavBar-styles';
import { withStyles } from "@material-ui/core/styles";
import {sessionLogout} from '../helper/sessionHelper';

class SignUp extends Component {
  render() {
    return (
      <Button href="/signup" variant="contained" style={{ background: "white" }}>
        Sign up
      </Button>
    );
  }
}

class Login extends Component {
  render() {
    return (
      <Button variant="contained" type="submit" style={{ background: "white" }}  >
        Login
      </Button>
    );
  }
}

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Toggle: false,
      userType: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

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
          this.setState({
            Toggle: true,
            userType: res.userInfo.__t
          });
        }
        else {
          this.setState({ Toggle: false });
        }
      })
      .catch(err => {
        console.error("An error occured while checking the current session: "+err)
        if(this.props.location !== "index")
          sessionLogout()
      });
  }

  // this method handles the "Logout" button
  handleChange(event) {
    console.info("Deleting session...");
    fetch('/api/logout', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => {
        localStorage.clear();
        this.setState({ Toggle: false });        
      })
      .catch(err => {
        console.error("Logging out: " + err)
        localStorage.clear();
      });
  };


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="fixed" color="inherit" elevation={0} style={{ background: 'linear-gradient(45deg, rgba(0,200,83,1) 0%, rgba(200,255,75,1) 100%)' }}
        >
          <Toolbar style={{
            color: 'white'
          }} >

            <SchoolIcon className={classes.icon} />
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

            {this.state.Toggle ?
              <p></p>
              :
              <div className={classes.buttonContain}>
                <Button href="/login">
                  <Login />
                </Button>

                <Button href="/signup">
                  <SignUp />
                </Button>
              </div>
            }

          </Toolbar>
        </AppBar>
      </div >
    );
  }
}

export default withStyles(NavBarStyles.styles, { withTheme: true })(NavBar);