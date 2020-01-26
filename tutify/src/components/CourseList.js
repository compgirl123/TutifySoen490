import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import * as tutifyStyle from '../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import DashBoardNavBar from './ProfilePage/DashBoardNavBar';
import Paper from '@material-ui/core/Paper';
import Footer from './Footer';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import swal from 'sweetalert';
import CheckIcon from '@material-ui/icons/Check';

const assignCourse = (e, userID, tutorID, courseID) => {
  axios.post('/api/assignCourse', {
    student_id: userID,
    tutor_id: tutorID,
    course_id: courseID,
  });
  swal("Successfully enrolled in course!", "", "success")
    .then((value) => {
      window.location = "/search";
    });
  console.info("Successfully enrolled user to course");
}

function EnrollButton(props) {
  const isConnected = props.isConnected;
  if (!isConnected) {
    return <Button type="button" size="small" fullWidth variant="contained" className="submit"
      onClick={event => assignCourse(event, props.userId, props.tutorId, props.courseId)}>
      Enroll
      </Button>
  }
  return <Button type="button" size="small" fullWidth variant="contained" className="submit" disabled> Enrolled <CheckIcon /></Button>
}

class CourseList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tutor_id: "",
      tutorName: "",
      tutorCourses: [],
      user_id: "",
      drawerOpened: false,
      userCourses: [],
    };
  }
  toggleDrawer = booleanValue => () => {
    this.setState({
      drawerOpened: booleanValue
    });
  };

  componentDidMount() {
    const { match: { params } } = this.props;
    this.setState({
      tutor_id: params.id
    })
    this.checkSession()
  }

  getTutorFromDB = () => {
    axios.get('/api/getTutor', {
      params: {
        ID: this.state.tutor_id
      }
    }).then((res) => {
      this.setState({
        tutorName: res.data.tutor.first_name + " " + res.data.tutor.last_name,
        tutorCourses: res.data.tutor.courses,
      });
      this.getUserCoursesFromDb();
      console.info("Successfully fetched the specific tutor's information");
    })
      .catch(err => console.error("Could not get the tutor's information from the database: "+err));
  }

  getUserCoursesFromDb = () => {
    fetch('/api/getUserCourses', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ userCourses: res.data });
        console.info("Successfully fetched the user's enrolled courses");
      })
      .catch(err => console.error("Could not get the user's courses: "+err));
  }

  checkSession = () => {
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then((res) => {
        if (res.isLoggedIn) {
          this.setState({
            user_id: res.userInfo._id,
          });
          this.getTutorFromDB()
        }
        console.info("Session checked");
      })
      .catch(err => console.error("An error occured while checking the current session: "+err));
  };

  checkIfConnected(courseID) {
    return this.state.userCourses.some(item => item.course._id === courseID)
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <React.Fragment>
          <main>
            <DashBoardNavBar />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />

              <Container maxWidth="lg" className={classes.container}>
                <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                  Courses Offered by {this.state.tutorName}
                </Typography>
                <Grid container spacing={5}>
                  {this.state.tutorCourses.map((c, index) => (
                    <Grid item xs={4} md={4} lg={4} key={index}>
                      <Card className={classes.card}>
                        <CardActionArea>
                          <CardMedia
                            src="/"
                            className={classes.media}
                            title={c.course.name}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                              {c.course.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              {c.course.description}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <EnrollButton
                            isConnected={this.checkIfConnected(c.course._id)}
                            classes={classes}
                            userId={this.state.user_id}
                            tutorId={this.state.tutor_id}
                            courseId={c.course._id}
                          />
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
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
export default withStyles(tutifyStyle.styles, { withTheme: true })(CourseList);
