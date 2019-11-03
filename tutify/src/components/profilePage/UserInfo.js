import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import CourseSelection from '../profilePage/CourseSelection';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      first_name: "",
      last_name: "",
      email: "",
      updatedEmail : "",
      updatedProgramOfStudy : "",
      updatedSchool : "",
      education_level: "",
      subjects: [],
      students: "",
      data: [],
      courses: [],
      open: false,
      scroll: 'paper'
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  toggleDrawer = booleanValue => () => {
    this.setState({
      drawerOpened: booleanValue
    });
  };

  handleFeedback = () => {
    this.setState({ open: true })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.checkSession();
  }
  checkSession = () => {
    fetch('http://localhost:3001/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          this.setState({
            Toggle: true, first_name: res.userInfo.first_name, last_name: res.userInfo.last_name,
            email: res.email, education_level: res.userInfo.education_level, school: res.userInfo.school,
            program_of_study: res.userInfo.program_of_study, subject: res.tutor.subjects
          });
        }
        else {
          this.setState({ Toggle: false });
        }
      })
      .catch(err => console.log(err));
  };
  handleChange(event) {
    fetch('http://localhost:3001/api/logout', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ Toggle: false });
      })
      .catch(err => console.log(err));
    //this.setState({Toggle: false});

  };


  handleChangeValue = e => this.setState({ value: e.target.value });
  checkSession = () => {
    fetch('http://localhost:3001/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          this.setState({
            Toggle: true, _id: res.userInfo._id, __t: res.userInfo.__t,
            first_name: res.userInfo.first_name, last_name: res.userInfo.last_name,
            email: res.email, education_level: res.userInfo.education_level, school: res.userInfo.school,
            program_of_study: res.userInfo.program_of_study, students: res.userInfo.students, subjects: res.userInfo.subjects
          });
        }
        else {
          this.setState({ Toggle: false });
        }
      })
      .catch(err => console.log(err));
  };


  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getUser')
      // get tutor
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  update = async (value) => {
    await this.setState({
      courses: value
    });
  }

  updateDB = () => {
    console.log("HEY LISTEN: " + this.state.courses);
    var coursesToAdd = [];
    var test = this.state.subjects;

    for (var z = 0; z < this.state.courses.length; z++) {
      var course_found = test.includes(this.state.courses[z]);
      if (course_found === false) {
        coursesToAdd.push(this.state.courses[z])
      }
    }

    axios.post('http://localhost:3001/api/updateTutor', {
      _id: this.state._id,
      subjects: coursesToAdd
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  updateOptions = () => {
    console.log("HEY LISTEN: " + this.state.courses);
    var updatedProfileValues = [this.state.updatedEmail,this.state.updatedProgramOfStudy,
                                this.state.updatedSchool];

    for (var y = 0; y < updatedProfileValues.length; y++) {
      if (updatedProfileValues[y] === "") {
        console.log("hi");
        if(y === 0){
          updatedProfileValues[y] = this.state.email;
          console.log(updatedProfileValues[y]);
        }
        else if(y === 1){
          updatedProfileValues[y] = this.state.program_of_study;
          console.log(updatedProfileValues[y]);
        }
        else if(y === 2){
          updatedProfileValues[y] = this.state.school;
          console.log(updatedProfileValues[y]);
        }
        
      }
      else{
        console.log("ho");
        console.log(updatedProfileValues[y]);
      }
    }                            
       
    axios.post('http://localhost:3001/api/updateTutorInfo', {
      _id: this.state._id,
      //email: this.state.email,
      program_of_study : updatedProfileValues[1],
      school: updatedProfileValues[2]
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <Paper className={classes.paper}>
        <React.Fragment>
          <Title> {this.state.__t} info</Title>
          <Typography component="p" variant="h6">
            {this.state.first_name} {this.state.last_name}
          </Typography>
          <Typography component="p" variant="h7">
            Email : {this.state.email}
          </Typography>
          <Typography color="textSecondary" className={classes.InfoContext}>
            Program of Study: {this.state.program_of_study}
          </Typography>
          <Typography color="textSecondary" className={classes.InfoContext}>
            Education Level: {this.state.education_level}
          </Typography>
          <Typography color="textSecondary" className={classes.InfoContext}>
            School: {this.state.school}
          </Typography>
          <Typography color="textSecondary" className={classes.InfoContext}>
            Status: {this.state.__t}
          </Typography>

          <div>
            <Grid item xs={6}>
              {this.state.__t === "tutor"
                ? <CourseSelection
                  updateCourses={this.update}
                />
                :
                <br />
              }

            </Grid>

            {this.state.__t === "tutor"
              ? <Button
              type="button"
              fullWidth
              variant="contained"
              className="submit"
              onClick={() => { this.updateDB(); }}
            >
              Save Course Options
            </Button>
              : this.state.__t === "student"
              ? <Button
              type="button"
              fullWidth
              variant="contained"
              className="submit"
              onClick={() => { this.updateDB(); }}
            >
              Save Course Options
            </Button>
              :
              <p></p>
            }

            <br />
            <br />
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
              <DialogTitle id="simple-dialog-title">Edit Information</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To edit your information, please change each of the value fields listed in the pop-up and click save.
            </DialogContentText>
                <TextField
                  margin="dense"
                  id="programOfStudy"
                  name="programOfStudy"
                  onChange={e => this.setState({updatedProgramOfStudy: e.target.value })}
                  autoComplete="programOfStudy"
                  label="New Program of Study"
                  type="programOfStudy"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="school"
                  name="school"
                  onChange={e => this.setState({updatedSchool: e.target.value })}
                  label="School"
                  type="school"
                  fullWidth
                />

              </DialogContent>
              <Grid
                container
                direction="row-reverse"
                justify="space-between"
                alignItems="baseline"
              >
                <Grid item>
                  <DialogActions>
                    <Button onClick={this.handleClose}>Close</Button>
                  </DialogActions>
                </Grid>
                <Grid item>
                  <DialogActions>
                    <Button onClick={this.updateOptions}>Update Values</Button>
                  </DialogActions>
                </Grid>
              </Grid>

            </Dialog>
            {this.state.__t === "tutor"
              ? <Button
                type="button"
                fullWidth
                variant="contained"
                className="submit"
                onClick={() => { this.handleClickOpen(); }}
              >
                Edit Info
             </Button>
              : this.state.__t === "student"
                ? <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  className="submit"
                  onClick={() => { this.handleClickOpen(); }}
                >
                  Edit Info
            </Button>
                :
                <p></p>
            }

          </div>


        </React.Fragment>
      </Paper>);
  }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(UserInfo);
