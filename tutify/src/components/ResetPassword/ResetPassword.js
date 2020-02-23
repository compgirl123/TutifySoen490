import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as tutifyStyle from '../../styles/SignUp-styles';
import { withStyles } from "@material-ui/core/styles";
import NavBar from '../NavBar';
import Footer from '../Footer';
import '../style.css';
import swal from 'sweetalert';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

export class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      newPassword: "",
      confirmPassword: "",
    };
    this.resetPassword = this.resetPassword.bind(this);
  }

  //this method updates the user's password
  resetPassword = () => {
    var url = window.location.href.split("/");
    var token = url[url.length - 1];
  
    if (this.state.newPassword === this.state.confirmPassword) {
      console.info("Updating password in db");
      axios.post('/api/resetPassword', {
        password: this.state.newPassword,
        resetPasswordToken: token
      })
        .then((res) => {

          if (res.data.success) {
            swal("Password successfully reset!", "", "success").then((res) => {
              window.location = "/login";

            }, (error) => {
              console.error("Could not display swal alert. " + error);
            });
          }
          else {
            swal("Unable to reset password!", "The reset password token has expired or is invalid.", "error").then((res) => {
              window.location = window.location.href;

            }, (error) => {
              console.error("Could not display swal alert. " + error);
            });
          }
        }, (error) => {
          console.error("Could not reset password (API call error) " + error);
        });
    }
    else {

      swal("Invalid password!", "New password and confirm password do not match.", "error").then((res) => {
        window.location = window.location.href;

      }, (error) => {
        console.error("Could not display swal alert. " + error);
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <NavBar />
        <Container component="main">
          <CssBaseline />
          <div className="paper">
            <Grid container spacing={3}
              direction="column"
              style={{ minHeight: '55vh' }}
              justify="center"
              alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h6" color="inherit" style={{ fontWeight: "bold" }} >
                  Reset Password
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  style={{ width: 350 }}
                  label="New Password"
                  margin="dense"
                  type="password"
                  id="newPassword"
                  onChange={e => this.setState({ newPassword: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  style={{ width: 350 }}
                  label="Confirm Password"
                  margin="dense"
                  id="confirmPassword"
                  type="password"
                  onChange={e => this.setState({ confirmPassword: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} >
                <Button
                  name="submit"
                  type="submit"
                  style={{ width: 350 }}
                  variant="contained"
                  className="loginSubmit"
                  onClick={() => this.resetPassword()}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline
                    }}}
                  >
                  Update Password
                  </Button>
              </Grid>
            </Grid>
          </div>
          <Footer />
        </Container>
      </div>
    );
  }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(ForgotPassword);

