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

/**
    View the General Video Page with all of the Tutors the Student is registered with.
    The Student clicks on the tutor they want to view quizzes for and they could see all of the 
    quizzes this tutor has upoloaded for the courses they are enrolled in with the specific tutor.
 **/

export class ChooseTutorForQuizzes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutors: [],
      id: ""
    };
  }

  componentDidMount() {
    this.checkSession();
  }

  // Setting the login state for the user. Only students can view this page as they need to choose tutor they want to take the quiz for.
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
            this.getAllTutors();
          }
        }
      })
      .catch(err => console.error("Session could not be checked: " + err));
  };

  // Getting all of the tutors the logged in student is registered with.
  getAllTutors = () => {
    axios.get('/api/getUsersTutors').then((res) => {
      console.info("Successfully fetched the tutors");
      this.setState({
        tutors: res.data.data
      });
    })
      .catch(err => console.error("Could not get the tutors from the database: " + err));
  }

  render() {
    const { classes } = this.props;
    const { tutors } = this.state;

    return (
      <Paper className={classes.paper}>
        <React.Fragment>
          <main>
            <DashBoardNavBar />
            <main>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={5}>
                  {tutors.map((c, i) => (
                    <Grid item xs={4} md={4} lg={4}>
                      <Card className={classes.card}>
                        <CardActionArea>
                          <CardMedia
                            className={classes.media}
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
                          <Button type="button" variant="outlined" onClick={() => window.location.replace("/chooseClassAndQuiz/" + (c._id).replace(/ /g, ""))} size="small" href="" fullWidth className="submit">
                            View Tutor Quizzes
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
export default withStyles(tutifyStyle.styles, { withTheme: true })(ChooseTutorForQuizzes);
