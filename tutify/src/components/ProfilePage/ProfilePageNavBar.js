import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SchoolIcon from '@material-ui/icons/School';
import '../../index.css'
import { Link } from '@material-ui/core';
import * as NavBarStyles from '../NavBar-styles';
import { withStyles } from "@material-ui/core/styles";

class Logout extends Component {
  render() {
    return (
      <Button href="/" variant="contained" style={{ background: "white" }}>
        Logout
      </Button>
    );
  }
}

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
      Toggle: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.checkSession();
  }

  checkSession = () => {
    fetch('http://localhost:3001/api/checkSession')
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          this.setState({ Toggle: true });
        }
        else {
          this.setState({ Toggle: false });
        }
      })
      .catch(err => console.log(err));
  };

  handleChange(event) {
    fetch('http://localhost:3001/api/logout')
    this.setState({ Toggle: false });
  };

  render() {
    const { classes } = this.props;
    return (

      <div className={classes.root}>
        <AppBar position="fixed" color="inherit" elevation={0} 
                style={{ background: 'linear-gradient(45deg, rgba(0,200,83,1) 0%, rgba(200,255,75,1) 100%)' }}
        >
          <Toolbar style={{
            color: 'white'
          }} >

            <SchoolIcon className={classes.icon} />
            <Box m={1} />

            <Link href="/" className={classes.title} style={{ textDecoration: 'none', color: '#FFF' }}>
              <Typography variant="h6" color="inherit" >
                Tutify
              </Typography>
            </Link>

            <div className={classes.buttonContain}>
              <Button href="/login">
                {this.state.Toggle ? null : <Login />}
              </Button>

              <Button href="/signup">
                {this.state.Toggle ? null : <SignUp />}
              </Button>
              <Button onClick={this.handleChange} href="/">
                {this.state.Toggle ? null : <Logout />}
              </Button>
            </div>

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(NavBarStyles.styles, { withTheme: true })(NavBar);