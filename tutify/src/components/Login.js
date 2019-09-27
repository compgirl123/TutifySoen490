import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container'; 
import CssBaseline from '@material-ui/core/CssBaseline';
import large_tutify from './../assets/large_tutify.png';
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import { FormControl } from '@material-ui/core';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import AppBar from '@material-ui/core/AppBar';
import SchoolIcon from '@material-ui/icons/School';
import Toolbar from '@material-ui/core/Toolbar';
import * as tutifyStyle from './SignUp-styles';
import { withStyles } from "@material-ui/core/styles";

class Copyright extends Component{
  render() {
    return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'© '}
      <Link color="inherit" href="https://material-ui.com/">
        Tutify
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
  }
  
}
class Login extends React.Component {

  render() {
    const { classes } = this.props;
   
    return (
    <div>
      <AppBar className={classes.appBar}>
          <Toolbar>
            <SchoolIcon className = "icon" />
            <Typography variant="h6" color="inherit" noWrap>
              Tutify
            </Typography>
          </Toolbar>
        </AppBar>
    <Container component = "main">
     <CssBaseline />
      <div className = "paper">
       <img src={large_tutify} className="App-logo" alt="logo" />
      <form className="form" noValidate onSubmit={this.handleSubmit}
>
      <Grid container spacing={3}
  direction="column"
  style={{ minHeight: '40vh'}}>
           
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                style = {{width: 350}}
                id="email"
                label="Email Address"
                name="email"
                onChange={(e) => this.setState({ email : e.target.value })}
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
                style = {{width: 350}}
                name="first_name"
                onChange={(e) => this.setState({ first_name : e.target.value })}
                label="First Name"
                type="first_name"
                id="first_name"
                autoComplete="first_name"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
            </Grid>
          
             <Grid >
            <Button
            type="submit"
            style = {{width: 350}}
            variant="contained"
            className="submit"
          >
            Login
          </Button>
            <Grid className={classes.signUpButton} container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
          </Grid>

        </Grid>
       
          
      </form>
    </div>
   <Box mt={5}>
        <Copyright />
      </Box>
       </Container>
       </div>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(Login);
