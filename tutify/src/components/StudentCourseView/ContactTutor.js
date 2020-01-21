import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import * as CourseViewStyles from '../../styles/CourseView-styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

// Created a Contact Tutor Page for Students to be able to communicate with their tutors
class ContactTutor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      test: []
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
      <React.Fragment>
        <Paper className={classes.paper}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                title="French"
                height="140"
              />
              {courses.map((c, i) => (
                <CardContent>
                   {/* Display Tutor Full Name */}
                  <Typography gutterBottom variant="h5" component="h2">
                    {c.tutor.first_name + " " + c.tutor.last_name}
                  </Typography>
                   {/* Display Course Name */}
                  <Typography variant="body2" color="textSecondary" component="p">
                    {c.course.name}
                  </Typography>
                </CardContent>
              ))}

            </CardActionArea>
            <CardActions>
              <Button type="button" size="small" href="/Postblog" fullWidth variant="contained" className="submit">
                Contact
              </Button>
            </CardActions>
          </Card>
        </Paper>
      </React.Fragment>
    );
  }

}
export default withStyles(CourseViewStyles.styles, { withTheme: true })(ContactTutor);