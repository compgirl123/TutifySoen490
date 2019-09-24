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
import './style.css'
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import { FormControl } from '@material-ui/core';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";

/*var CryptoJS = require("crypto-js");
var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
console.log("encrypted text", ciphertext.toString());

var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
var plaintext = bytes.toString(CryptoJS.enc.Utf8);
console.log("decrypted text", plaintext);*/

// const styles = theme => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap"
//   },
//   formControl: {
//     margin: theme.spacing.unit,
//     minWidth: 120
//   },
//   selectEmpty: {
//     marginTop: theme.spacing.unit * 2
//   }
// });

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



class Database2 extends React.Component {
  // initialize our state
    state = {
      data: [],
      id: 0,
      first_name: null,
      last_name : null,
      email : null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
      education_level: null,
      classes_tutored : null,
      type_tutoring : null
    };
    
    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
      this.getDataFromDb();
      if (!this.state.intervalIsSet) {
        let interval = setInterval(this.getDataFromDb, 1000);
        this.setState({ intervalIsSet: interval });
      }
    }
  
    // never let a process live forever
    // always kill a process everytime we are done using it
    componentWillUnmount() {
      if (this.state.intervalIsSet) {
        clearInterval(this.state.intervalIsSet);
        this.setState({ intervalIsSet: null });
      }
    }
  
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
    putDataToDB = (first_name,last_name,email,education_level,classes_tutored,type_tutoring) => {
      let currentIds = this.state.data.map((data) => data.id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
        ++idToBeAdded;
      }
  
      axios.post('http://localhost:3001/api/putUser', {
        id: idToBeAdded,
        first_name: first_name,
        last_name : last_name,
        email : email,
        education_level : education_level,
        classes_tutored : classes_tutored,
        type_tutoring : type_tutoring
      });
    };
  
 
  

  handleChange(value) {
    this.setState({ education_level: value });
  }

  handleClick() {
    this.setState({ hasError: false });
    if (!this.state.education_level) {
      this.setState({ hasError: true });
    }
  }

  render() {
    const { education_level, classes_tutored,type_tutoring, hasError } = this.state;
    //const { classes_tutored, hasError} = this.state;
    // const mystyle = {
    //   color: "black",
    //   backgroundColor: "DodgerBlue",
    //   padding: "10px",
    //   fontFamily: "Arial"
    // };
//     const { classes } = this.props;
//     const educationLevel = [
//     {
//       value: "elementary",
//       label: "Elementary School"
//     },
//     {
//       value: "highschool",
//       label: "High School"
//     },
//     {
//       value: "cegep",
//       label: "Cegep"
//     },
//     {
//       value: "university",
//       label: "University"
//     },
//     {
//       value: "adulteducation",
//       label: "Adult Education"
//     }
//   ];
//   const classesTutor = [
//   {
//     value: "chem204",
//     label: "chem204"
//   },
//   {
//     value: "chem205",
//     label: "chem205"
//   },
//   {
//     value: "math204",
//     label: "math204"
//   },
//   {
//     value: "math205",
//     label: "math205"
//   }
// ];
// const typeOFTutoring = [
//   {
//     value: "crashcourse",
//     label: "Crash Course"
//   },
//   {
//     value: "weeklytutoring",
//     label: "Weekly Tutoring"
//   },
//   {
//     value: "oneononetutoring",
//     label: "One on One Tutoring"
//   },
//   {
//     value: "grouptutoring",
//     label: "Group Tutoring"
//   }
// ];

// const useStyles = theme => ({
//   root: {
//     backgroundColor: "red"
//   }
// });



    return (
    
    <div >
    <Container component = "main" className = "class11">
     <CssBaseline />

      <div className = "paper">

       <img src={large_tutify} className="App-logo" alt="logo" />

      <Typography component="h1" variant="h5">
          Sign Up Page
      </Typography>

      
      <form className="form" noValidate>
      <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={(e) => this.setState({ first_name: e.target.value })}
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={(e) => this.setState({ last_name: e.target.value })}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Username"
                label="Username"
                name="Username"
                autoComplete="username"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(e) => this.setState({ email: e.target.value })}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Confirmpassword"
                label="Confirm Password"
                type="Confirmpassword"
                id="Confirmpassword"
                autoComplete="current-Confirmpassword"
              />
            </Grid>

            <Grid item xs={12}>  
            <form autoComplete="off">
              <FormControl >
                <InputLabel htmlFor="education_level">Education Level</InputLabel>
                <Select
                  name="education_level"
                  value={education_level}
                  onChange={event => this.setState({education_level:event.target.value})}
                // onChange={(e) => this.setState({ first_name: e.target.value })}
                  input={<Input id="education_level" />}
                >
                  <MenuItem value="elementary">Elementary School</MenuItem>
                  <MenuItem value="highschool">High School</MenuItem>
                  <MenuItem value="cegep">Cegep</MenuItem>
                  <MenuItem value="university">University</MenuItem>
                  <MenuItem value="adulteducation">Adult Education</MenuItem>
                </Select>
                {hasError && <FormHelperText>This is required!</FormHelperText>}
              </FormControl>
            </form>
            </Grid>

            <Grid item xs={12}>  
            <form autoComplete="off">
              <FormControl >
                <InputLabel htmlFor="tutored_classes">Classes Tutored</InputLabel>
                <Select
                  name="tutored_classes"
                  value={classes_tutored}
                  onChange={event => this.setState({classes_tutored:event.target.value})}
                // onChange={(e) => this.setState({ first_name: e.target.value })}
                  input={<Input id="tutored_classes" />}
                >
                  <MenuItem value="chem_204">Chem 204</MenuItem>
                  <MenuItem value="chem_205">Chem 205</MenuItem>
                  <MenuItem value="math_204">Math 204</MenuItem>
                  <MenuItem value="math_205">Math 205</MenuItem>
                </Select>
                {hasError && <FormHelperText>This is required!</FormHelperText>}
              </FormControl>
            </form>
            </Grid>

            <Grid item xs={12}>  
            <form autoComplete="off">
              <FormControl >
                <InputLabel htmlFor="type_of_tutoring">Type of Tutoring</InputLabel>
                <Select
                  name="type_of_tutoring"
                  value={type_tutoring}
                  onChange={event => this.setState({type_tutoring:event.target.value})}
                // onChange={(e) => this.setState({ first_name: e.target.value })}
                  input={<Input id="type_of_tutoring" />}
                >
                  <MenuItem value="crashcourse">Crash Course</MenuItem>
                  <MenuItem value="weeklytutoring">Weekly Tutoring</MenuItem>
                  <MenuItem value="oneonone">One on One Tutoring</MenuItem>
                  <MenuItem value="grouptutoring">Group Tutoring</MenuItem>
                </Select>
                {hasError && <FormHelperText>This is required!</FormHelperText>}
              </FormControl>
            </form>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I Agree that Tutify will keep all data provided private from third-parties and will only use the data provided to best match a student with a tutor."
              />
            </Grid>
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            onClick={() => this.putDataToDB(this.state.first_name,this.state.last_name,this.state.email,this.state.education_level,this.state.classes_tutored,this.state.type_tutoring)}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
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





export default Database2;




