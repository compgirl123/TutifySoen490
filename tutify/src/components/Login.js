import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import large_tutify from './../assets/large_tutify.png';
import * as tutifyStyle from '../styles/SignUp-styles';
import { withStyles } from "@material-ui/core/styles";
import NavBar from './NavBar';
import Footer from './Footer';
import './style.css';
import swal from 'sweetalert';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      email: null,
      password: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getUser')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  //Authenticates User when submit button is pressed
  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:3001/api/authUser', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": document.getElementById("email").value,
        "password": document.getElementById("password").value
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          if (res.userInfo.__t === 'student') {
            window.location = "dashboard";
          }
          else if (res.userInfo.__t === 'tutor') {
            window.location = "tutor";
          }
        }
        else {
          swal("Invalid username or password!", "Please try again.", "error");
        }
      })
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <NavBar />
        <Container component="main">
          <CssBaseline />
          <div className="paper">
            <img src={large_tutify} className="App-logo" alt="logo" />
            <form className="form" noValidate onSubmit={this.handleSubmit}
            >
              <Grid container spacing={3}
                direction="column"
                style={{ minHeight: '40vh' }}>

                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    required
                    style={{ width: 350 }}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    required
                    style={{ width: 350 }}
                    name="password"
                    label="password"
                    type="password"
                    id="password"
                    autoComplete="password"
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={6} >
                  <Button
                    type="submit"
                    style={{ width: 350 }}
                    variant="contained"
                    className="submit"
                  >
                    Login
                  </Button>
                  <Grid item style={{ paddingTop: '20px' }}>
                    <Link href="#" variant="body2" justify="flex-end">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </div>
          <Footer />
        </Container>
      </div>
    );
  }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(Login);