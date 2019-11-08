import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DashBoardNavBar from "./DashBoardNavBar";
import Footer from "../Footer";

class ProfilePage extends React.Component {
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
    fetch('http://localhost:3001/api/checkSession',{
                  method: 'GET',
                  credentials: 'include'
    })          
      .then(response => response.json())
      .then(res => {
        if(res.isLoggedIn){
            this.setState({Toggle: true});
            this.getDataFromDb()
        }
        else{
            this.setState({Toggle: false});
        }
      })
      .catch(err => console.log(err));
  };
  
  // Uses our backend api to fetch the courses from our database
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getUserCourses',{
      method: 'GET',
      credentials: 'include'
  })
    .then(response => response.json())
    .then(res => {
          this.setState({courses: res.data});
      
    })
    .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const { courses } = this.state;

    return (
      <React.Fragment>
        <main>
          <DashBoardNavBar />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                Courses Current Enrolled In:
        </Typography>
              <Grid container spacing={2}>
              {courses.map((course, i) => (
                  <Grid item key={i} xs={4} md={4} lg={4}>
                    <Paper className={classes.fixedHeightPaper}>
                      <Typography component={'span'} variant={'body2'}>
                        <img src="https://i.imgur.com/L6lDhbz.jpg" alt="Subject">
                        </img>
                        <br />
                        <h3>Tutor Name: -</h3>
                        <h3>Subject : {course.name}</h3>
                        <Button fullWidth variant="contained">View Course Material </Button>
                        <br />
                      </Typography>
                    </Paper>
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
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(ProfilePage);
