import React from "react";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from "../Footer";
import DashBoardNavBar from "../DashBoardNavBar";
import UserInfo from './UserInfo';
import Card from '@material-ui/core/Card';
import UserCoursesInfo from './Student/UserCoursesInfo';
import UserTutorsInfo from './Tutor/UserTutorsInfo';
import Paper from '@material-ui/core/Paper';
import ScheduledEvents from './Student/ScheduledEvents';
import IconButton from '@material-ui/core/IconButton';
import Drawer from "@material-ui/core/Drawer";
import Avatar from '@material-ui/core/Avatar';
import calendarIcon from '../../assets/calendarIcon.png';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TutorCoursesInfo from './Tutor/TutorCoursesInfo';
import NewCalendar from './Tutor/Calendar';
import TutorStudentsInfo from './Tutor/TutorStudentsInfo';
import axios from 'axios';
import Facebook from 'react-sharingbuttons/dist/buttons/Facebook';
import 'react-sharingbuttons/dist/main.css';
import Twitter from 'react-sharingbuttons/dist/buttons/Twitter';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from "@material-ui/core/Button";


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Toggle: false,
      __t: "",
      tutors: [],
      courses: [],
      students: [],
      open: false
    };
    his.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
  }
  toggleDrawer = booleanValue => () => {
    this.setState({
      drawerOpened: booleanValue
    });
  };

  componentWillMount() {
    this.checkSession();
  }

  checkSession = () => {
    console.info("Fetching session...");
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          if (res.userInfo.__t === "tutor") {
            this.setState({ students: res.userInfo.students });
            this.FindStudents();
          }
          else if (res.userInfo.__t === "student") {
            this.setState({ tutors: res.userInfo.tutors, Toggle: true });
            this.getUserCourses()
          }
        }

      })
      .catch(err => console.error("Session could not be checked: " + err));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };



  //this method uses the backend API to find a student's courses
  getUserCourses = () => {
    console.info("Fetching student courses from db...");
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
  };

  //this method uses the backend API to find a tutor's students
  FindStudents = () => {
    console.info("Fetching students from db...");
    axios.post('/api/findStudents', {
      students: this.state.students
    })
      .then((res) => {

        this.setState({ students: res.data.data });

      }, (error) => {
        console.error("Could not get students from database (API call error) " + error);
      })
  };


  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const url = 'http://tutify-259321.appspot.com/'
    const shareText = 'Tutify is an application system for helping tutors and their students connect. Check it out!'
    return (
      <React.Fragment>
        <main>
          <DashBoardNavBar />
          <Drawer variant="permanent" anchor="right" overflow="hidden">
            <IconButton className={classes.iconButton} style={{ backgroundColor: 'transparent' }} >
            </IconButton>
            <IconButton onClick={this.toggleDrawer(true)}>
              <Avatar src={calendarIcon} className={classes.avatar}></Avatar>
            </IconButton>
          </Drawer>
          <Drawer
            anchor="right"
            open={this.state.drawerOpened}
            onClose={this.toggleDrawer(false)}
          >
            <div>
              <IconButton onClick={this.toggleDrawer(false)}>
                <ChevronRightIcon />
              </IconButton>
            </div>
            <Paper>
              {this.state.Toggle ? <ScheduledEvents /> : <NewCalendar />}
            </Paper>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>

              <Grid container spacing={4}>

                {/* User Info */}
                <Grid item xs={4}>
                  <Card>
                    <UserInfo />
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Grid >
                    <Paper>
                      {this.state.Toggle ? <UserCoursesInfo courses={this.state.courses} /> : <TutorCoursesInfo />}
                    </Paper>
                  </Grid>
                  <br />
                  <Grid >
                    <Paper>
                      {this.state.Toggle ? <UserTutorsInfo tutors={this.state.tutors} /> : <TutorStudentsInfo students={this.state.students} />}

                    </Paper>
                  </Grid>
                </Grid>

              </Grid>
            </Container>
            <div>

              <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Share</DialogTitle>
                <DialogContent>
                  <div>
                    <DialogContentText>
                      Choose one of the following platforms:
                        </DialogContentText>
                  </div>
                  <div>
                    <Facebook url={url} />
                    <Twitter url={url} shareText={shareText} />

                  </div>

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
            <Footer />
          </main>

        </main>
      </React.Fragment>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(ProfilePage);
