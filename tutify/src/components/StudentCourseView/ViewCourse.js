import React from 'react';
import Footer from '../Footer';
import Grid from '@material-ui/core/Grid';
import * as CourseViewStyles from '../../styles/CourseView-styles';
import { withStyles } from "@material-ui/core/styles";
import ContactTutor from "./ContactTutor";
import Documents from "./Documents";
import DashBoardNavBar from '../ProfilePage/DashBoardNavBar';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';

// View the Specific Course Page with all of the Course Details as well as the Tutor Information
export class ViewCourse extends React.Component {
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
        fetch('/api/checkSession', {
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

        
render() {
    const { classes } = this.props;
    const { courses } = this.state;

    return (
      <Paper className={classes.paper}>
        <React.Fragment>
           <main>
            <DashBoardNavBar />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                <div className={classes.heroContent}>
                <Container className={classes.container}>
                {courses.map((c, i) => (
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    {c.course.name}
                </Typography> ))} </Container>
              </div>

                <Grid container spacing={3}>
                    <Grid item sm={4} className={classes.gridItem}>
                    <Typography>Contact Info</Typography><p></p>
                        <ContactTutor />
                    </Grid>
                    <p></p>
                    
                    <Grid item sm={12} className={classes.gridItem}>
                    <Typography>Course Documents</Typography><p></p>
                        <Documents/>
                    </Grid>
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

export default withStyles(CourseViewStyles.styles, { withTheme: true })(ViewCourse);

