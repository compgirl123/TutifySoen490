import React from "react";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from "../Footer";
import DashBoardNavBar from "./DashBoardNavBar";
import UserInfo from './UserInfo';
import Card from '@material-ui/core/Card';
import UserCoursesInfo from './UserCoursesInfo';
import UserTutorsInfo from './UserTutorsInfo';
import Paper from '@material-ui/core/Paper';
import ScheduledEvents from './ScheduledEvents';
import IconButton from '@material-ui/core/IconButton';
import Drawer from "@material-ui/core/Drawer";
import Avatar from '@material-ui/core/Avatar';
import calendarIcon from '../../assets/calendarIcon.png';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TutorCoursesInfo from '../TutorProfile/TutorCoursesInfo';
import NewCalendar from '../TutorProfile/Calendar';
import TutorStudentsInfo from '../TutorProfile/TutorStudentsInfo';
import axios from 'axios';


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Toggle: false,
      __t: "",
      tutors: [],
      courses: [],
      students:[]
    };
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
            console.log("yooooo");
            this.setState({ tutors: res.userInfo.tutors, Toggle: true });
            this.getUserCourses()
          }
        }

      })
      .catch(err => console.log(err));
  };
 
  getUserCourses = () => {
    fetch('/api/getUserCourses', {
        method: 'GET',
        credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ courses: res.data });


      })
      .catch(err => console.log(err));
  };

  FindStudents = () => {
    axios.post('/api/findStudents', {
      students: this.state.students
    })
      .then((res) => {

        this.setState({ students: res.data.data });

      }, (error) => {
        console.log(error);
      })
  };


  render() {
    const { classes } = this.props;
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
                    {this.state.Toggle ? <UserCoursesInfo courses={this.state.courses} />: <TutorCoursesInfo   />}   
                    </Paper>
                  </Grid>
                  <br />
                  <Grid >
                    <Paper>
                    {this.state.Toggle ? <UserTutorsInfo tutors={this.state.tutors} />: <TutorStudentsInfo students={this.state.students}/>}

                    </Paper>
                  </Grid>
                </Grid>

              </Grid>
            </Container>
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
