import React from 'react';
import Footer from '../Footer';
import Grid from '@material-ui/core/Grid';
import * as CourseViewStyles from '../../styles/CourseView-styles';
import { withStyles } from "@material-ui/core/styles";
import ContactTutor from "./ContactTutor";
import Documents from "./Documents";
import Drawer from "@material-ui/core/Drawer";
import { typography } from '@material-ui/system';
import DashBoardNavBar from '../ProfilePage/DashBoardNavBar';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";

class ViewCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        drawerOpened: false,
        courses: []
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
        fetch('http://localhost:3001/api/checkSession', {
          method: 'GET',
          credentials: 'include'
        })
          .then(response => response.json())
          .then(res => {
            if (res.isLoggedIn) {
              this.setState({ Toggle: true });
              this.getDataFromDb()
            }
            else {
              this.setState({ Toggle: false });
            }
          })
          .catch(err => console.log(err));
      };
  
    // Uses our backend api to fetch the courses from our database
    getDataFromDb = () => {
        fetch('http://localhost:3001/api/getUserCourses', {
        method: 'GET',
        credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            this.setState({ courses: res.data });
  
        })
        .catch(err => console.log(err));
    }

        
render() {
    const { classes } = this.props;
    const { courses } = this.state;

    return (
        <React.Fragment>
            <DashBoardNavBar />
            <div className={classes.heroContent}>
            <Container className={classes.container}>
            {courses.map((c, i) => (
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                {c.course.name}
              </Typography> ))} </Container>
          </div>
            <Drawer
                className={classes.drawer}
                variant="permanent"
            >
                <div className={classes.toolbar} />
            </Drawer>
            <main className={classes.root}>
            <Grid container spacing={3}>
                <Grid item sm={4} className={classes.gridItem}>
                <typography>Contact Info</typography><p></p>
                    <ContactTutor />
                </Grid>
                <p></p>
                
                <Grid item sm={12} className={classes.gridItem}>
                <typography>Course Documents</typography><p></p>
                    <Documents/>
                </Grid>
            </Grid>
            <Footer />
        </main>
    </React.Fragment>
        );
    }
}

export default withStyles(CourseViewStyles.styles, { withTheme: true })(ViewCourse);

