import React from "react";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from "../Footer";
import TutorInfo from './TutorInfo';
import TutorCoursesInfo from './TutorCoursesInfo';
import NewCalendar from './Calendar';
import TutorStudentsInfo from './TutorStudentsInfo';
import DashBoardNavBar from '../ProfilePage/DashBoardNavBar'
import IconButton from '@material-ui/core/IconButton';
import Drawer from "@material-ui/core/Drawer";
import Avatar from '@material-ui/core/Avatar';
import calendarIcon from '../../assets/calendarIcon.png';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


class TutorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      email: ""
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);

  }

  toggleDrawer = booleanValue => event => {
    this.setState({
      drawerOpened: booleanValue
    });   
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
          this.setState({ Toggle: true, email: res.user.email });
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
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <main>
          <DashBoardNavBar />
          <Drawer variant="permanent"  anchor="right" overflow="hidden">
                <IconButton style={{paddingTop: '100%', paddingLeft: '40px', paddingRight:'40px', backgroundColor: 'transparent'}} >
                    </IconButton>
                    <IconButton onClick={this.toggleDrawer(true)}>
                    <Avatar src={calendarIcon} style={{alignSelf: 'center', width:'60px', height: '60px'}}  ></Avatar>
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
      <NewCalendar />
      </Paper>
      </Drawer>

          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>

              <Grid container spacing={4}>

                {/* User Info */}
                <Grid item xs={5}>
                  <Paper>
                    <TutorInfo />
                  </Paper>
                </Grid>

                <Grid item xs={6}>
                  <Grid >
                    <Paper>
                      <TutorCoursesInfo />
                    </Paper>
                  </Grid>
                  <br />

                  <Grid >
                    <Paper>
                      <TutorStudentsInfo />
                    </Paper>
                  </Grid>

                  <br />

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
export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorProfile);