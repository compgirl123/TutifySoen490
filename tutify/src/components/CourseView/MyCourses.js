import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import DashBoardNavBar from '../DashBoardNavBar';
import Paper from '@material-ui/core/Paper';
import Footer from '../Footer';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import swal from '@sweetalert/with-react';
import axios from "axios";
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import { sendNotification } from '../../helper/notificationsHelper';


// View the General Course Page with all of the Courses the Tutor Teaches or Student is enrolled in.
export class MyCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      open: false,
      educationLevel2: "",
      courseName2: "",
      educationLevel1: "",
      courseName1: "",
      description: "",
      filteredListCourses: [],
      discriminator: "",
      id: "",
      students: []
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addCourseToDb = this.addCourseToDb.bind(this);
    this.addTutorToCourse = this.addTutorToCourse.bind(this);
  }

  componentDidMount() {
    this.checkSession();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, filteredListCourses: [], courseName2: "", description: "", educationLevel2: "", courseName1: "" });
  };

  // this method is invoked when a student chooses the education level from the dropdownmenu
  handleChange = (e) => {
    var filteredListCourses = [];
    for (var i = 0; i < this.state.allCourses.length; i++) {
      if (this.state.allCourses[i].educationLevel === e) {
        filteredListCourses.push(this.state.allCourses[i]);
      }
    }
    this.setState({ filteredListCourses: filteredListCourses });
  }

  // Distinguishing the tutor login from student login.
  checkSession = () => {
    console.info("Fetching session from db...");
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          this.setState({ discriminator: res.userInfo.__t, id: res.userInfo._id });
          if (res.userInfo.__t === "student") {
            this.getUserDataFromDb();
          }
          else if (res.userInfo.__t === "tutor") {
            this.getTutorDataFromDb();
            this.getAllCoursesFromDB();
            this.setState({ 
              students: res.userInfo.students,
              tutorName: res.userInfo.first_name + " " + res.userInfo.last_name,
              tutorImg: res.userInfo.picture,
            });
          }
        }
      })
      .catch(err => console.error("Session could not be checked: " + err));
  };

  // this method adds a course to the database
  addCourseToDb = () => {
    var tutor = [];
    tutor.push(this.state.id);
    swal({
      title: "Would you like to add the following course?",
      buttons: {
        confirm: "Yes",
        cancel: "Cancel",
      },
      content: (
        <div>
          <p><b>
            Name: {this.state.courseName2}</b>
          </p>
          <p>
            Description: {this.state.description}
          </p>
          <p>
            Education Level: {this.state.educationLevel2}
          </p>
        </div>
      )
    })
      .then((value) => {
        if (value) {
          console.info("Adding course to db...");
          axios.post('/api/addCourseToDb', {
            name: this.state.courseName2,
            description: this.state.description,
            educationLevel: this.state.educationLevel2,
            tutor: tutor
          })
            .then((res) => {
              this.getTutorDataFromDb();
              swal("Course successfully added!", "", "success");
              this.handleClose();
            }, (error) => {
              console.error("Could not add course to database (API call error) " + error);
            });
        }
      });
  }

  // this method deletes a course from the database 
  deleteCourse = (course_id) => {

    swal({
      title: "Are you sure you want delete this course?",
      icon: "warning",
      buttons: [true, "Yes"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.post('/api/deleteCourse', {
            students: this.state.students,
            course_id: course_id,
            tutor_id: this.state.id
          })
            .then((res) => {
              this.getTutorDataFromDb();
              swal("Course successfully deleted!", "", "success");
            }, (error) => {
              console.error("Could not delete course to database (API call error) " + error);
            });
        }
      });
  }

  // this method assigns a tutor to an existing course
  addTutorToCourse = () => {
    swal({
      title: "Would you like to add the following course?",
      buttons: {
        confirm: "Yes",
        cancel: "Cancel",
      },
      content: (
        <div>
          <p><b>
            Name: {this.state.courseName1.name}</b>
          </p>
          <p>
            Description: {this.state.courseName1.description}
          </p>
          <p>
            Education Level: {this.state.courseName1.educationLevel}
          </p>
        </div>
      )
    })
      .then((value) => {
        if (value) {
          console.info("Assigning tutor to course...");
          axios.post('/api/addTutorToCourse', {
            course_id: this.state.courseName1._id,
            tutor: this.state.id
          })
            .then((res) => {
              this.getTutorDataFromDb();
              swal("Course successfully added!", "", "success");
              this.handleClose();
            }, (error) => {
              console.error("Could not assign tutor to existing course (API call error) " + error);
            });
        }
      });
  }

  // this method gets all the courses from the database
  getAllCoursesFromDB = () => {
    console.info("Fetching all courses from db...");
    fetch('/api/getCourses', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ allCourses: res.data });
      })
      .catch(err =>
        console.error("Could not get courses from database (API call error) " + err));
  }


  // Uses our backend api to fetch student's courses from the database
  getUserDataFromDb = () => {
    console.info("Fetching student's courses from db...");
    fetch('/api/getUserCourses', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ courses: res.data });
      })
      .catch(err =>
        console.error("Could not get courses from database (API call error) " + err));
  }

  // Uses our backend api to fetch tutor's courses from the database
  getTutorDataFromDb = () => {
    console.info("Fetching tutor's courses from db...");
    fetch('/api/getTutorCourses', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ courses: res.data });
      })
      .catch(err =>
        console.error("Could not get courses from database (API call error) " + err));
  }

  // Allowing for tutors to share their uploaded documents to specific courses.
  sharedDocument = (e, course, students) => {
    console.info("Uploading document for course to db...");
    axios.post('/api/tutorCourses/:file', {
      course_id: course.name,
      file_name: this.props.match.params.file
    })
    // Send announcement for new document
    sendNotification(students,
      { tutorImg: this.state.tutorImg, tutorName: this.state.tutorName, tutorid: this.state._id },
      { title: "New document shared for " + course.name, text: "A new document was shared for one of your courses." });

    swal("Succesfully uploaded document to Course(s)!", "", "success");

  }

  // Handling the checkbox management in order to select one or many options.
  handleCheckbox = async (event) => {
    if (event.target.checked) {
      let list = this.state.shareTo;
      list.push(event.target.name);
      await this.setState({ shareTo: list });
    } else {
      let filteredArray = this.state.shareTo.filter(item => item !== event.target.name);
      await this.setState({ shareTo: filteredArray });
    }
  }


  render() {
    const { classes } = this.props;
    const { courses, open } = this.state;

    return (
      <Paper className={classes.paper}>
        <React.Fragment>
          <main>
            <DashBoardNavBar />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                {this.state.discriminator === "tutor" ?
                  <Button variant="contained" size="lg" active onClick={() => { this.handleClickOpen(); }} className={classes.addCourseButton} >
                    Add Course
               </Button>
                  :
                  <></>
                }

                <Grid container spacing={5}>
                  {courses.map((c, i) => (
                    <Grid item xs={4} md={4} lg={4}>
                      <Card className={classes.card}>
                        <CardActionArea>
                          <CardMedia
                            className={classes.media}
                            title="French"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                              {c.course.name}
                              {this.state.discriminator === "tutor" ?
                                <IconButton variant="contained" size="lg" active onClick={event => this.deleteCourse(c.course._id)} className={classes.deleteCourseButton} >

                                  < DeleteForeverIcon className={classes.deleteIconButton} />
                                </IconButton>
                                :
                                <></>
                              }
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              {c.course.description ? c.course.description : ""}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          {this.props.match.params.file !== undefined
                            ? <Button type="button" onClick={event => this.sharedDocument(event, c.course, c.students)} size="small" fullWidth className="submit">
                              Share Document
                          </Button>
                            :
                            <Button type="button" onClick={() => window.location.replace("/viewCourse/" + (c.course._id).replace(/ /g, ""))} size="small" href="" fullWidth className="submit">
                              View Documents
                          </Button>
                          }
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>


              <div>

                <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
                  <DialogTitle id="simple-dialog-title">Add a course</DialogTitle>
                  <DialogContent>
                    <div>
                      <DialogContentText>
                        Choose from an existing course:
                        </DialogContentText>
                    </div>
                    <FormControl className={classes.formControl}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Education Level
                        </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={e => this.handleChange(e.target.value)}

                      >
                        <MenuItem value='Elementary School'>Elementary School</MenuItem>
                        <MenuItem value='High School'>High School</MenuItem>
                        <MenuItem value='University'>University</MenuItem>
                      </Select>
                    </FormControl>

                    {this.state.filteredListCourses.length === 0 ? <></> :
                      <FormControl className={classes.formControl}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Course Name
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={e => this.setState({ courseName1: e.target.value })}
                        >
                          {this.state.filteredListCourses.map(course => {
                            return <MenuItem value={course} key={course}>{course.name}</MenuItem>
                          })}
                        </Select>
                      </FormControl>
                    }
                    <div>

                      {this.state.courseName1 === "" ?
                        <Button variant="contained" size="lg" active className={classes.saveCourseButton} disabled>
                          Save Course
                    </Button>
                        :
                        <Button variant="contained" size="lg" active onClick={() => { this.addTutorToCourse(); }} className={classes.saveCourseButton}>
                          Save Course
                    </Button>
                      }
                    </div>


                    <div>
                      <DialogContentText >
                        Create a new course:
                        </DialogContentText>
                    </div>

                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="dense"
                      id="courseName2"
                      name="courseName2"
                      onChange={e => this.setState({ courseName2: e.target.value })}
                      autoComplete="courseName"
                      label="Course Name"
                      fullWidth
                    />

                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="dense"
                      id="description"
                      name="description"
                      onChange={e => this.setState({ description: e.target.value })}
                      autoComplete="description"
                      label="Description"
                      type="description"
                      fullWidth
                    />
                    <div>

                      <FormControl className={classes.formControl}
                      >
                        <InputLabel>
                          Education Level
                        </InputLabel>
                        <Select
                          onChange={e => this.setState({ educationLevel2: e.target.value })}
                        >
                          <MenuItem value='Elementary School'>Elementary School</MenuItem>
                          <MenuItem value='High School'>High School</MenuItem>
                          <MenuItem value='University'>University</MenuItem>
                        </Select>
                      </FormControl>

                    </div>
                    {this.state.educationLevel2 === "" || this.state.description === "" || this.state.courseName2 === "" ?
                      <Button variant="contained" size="lg" className={classes.formControl} disabled>
                        Save Course
                      </Button>
                      :
                      <Button variant="contained" size="lg" active onClick={() => { this.addCourseToDb(); }} className={classes.formControl}>
                        Save Course
                      </Button>
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

                  </Grid>

                </Dialog>
              </div>

              <main>
                {/* Hero unit */}
              </main>
              {/* Footer */}
              <Footer />
            </main>
          </main>
        </React.Fragment>
      </Paper>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(MyCourses);
