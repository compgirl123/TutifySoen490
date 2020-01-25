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
import swal from 'sweetalert';
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
      courseName: "",
      description: "",
      filteredListCourses: [],
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addCourseToDb = this.addCourseToDb.bind(this);
  }

  componentDidMount() {
    this.checkSession();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, filteredListCourses: [] });
  };

  handleChange = (e) => {
    var filteredListCourses = [];
    console.log(this.state.allCourses);
    for (var i = 0; i < this.state.allCourses.length; i++) {
      if (this.state.allCourses[i].educationLevel2 === e) {
        filteredListCourses.push(this.state.allCourses[i]);
      }
    }
    this.setState({ filteredListCourses: filteredListCourses });
  }

  addCourseToDb = () => {
    var tutor = [];
    tutor.push(this.state.id);
    axios.post('/api/addCourseToDb', {
      name: this.state.courseName,
      description: this.state.description,
      educationLevel: this.state.educationLevel2,
      tutor: tutor
    })
      .then((res) => {
        swal("Course successfully added!", "", "success");
        this.handleClose();

      }, (error) => {
        console.log(error);
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
          this.setState({ id: res.userInfo._id });
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
      console.log(list);
      await this.setState({ shareTo: list });
    } else {
      let filteredArray = this.state.shareTo.filter(item => item !== event.target.name);
      await this.setState({ shareTo: filteredArray });
    }
  }


  render() {
    const { classes } = this.props;
    const { courses } = this.state;
    const { open } = this.state;

    return (
      <Paper className={classes.paper}>
        <React.Fragment>
          <main>
            <DashBoardNavBar />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <Grid >
                  <Button variant="contained" size="lg" active onClick={() => { this.handleClickOpen(); }} style={{ marginBottom: 20 }} >
                    Add Course
               </Button>
                </Grid>

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
                    <FormControl variant="outlined" className={classes.formControl} style={{ marginTop: 15, marginBottom: 20 }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Education Level
                        </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                      >
                        <MenuItem value='Elementary School'>Elementary School</MenuItem>
                        <MenuItem value='High School'>High School</MenuItem>
                        <MenuItem value='University'>University</MenuItem>
                      </Select>
                    </FormControl>

                    {this.state.filteredListCourses.length === 0 ? <></> :
                      <FormControl variant="outlined" className={classes.formControl} style={{ marginTop: 10, marginBottom: 15 }}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Course Name
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                        >
                          {this.state.filteredListCourses.map(course => {
                            return <MenuItem value={course} key={course}>{course.name}</MenuItem>
                          })}
                        </Select>
                      </FormControl>
                    }
                    <div>

                    <Button variant="contained" size="lg" active onClick={() => { this.addCourseToDb(); }} style={{ marginBottom: 15 }}>
                        Save Course
                    </Button>
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
                      id="courseName"
                      name="courseName"
                      onChange={e => this.setState({ courseName: e.target.value })}
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


                      <FormControl variant="outlined" className={classes.formControl} style={{ marginTop: 30 }}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Education Level
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={e => this.setState({ educationLevel2: e.target.value })}
                        >
                          <MenuItem value='Elementary School'>Elementary School</MenuItem>
                          <MenuItem value='High School'>High School</MenuItem>
                          <MenuItem value='University'>University</MenuItem>
                        </Select>
                      </FormControl>

                    </div>
                    {this.state.educationLevel2 === "" || this.state.description === "" || this.state.courseName === "" ?
                      <Button variant="contained" size="lg" style={{ marginTop: 15 }} disabled>
                        Save Course
                      </Button>
                      :
                      <Button variant="contained" size="lg" active onClick={() => { this.addCourseToDb(); }} style={{ marginTop: 15 }}>
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
