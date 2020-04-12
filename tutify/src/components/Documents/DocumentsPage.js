import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import * as tutifyStyle from '../../styles/UploadDocuments-styles';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import DashBoardNavBar from '../DashBoardNavBar';
import Title from '../ProfilePage/Title';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Footer from '../Footer';
import UploadDocuments from './UploadDocuments';

// Display which includes uploaded docs, list of courses and "view all documents" button
export class DocumentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses:[],
      user_id: "",
      user_type: ""
    }
  }

  componentDidMount() {
    this.checkSession();
  }

  // Setting the login state of user.
  checkSession = () => {
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
            this.setState({ user_id: res.userInfo._id, user_type: res.userInfo.__t });
            if(res.userInfo.__t === "student")
            {
                this.getUserCourses();
            }          
        }
        else {
          this.setState({ user_id: "Not logged in" });
        }
        console.info("Session checked");
      })
      .catch(err => console.error("An error occured while checking the current session: " + err));
  };

  // Uses our backend api to fetch student's courses from the database
  getUserCourses = () => {
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
    const { courses, user_type, user_id } = this.state;

    return (
      <React.Fragment>
        <main className={classes.root}>
          <DashBoardNavBar />
            <UploadDocuments user_id={user_id} />

            <Container maxWidth="sm">
              <Button type="button" variant="contained" onClick={() => window.location.replace("/doclist")} size="small" href="" fullWidth className={classes.viewAll}>
                  View All / Share Documents
              </Button>
            </Container>

            {user_type === "student" ?         
                <Container maxWidth="lg" className={classes.container}>
                    <Title>Documents By Courses</Title>
                    <Grid container spacing={5}>
                        {courses.map((c, i) => (
                            <Grid item xs={4} md={4} lg={4}>
                                <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    title="French"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {c.course.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {c.course.description ? c.course.description : ""}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button type="button" variant="outlined" onClick={() => window.location.replace("/viewCourse/" + (c.course._id).replace(/ /g, ""))} size="small" href="" fullWidth className="submit">
                                        View Documents
                                    </Button>
                                </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>      
                </Container> : <></>
            }
        </main>
        <Footer />
      </React.Fragment>
    );
  }
} // End of component

export default withStyles(tutifyStyle.styles, { withTheme: true })(DocumentsPage);
