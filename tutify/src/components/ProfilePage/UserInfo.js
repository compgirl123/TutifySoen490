import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import swal from 'sweetalert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      first_name: "",
      last_name: "",
      email: "",
      updatedFirstName: "",
      updatedLastName: "",
      updatedProgramOfStudy: "",
      updatedSchool: "",
      updatedEducationLevel: "",
      education_level: "",
      subjects: [],
      students: "",
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
  };

  handleChangeValue = e => this.setState({ value: e.target.value });

  checkSession = () => {
    fetch('http://localhost:3001/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then((res) => {
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

  update = async (value) => {
    await this.setState({
      courses: value
    });
  }

  updateDB = () => {
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
      .then((res) => {
        this.setState({
          subjects: res.data.newSubjects
        });
        swal("Information successfully updated!", "", "success")
      }, (error) => {
        console.log(error);
      });
  };

  updateTutorOptions = () => {
    var updatedProfileValues = [
      this.state.updatedProgramOfStudy,
      this.state.updatedSchool,
      this.state.updatedFirstName,
      this.state.updatedLastName
    ];

    for (var y = 0; y < updatedProfileValues.length; y++) {
      if (updatedProfileValues[y] === "") {
        if (y === 0) {
          updatedProfileValues[y] = this.state.program_of_study;
        }
        else if (y === 1) {
          updatedProfileValues[y] = this.state.school;
        }
        else if (y === 2) {
          updatedProfileValues[y] = this.state.first_name;
        }
        else if (y === 3) {
          updatedProfileValues[y] = this.state.last_name;
        }
      }
    }
    axios.post('http://localhost:3001/api/updateTutorInfo', {
      _id: this.state._id,
      program_of_study: updatedProfileValues[0],
      school: updatedProfileValues[1],
      first_name: updatedProfileValues[2],
      last_name: updatedProfileValues[3]
    })
      .then((res) => {
        this.setState({
          first_name: res.data.userInfo.first_name, last_name: res.data.userInfo.last_name,
          school: res.data.userInfo.school, program_of_study: res.data.userInfo.program_of_study,
        });
        swal("Information successfully updated!", "", "success")
      }, (error) => {
        console.log(error);
      });
  };

  updateStudentOptions = () => {
    var updatedProfileValues = [
      this.state.updatedProgramOfStudy,
      this.state.updatedSchool,
      this.state.updatedEducationLevel,
      this.state.updatedFirstName,
      this.state.updatedLastName
    ];

    for (var y = 0; y < updatedProfileValues.length; y++) {
      if (updatedProfileValues[y] === "") {
        if (y === 0) {
          updatedProfileValues[y] = this.state.program_of_study;
        }
        else if (y === 1) {
          updatedProfileValues[y] = this.state.school;
        }
        else if (y === 2) {
          updatedProfileValues[y] = this.state.education_level;
        }
        else if (y === 3) {
          updatedProfileValues[y] = this.state.first_name;
        }
        else if (y === 4) {
          updatedProfileValues[y] = this.state.last_name;
        }
      }
      else {
      }
    }
    axios.post('http://localhost:3001/api/updateUserInfo', {
      _id: this.state._id,
      program_of_study: updatedProfileValues[0],
      school: updatedProfileValues[1],
      education_level: updatedProfileValues[2],
      first_name: updatedProfileValues[3],
      last_name: updatedProfileValues[4]
    })
      .then((res) => {
        this.setState({
          first_name: res.data.userInfo.first_name, last_name: res.data.userInfo.last_name,
          education_level: res.data.userInfo.education_level, school: res.data.userInfo.school,
          program_of_study: res.data.userInfo.program_of_study,
        });
        swal("Information successfully updated!", "", "success")
      }, (error) => {
        console.log(error);
      });
  };

  updateInfo = () => {
    if (this.state.__t === "tutor") {
      this.updateTutorOptions();
    }
    else if (this.state.__t === "student") {
      this.updateStudentOptions();
    }
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <Card className={classes.card}>
        <React.Fragment>
          <CardContent>
            <img src={"https://i.imgur.com/L6lDhbz.jpg"} alt="Profile" width="100%" height="40%"></img>
          </CardContent>
          <CardContent>
            <Typography component="p" variant="h5" >
              <Box fontWeight="fontWeightBold">
                {this.state.first_name + " " + this.state.last_name}
              </Box>
            </Typography>

            <hr style={{
              color: '#FFFFFF',
              backgroundColor: '#FFFFFF',
              height: .5,
              borderColor: '#FFFFFF'
            }} />

            <Typography className={classes.InfoContext}>

              Status: Student
            </Typography>

            <Typography className={classes.InfoContext}>
              <br />
              Email : {this.state.email}
            </Typography>

            <Typography className={classes.InfoContext}>
              <br />
              Program of Study: {this.state.program_of_study}
            </Typography>

            <Typography className={classes.InfoContext}>
              <br />
              School: {this.state.school}
            </Typography>

            <Typography className={classes.InfoContext}>
              <br />
              Education Level: {this.state.education_level}
            </Typography>

            <br />
            <Fab variant="extended" aria-label="edit"
              justify="center"
              onClick={() => { this.handleClickOpen(); }}
              className={classes.editButton}>
              <EditIcon />
              Edit Info
            </Fab>
          </CardContent>
          <div>

            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
              <DialogTitle id="simple-dialog-title">Edit Information</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To edit your information, please change the desired value fields and click save.
                </DialogContentText>

                <TextField
                  margin="dense"
                  id="firstName"
                  name="firstName"
                  onChange={e => this.setState({ updatedFirstName: e.target.value })}
                  autoComplete="firstName"
                  label="First Name"
                  type="firstName"
                  fullWidth
                />

                <TextField
                  margin="dense"
                  id="lastName"
                  name="lastName"
                  onChange={e => this.setState({ updatedLastName: e.target.value })}
                  autoComplete="lastName"
                  label="Last Name"
                  type="lastName"
                  fullWidth
                />

                <TextField
                  margin="dense"
                  id="programOfStudy"
                  name="programOfStudy"
                  onChange={e => this.setState({ updatedProgramOfStudy: e.target.value })}
                  autoComplete="programOfStudy"
                  label="New Program of Study"
                  type="programOfStudy"
                  fullWidth
                />

                <TextField
                  margin="dense"
                  id="school"
                  name="school"
                  onChange={e => this.setState({ updatedSchool: e.target.value })}
                  label="School"
                  type="school"
                  fullWidth
                />

                {this.state.__t === "student"
                  ? <TextField
                    margin="dense"
                    id="educationlevel"
                    name="education_level"
                    onChange={e => this.setState({ updatedEducationLevel: e.target.value })}
                    label="Education Level"
                    type="education_level"
                    fullWidth
                  />
                  :
                  <br />
                }

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
                    <Button onClick={this.updateInfo}>Update Values</Button>
                  </DialogActions>
                </Grid>
              </Grid>

            </Dialog>
          </div>

        </React.Fragment>
      </Card>
    );
  }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(UserInfo);