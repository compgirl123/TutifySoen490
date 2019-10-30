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
            Toggle: true, _id: res.userInfo._id, first_name: res.userInfo.first_name, last_name: res.userInfo.last_name,
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
    console.log("POOTIS: " + this.state.courses);

  }

  updateDB = () => {
    // Will eventuallu implement it.
    console.log("HEY LISTEN: " + this.state.courses);
    for(var x=0;x<this.state.courses.length;x++){
      console.log(this.state.courses[x]);
    }

    axios.post('http://localhost:3001/api/updateTutor', {
      _id: "5dae5f8b1c9d44000071cbc2",
      subjects: this.state.courses                                                                                        //classes_tutored : classes_tutored,
      //type_tutoring : type_tutoring
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
          <Title> User Info</Title>
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

          <div>
            <Grid item xs={6}>
              <CourseSelection
                updateCourses={this.update}
              />
            </Grid>

            <Button
              type="button"
              fullWidth
              variant="contained"
              className="submit"
              onClick={() => { this.updateDB(); }}
            >
              Save Options
        </Button>
            <br />
            <br />
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
              <DialogTitle id="simple-dialog-title">Edit Information</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To edit your information, please change each of the value fields listed in the pop-up and click save.
            </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="New Email Address"
                  type="email"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="New Program of Study"
                  type="program_of_study"
                  fullWidth
                />

                <TextField
                  margin="dense"
                  id="name"
                  label="New Education Level"
                  type="education"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="name"
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
                    <Button onClick={this.handleClose}>Update Values</Button>
                  </DialogActions>
                </Grid>
              </Grid>

            </Dialog>
            <Button
              type="button"
              fullWidth
              variant="contained"
              className="submit"
              onClick={() => { this.handleClickOpen(); }}
            >
              Edit Info
        </Button>

          </div>


        </React.Fragment>
      </Paper>);
  }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(UserInfo);
