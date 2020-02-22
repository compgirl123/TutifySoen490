import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import DashBoardNavBar from '../DashBoardNavBar';
import Paper from '@material-ui/core/Paper';
import Footer from '../Footer';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import axios from "axios";

// View the General Course Page with all of the Courses the Tutor Teaches or Student is enrolled in.
export class ChooseTutorVideoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      description: "",
      id: "",
      students: []
    };
  }

  componentDidMount() {
    this.checkSession();
  }

  // Distinguishing the tutor login from student login.
  checkSession = () => {
    console.info("Fetching session from db...");
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          this.setState({ discriminator: res.userInfo.__t, id: res.userInfo._id });
          if (res.userInfo.__t === "student") {
            this.getAllVideos();
          }
        }
      })
      .catch(err => console.error("Session could not be checked: " + err));
  };

  // Getting all of the videos from the selected Tutor
  getAllVideos = () => {
    axios.get('/api/getUsersTutors').then((res) => {
        // fetch the videos
        console.info("Successfully fetched the videos");
        console.log(res.data.data);
        // setting state of the video array in order to get information from each video
        this.setState({
            videos: res.data.data
        });
    })
        .catch(err => console.error("Could not get the videos from the database: " + err));
  } 

  // Uses our backend api to fetch student's courses from the database
  getUserDataFromDb = () => {
    console.info("Fetching student's courses from db...");
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
  }

  render() {
    const { classes } = this.props;
    const { videos } = this.state;

    return (
      <Paper className={classes.paper}>
        <React.Fragment>
          <main>
            <DashBoardNavBar />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <Button variant="contained" size="lg" active onClick={() => { this.handleClickOpen(); }} className={classes.addCourseButton} >
                  Add Course
                  </Button>
                <Grid container spacing={5}>
                  {videos.map((c, i) => (
                    <Grid item xs={4} md={4} lg={4}>
                      <Card className={classes.card}>
                        <CardActionArea>
                          <CardMedia
                            className={classes.media}
                            title="French"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                              {c.first_name} {c.last_name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button type="button" onClick={() => window.location.replace("/videos/" + (c._id).replace(/ /g, ""))} size="small" href="" fullWidth className="submit">
                            View Tutor Videos
                            </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
              {/* Footer */}
              <Footer />
            </main>
          </main>
        </React.Fragment>
      </Paper>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(ChooseTutorVideoPage);
