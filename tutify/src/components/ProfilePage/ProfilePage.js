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


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      tutorPicture: "",
      __t: "",
      tutors: [],
      courses: [],
    };
  }

  toggleDrawer = booleanValue => () => {
    this.setState({
      drawerOpened: booleanValue
    });
  };

  componentDidMount() {
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
          this.setState({
            Toggle: true,
            tutorPicture: res.userInfo.picture,
            __t: res.userInfo.__t,
            tutors: res.userInfo.tutors,
          });
          this.getUserCourses()
        }
        else {
          this.setState({ Toggle: false });
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
  }

  handleChange(event) {
    fetch('/api/logout', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ Toggle: false });
      })
      .catch(err => console.log(err));
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
              <ScheduledEvents />
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
                      <UserCoursesInfo courses={this.state.courses} />
                    </Paper>
                  </Grid>
                  <br />
                  <Grid >
                    <Paper>
                      <UserTutorsInfo tutors={this.state.tutors} />
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
