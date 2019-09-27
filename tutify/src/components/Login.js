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
 // initialize our state
   // initialize our state
   constructor(props) {
    super(props);
    this.state = {
      data: [],
      email : null,
      first_name: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);      
    }
    
    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
      this.getDataFromDb();
     // if (!this.state.intervalIsSet) {
       // let interval = setInterval(this.getDataFromDb, 1000);
        //this.setState({ intervalIsSet: interval });
      //}
    }
    
  
    // never let a process live forever
    // always kill a process everytime we are done using it
   /**componentWillUnmount() {
      if (this.state.intervalIsSet) {
        clearInterval(this.state.intervalIsSet);
        this.setState({ intervalIsSet: null });
      }
    }
    */
  
    // just a note, here, in the front end, we use the id key of our data object
    // in order to identify which we want to Update or delete.
    // for our back end, we use the object id assigned by MongoDB to modify
    // data base entries
  
    // our first get method that uses our backend api to
    // fetch data from our data base
    getDataFromDb = () => {
      fetch('http://localhost:3001/api/getUser')
        .then((data) => data.json())
        .then((res) => this.setState({ data: res.data }));
    };
  

    // our put method that uses our backend api
    // to create new query into our data base
    handleSubmit(event){
      event.preventDefault();
      console.log("TANYA")
      fetch('http://localhost:3001/api/authUser', {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
        "email" : document.getElementById("email").value,
        "first_name": document.getElementById("first_name").value
         })
        //email : email,
        //first_name : first_name
      })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if(res.isLoggedIn){
          alert("Signed in");
          this.props.history.push("/search_page");
        }
        else{
          alert("Invalid user or password");
        }
      })
      .catch(err => console.log(err));
    };
  

    checkSession = () => {
      fetch('http://localhost:3001/api/dashboard')
        .then((data) => data.json())
        .then((res) => this.setState({ data: res.data }));
    };

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
