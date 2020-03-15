import React, { Component } from 'react';
import * as tutifyStyle from '../../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from "../../Footer";
import DashBoardNavBar from "../../DashBoardNavBar";
import UserInfo from '../UserInfo';
import Card from '@material-ui/core/Card';
import UserCoursesInfo from '../Student/UserCoursesInfo';
import UserTutorsInfo from '../Tutor/UserTutorsInfo';
import Paper from '@material-ui/core/Paper';
import TutorCoursesInfo from '../Tutor/TutorCoursesInfo';
import TutorStudentsInfo from '../Tutor/TutorStudentsInfo';
import axios from 'axios';
import 'react-sharingbuttons/dist/main.css';

export class TutorPublicProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Toggle: false,
          __t: "",
          tutors: [],
          courses: [],
          students: [],
          open: false,
          tutor: "",
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
      }
      toggleDrawer = booleanValue => () => {
        this.setState({
          drawerOpened: booleanValue
        });
      };
    
      componentDidMount() {
        const { match: { tutors } } = this.props;
      
        axios.get(`/api/profile/${tutors.userId}`)
          .then(({ data: tutor }) => {
            console.log('tutor', tutor);
      
            this.setState({ tutor });
          });
      }
    
      handleClose = () => {
        this.setState({ open: false });
      };
    
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
    
      //This method closes the dialog box
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
    return (
        <React.Fragment>
        <main>
          <DashBoardNavBar />
          
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
                        <TutorCoursesInfo />}
                    </Paper>
                  </Grid>
                  <br />
                  <Grid >
                  </Grid>
                </Grid>

              </Grid>
            </Container>
            <Footer />
          </main>

        </main>
      </React.Fragment>
    );

  }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorPublicProfilePage);