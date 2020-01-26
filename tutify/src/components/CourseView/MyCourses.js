import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import DashBoardNavBar from '../ProfilePage/DashBoardNavBar';
import Paper from '@material-ui/core/Paper';
import Footer from '../Footer';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import swal from '@sweetalert/with-react'
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


// View the General Course Page with all of the Courses the Tutor Teaches or Student is enrolled in.
export class TutorCourses extends React.Component {
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
      id: ""
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
    this.setState({ open: false, filteredListCourses: [], courseName2: "", description: "", educationLevel2: "", courseName1: ""});
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
              console.log(error);
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
          axios.post('/api/addTutorToCourse', {
            course_id: this.state.courseName1._id,
            tutor: this.state.id
          })
            .then((res) => {
              this.getTutorDataFromDb();
              swal("Course successfully added!", "", "success");
              this.handleClose();
            }, (error) => {
              console.log(error);
            });
        }
      });


  }


  // Distinguishing the tutor login from student login.
  checkSession = () => {
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
          }
        }

      })
      .catch(err => console.log(err));
  };

  // this method gets all the courses from the database
  getAllCoursesFromDB = () => {
    fetch('/api/getCourses', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ allCourses: res.data });
      })
      .catch(err => console.log(err));
  }


  // Uses our backend api to fetch the courses from our database
  getUserDataFromDb = () => {
    fetch('/api/getUserCourses', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ courses: res.data });
      })
      .catch(err => console.log(err));
  }

  // Uses our backend api to fetch the courses from our database
  getTutorDataFromDb = () => {
    fetch('/api/getTutorCourses', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ courses: res.data });
      })
      .catch(err => console.log(err));
  }

  // Allowing for tutors to share their uploaded documents to specific courses.
  uploadCourse = (e, courseName) => {
    axios.post('/api/tutorCourses/:file', {
      course_id: courseName,
      file_name: this.props.match.params.file
    })
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
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              {c.course.description ? c.course.description : ""}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          {this.props.match.params.file !== undefined
                            ? <Button type="button" onClick={event => this.uploadCourse(event, c.course.name)} size="small" fullWidth className="submit">
                              Upload Document
                          </Button>
                            :
                            <Button type="button" onClick={() => window.open("/viewCourse/" + (c.course._id).replace(/ /g, ""))} size="small" href="" fullWidth className="submit">
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
export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorCourses);
