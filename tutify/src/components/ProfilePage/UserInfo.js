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
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import PublishIcon from '@material-ui/icons/Publish';

export class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      first_name: "",
      last_name: "",
      email: "",
      school: "",
      program_of_study: "",
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
      scroll: 'paper',
      tutorPicture: "",
      description: "",
      updatedDescription: "",
      profilePicture: "",
      isPictureChanged: false,
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.imageFileChanged = this.imageFileChanged.bind(this);
    this.handleUploadImg = this.handleUploadImg.bind(this);
    this.getImg = this.getImg.bind(this);
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
  };

  handleChangeValue = e => this.setState({ value: e.target.value });

  //retrieves the session
  checkSession = () => {
    console.info("Fetching session...");
    fetch('/api/checkSession', {
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
            program_of_study: res.userInfo.program_of_study, students: res.userInfo.students, subjects: res.userInfo.subjects,
            tutorPicture: res.userInfo.picture, profilePictureID: res.userInfo.uploadedPicture,
            description: res.userInfo.description
          });
          this.getImg();
        }
        else {
          this.setState({ Toggle: false });
        }
      })
      .catch(err => console.error("Session could not be checked: " + err));
  };

  update = async (value) => {
    await this.setState({
      courses: value
    });
  };

  updateTutorOptions = () => {
    var updatedProfileValues = [
      this.state.updatedProgramOfStudy,
      this.state.updatedSchool,
      this.state.updatedFirstName,
      this.state.updatedLastName,
      this.state.updatedDescription
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
        else if (y === 4) {
          updatedProfileValues[y] = this.state.description;
        }
      }
    }

    //this method updates tutor information
    console.info("Fetching tutor information from db...");
    axios.post('/api/updateTutorInfo', {
      _id: this.state._id,
      program_of_study: updatedProfileValues[0],
      school: updatedProfileValues[1],
      first_name: updatedProfileValues[2],
      last_name: updatedProfileValues[3],
      description: updatedProfileValues[4],
    })
      .then((res) => {
        this.setState({
          first_name: res.data.userInfo.first_name, last_name: res.data.userInfo.last_name,
          school: res.data.userInfo.school, program_of_study: res.data.userInfo.program_of_study,
          description: res.data.userInfo.description,
        });
        swal("Information successfully updated!", "", "success")
      }, (error) => {
        console.error("Could not get updated tutor info from database (API call error) " + error);
      });
  };

  //this method updates student information
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
    console.info("Fetching student info from db...");
    axios.post('/api/updateUserInfo', {
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
        console.error("Could not get updated student info from database (API call error) " + error);
      });
  };

  // Determines whether tutor or student info needs to be updated
  updateInfo = () => {
    if (this.state.__t === "tutor") {
      this.updateTutorOptions();
    }
    else if (this.state.__t === "student") {
      this.updateStudentOptions();
    }
  }

  // Displaying the current image file being uploaded.
  imageFileChanged = async (event) => {
    const f = event.target.files[0];
    if(f) {
      this.setState({
        newPicture: event.target.files[0],
        profilePicture: URL.createObjectURL(f),
        isPictureChanged: true,
      });
    }
  }

  // Handling the submit of a new profile image and uploading it into the database as a multer file
  handleUploadImg = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    if(this.state.isPictureChanged) {
      formData.append('file', this.state.newPicture);
      formData.append('_id', this.state._id);
      formData.append('name', this.state.newPicture.name);
      formData.append('prevImg', this.state.profilePictureID.imgData);
    }

    else {
      swal("No picture selected. Could not update profile image.", "", "error")
    }

    axios.post('/uploadTutorImg', formData)
      .then((res) => {
        this.setState({
          profilePictureID: res.data.userInfo.uploadedPicture,
        });
        swal("Profile image successfully updated!", "", "success")
        this.getImg();
      }, (error) => {
        console.error("Could not update the tutor image in the database (API call error) " + error);
      });
  }

  // Fetches the profile image file from our database
  getImg() {
    axios.get('/api/getPicture/' + this.state.profilePictureID.imgData)
      .then((res) => {
        this.setState({
          profilePicture: res.data.data
        });
      }, (error) => {
        console.error("Could not get uploaded profile image from database (API call error) " + error);
      });
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;



    return (
      <Card className={classes.card}>
        <React.Fragment>
          {this.state.__t === "tutor" ?

            <CardContent>
              <img src={this.state.profilePicture} width="100%" height="40%" alt="Profile">
              </img>
              <form onSubmit={this.handleUploadImg}>
                <input
                  type="file"
                  id="fileUpload"
                  onChange={this.imageFileChanged}
                  className={classes.inputUpload}
                  accept=".png,.jpg"
                ></input>
                <Button type="submit" size="small" className={classes.submit}>
                  <PublishIcon />
                </Button>
              </form>
            </CardContent>
            :
            <CardContent>
              <img src={"https://i.imgur.com/L6lDhbz.jpg"} alt="Profile" width="100%" height="40%"></img>
            </CardContent>
          }
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

            {this.state.__t === "student" ?
              <Typography className={classes.InfoContext}>
                Status: Student
              </Typography>
              :
              <Typography className={classes.InfoContext}>
                Status: Tutor
              </Typography>
            }

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

            {this.state.__t === "student" ?
              <Typography className={classes.InfoContext}>
                <br />
                Education Level: {this.state.education_level}
              </Typography>
              :
              <div>
                <Typography className={classes.InfoContext}>
                  <br />
                  Description:<br />
                </Typography>
                <div style={{ maxHeight: 120, overflow: 'auto' }}>
                  <Typography className={classes.InfoContext}>
                    {this.state.description}
                  </Typography>
                </div>
                <br />
              </div>
            }
            <br />

            <Button variant="outlined" aria-label="edit"
              justify="center"
              onClick={() => { this.handleClickOpen(); }}
              className={classes.editButton}>
              <EditIcon /> &nbsp;
              Edit Info
            </Button>

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
                  <TextField
                    id="description"
                    name="description"
                    label="Description"
                    onChange={e => this.setState({ updatedDescription: e.target.value })}
                    multiline
                    rows="4"
                    defaultValue={this.state.description}
                    variant="outlined"
                    style={{ width: '100%', marginTop: "35px" }}
                  />

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
      </Card >
    );
  }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(UserInfo);