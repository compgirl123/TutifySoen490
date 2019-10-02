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
import * as tutifyStyle from './SignUp-styles';
import { withStyles } from "@material-ui/core/styles";
import NavBar from './NavBar';

class PhoneField extends Component{

  /*constructor(props) {
    super(props)
    this.state = { errorText: 'EEERROR', value: props.value }
  }
  onChange(event) {
    //var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    //var phoneRegex = "/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/";
    if (event.target.value.substring(0,1) == "a") {
      console.log("DHHEHE");
      this.setState({ errorText: 'RPAdsf' })
    } else {
      console.log("BADDD");
      this.setState({ errorText: 'Invalid format: ###-###-####' })
    }
  }
  render() {
    return (
      <TextField hintText="Phone"
        floatingLabelText="Phone"
        name="phone"
        errorText= {this.state.errorText}
        onChange={this.onChange.bind(this)}
      />
    )
  }*/
}

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
      program_of_study: null,
      email : null,
      password:null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
      education_level: null,
      school : null,
      school_name_other : null
      //classes_tutored : null,
      //type_tutoring : null
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
    putDataToDB = (first_name,last_name,email,program_of_study,password,education_level,school,school_name_other) => {
      let currentIds = this.state.data.map((data) => data.id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
        ++idToBeAdded;
      }
  
      axios.post('http://localhost:3001/api/putUser', {
        id: idToBeAdded,
        first_name: first_name,
        last_name : last_name,
        program_of_study:program_of_study,
        email : email,
        password : password,
        school : school,
        school_name_other : school_name_other,
        education_level : education_level
        //classes_tutored : classes_tutored,
        //type_tutoring : type_tutoring
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
    const { education_level, school, hasError } = this.state;
    const { classes } = this.props;
    
    return (
    <div>
                  <NavBar />

    <Container component = "main">
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
                error={this.state.first_name === '' ? true : false}
                helperText = {this.state.first_name === false ? "" : "Please Enter First Name"}
                onChange={(e) => this.setState({ first_name: e.target.value })}
                onSubmit = {(e) => this.setState({ first_name: e.target.value })}
                autoFocus
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
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={(e) => this.setState({ last_name: e.target.value })}
                autoComplete="lname"
                error={this.state.last_name === '' ? true : false}
                helperText = {this.state.last_name === true ? "" : "Please Enter Last Name"}
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
                fullWidth
                id="ProgramOfStudy"
                label="Program Of Study"
                name="programOfStudy"
                onChange={(e) => this.setState({ program_of_study: e.target.value })}
                autoComplete="programOfStudy"
                error={this.state.program_of_study === '' ? true : false}
                helperText = {this.state.program_of_study === true ? "" : "Please Enter Field of Study"}
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
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={e => this.setState({ email: e.target.value})}
                autoComplete="email"
                error={this.state.email === '' ? true : false}
                helperText = {this.state.email === true ? "" : "Please Enter Email"}
                //helperText= {this.state.email}
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
                fullWidth
                name="password"
                onChange={(e) => this.setState({ password: e.target.value })}
                label="Password"
                type="password"
                id="password"error={this.state.password === '' ? true : false}
                helperText = {this.state.password === true ? "" : "Please Enter Password"}
                autoComplete="current-password"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
            </Grid>

            

            
          
            
            <Grid item xs={6}>  
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
            <Grid item xs={6}>  
            <form autoComplete="off">
              <FormControl >
                <InputLabel htmlFor="school">School Name</InputLabel>
                <Select
                  name="school"
                  value={school}
                  onChange={event => this.setState({school:event.target.value})}
                // onChange={(e) => this.setState({ first_name: e.target.value })}
                  input={<Input id="school" />}
                >
                  <MenuItem value="mcgill">McGill</MenuItem>
                  <MenuItem value="concordia">Concordia</MenuItem>
                  <MenuItem value="udm">Universite de Montreal</MenuItem>
                  <MenuItem value="uqam">UQAM</MenuItem>
                  <MenuItem value="cegep">CEGEP</MenuItem>
                  <MenuItem value="highschool">High School</MenuItem>
                </Select>
                {hasError && <FormHelperText>This is required!</FormHelperText>}
              </FormControl>
            </form>
            </Grid> 
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="schoolname"
                onChange={(e) => this.setState({ school_name_other: e.target.value })}
                label="If School Name is not present in List, Enter it here"
                type="schoolname"
                id="schoolname"
                autoComplete="current-schoolName"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
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
            className="submit"
            onClick={() => this.putDataToDB(this.state.first_name,this.state.last_name,(this.state.email=="")?this.state.email = '':this.state.email,this.state.program_of_study,this.state.password,this.state.education_level,this.state.school,(this.state.school_name_other==null)?" ":this.state.school_name_other)}
          >
            Sign Up
          </Button>
          <Grid className={classes.signUpButton} href = "/search_results" container justify="flex-end">
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
export default withStyles(tutifyStyle.styles, { withTheme: true })(Database2);