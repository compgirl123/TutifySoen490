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
import validator from 'validator';

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
      first_name: "█",
      last_name : "█",
      program_of_study: "█",
      email : "█",
      password:"█",
      cPassword:"█",
      intervalIsSet: false,
      idToDelete: "█",
      idToUpdate: "█",
      objectToUpdate: "█",
      education_level: "█",
      school : "█",
      school_name_other : "█",
      make_other_school_visible : "none",
      FormValid : {fname: false,lname: false,PoS: false,email: false,password: false,cPassword: false,educationLevel: false,school:false,dataKeep: false}
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

    // This is where all validation takes place
    validateForm() {
      for (var indicator in this.state.FormValid){
        if(!indicator){
          return false
        }
      }
      return true;
    }
    
    vfName(name) {
      if(name==="█"){
        this.state.FormValid["fname"]=false;
        return true;
      }
      else if(validator.isAlpha(name)){
        this.state.FormValid["fname"]=true;
        return true;
      }
      else{
        this.state.FormValid["fname"]=false;
        return false;
      }

    }

    vlName(name) {
      if(name==="█"){
        this.state.FormValid["lname"]=false;
        return true;
      }
      else if(validator.isAlpha(name)){
        this.state.FormValid["lname"]=true;
        return true;
      }
      else{
        this.state.FormValid["lname"]=false;
        return false;
      }

    }

    vPOS(POS) {
      if(POS==="█"){
        this.state.FormValid["PoS"]=false;
        return true;
      }
      else if(!validator.isEmpty(POS)){
        this.state.FormValid["PoS"]=false;
        return true;
      }
      else{
        this.state.FormValid["PoS"]=false;
        return false;
      }
    }

    vEmail(email){
      if(email===""){
        this.state.FormValid["email"]=false;
        return false;
      }
      else if(validator.isEmail(email)){
        this.state.FormValid["email"]=true;
        return true;
      }
      else if(email==="█"){
        this.state.FormValid["email"]=false;
        return true;
      }
      else{
        this.state.FormValid["email"]=false;
        return false;
      }
    }

    

    vPassword(password){
      if(password==="█"){
        this.state.FormValid["password"]=false;
        return true;
      }
      else if(!validator.isAlpha(password) && !validator.isNumeric(password)){
        this.state.FormValid["password"]=true;
        return true;
      }
      else{
        this.state.FormValid["password"]=false;
        return false;
      }
    }

    vConfirmPassword(cPassword){
      if(cPassword==="█"){
        this.state.FormValid["cPassword"]=false;
        return true;
      }
      else if(cPassword===this.state.password){
        this.state.FormValid["cPassword"]=true;
        return true;
      }
      else{
        this.state.FormValid["cPassword"]=false;
        return false;
      }
    }
    
    vOtherSchool(school){
      if(school===""){
        this.state.FormValid["school"]=false;
        return false;
      }
      this.state.FormValid["school"]=true;
      return true;
    }

    setSchool(value){
      if(value === "other"){
        this.state.make_other_school_visible="inline";
        this.state.FormValid["school"]=false;
      }
      else{
        this.state.make_other_school_visible="none";
        this.state.FormValid["school"]=true;
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

  submitForm(){
    this.putDataToDB(this.state.first_name,this.state.last_name,this.state.email,this.state.program_of_study,this.state.password,this.state.education_level,this.state.school);
    this.props.history.push("/");
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
      <form className="form" name="form" noValidate>
      <Grid container spacing={2} justify="space-between">
            <Grid item xs={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                error={!this.vfName(this.state.first_name)}
                helperText = {this.state.first_name === true ? "" : "Please Enter First Name"}
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
                error={!this.vlName(this.state.last_name)}
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
                error={!this.vPOS(this.state.program_of_study)}
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
                error={!this.vEmail(this.state.email)}
                helperText = {this.state.email === true ? "" : "Please Enter Email"}
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
                id="password"
                helperText = {this.state.password === true ? "" : "Please Enter Password"}
                error={!this.vPassword(this.state.password)}
                autoComplete="current-password"
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
                name="confirm-password"
                onChange={(e) => this.setState({ cPassword: e.target.value })}
                label="Confirm Password"
                type="password"
                id="confirm-password"
                error={!this.vConfirmPassword(this.state.cPassword)}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
            </Grid>
            
            

            <Grid item xs={6}>  
            
              <FormControl >
                <InputLabel htmlFor="education_level">Education Level</InputLabel>
                <Select
                  name="education_level"
                  value={education_level}
                  onChange={event => {this.setState({education_level:event.target.value}); this.state.FormValid[5]=true;}}
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
            </Grid>         
            <Grid item xs={6}>  
            <form autoComplete="off">
              <FormControl >
                <InputLabel htmlFor="school" fullWidth>School Name</InputLabel>
                <Select
                  name="school"
                  value={school}
                  onChange={event => {
                    this.setState({school:event.target.value});
                    this.setSchool(event.target.value);
                  }}
                  input={<Input id="school" />}
                >
                  <MenuItem value="mcgill">McGill</MenuItem>
                  <MenuItem value="concordia">Concordia</MenuItem>
                  <MenuItem value="udm">Universite de Montreal</MenuItem>
                  <MenuItem value="uqam">UQAM</MenuItem>
                  <MenuItem value="cegep">CEGEP</MenuItem>
                  <MenuItem value="highschool">High School</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                {hasError && <FormHelperText>This is required!</FormHelperText>}
              </FormControl>
                  </form>
            </Grid> 
            <Grid item xs={6}>
              </Grid>
            <Grid item xs={6}>
              <Box component="div" display={this.state.make_other_school_visible}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="schoolname"
                  onChange={(e) => {
                    this.setState({school:e.target.value});
                  }}
                  label="If School Name is not present in List, Enter it here"
                  type="schoolname"
                  id="schoolname"
                  autoComplete="current-schoolName"
                  error={!this.vOtherSchool(this.state.school)}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" onChange={(e)=>{this.state.FormValid["dataKeep"]=e.target.checked;}}/>}
                label="I Agree that Tutify will keep all data provided private from third-parties and will only use the data provided to best match a student with a tutor."
              />
            </Grid>
        </Grid>
        
        <Button
            style={{marginBottom: '10px'}}
            type="submit"
            fullWidth
            variant="contained"
            className="submit"
            onClick={() => {if(this.validateForm()){this.submitForm()}}}
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