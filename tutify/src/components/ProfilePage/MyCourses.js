import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import DashBoardNavBar from './DashBoardNavBar';
import Paper from '@material-ui/core/Paper';
import Footer from '../Footer';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

// Created a Courses Page for Students to View the Courses they are enrolled in
export class MyCourses extends React.Component {
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
                <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                  My Enrolled Courses
                </Typography>
                <Grid container spacing={5}>
                  {courses.map((c, i) => (
                    <Grid item key={i} xs={4} md={4} lg={4}>
                      <Card className={classes.card}>
                        <CardActionArea>
                          <CardMedia
                            className={classes.media}
                            title="French"
                          />
                          <CardContent>
                            {/* Display Course Name */}
                            <Typography gutterBottom variant="h5" component="h2">
                              {c.course.name}
                            </Typography>
                            {/* Display Tutor Full Name */}
                            <Typography gutterBottom component="h3">
                              {c.tutor.first_name + " " + c.tutor.last_name}
                            </Typography>
                             {/* Display Course Description */}
                            <Typography variant="body2" color="textSecondary" component="p">
                              {c.course.description? c.course.description: ""}
                         </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button type="button" size="small" onClick={() => window.open("http://localhost:3000/ViewCourse/" + (c.course.name).replace(/ /g,""))} fullWidth variant="contained" className="submit">
                            View Course
                         </Button>
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
export default withStyles(tutifyStyle.styles, { withTheme: true })(MyCourses);