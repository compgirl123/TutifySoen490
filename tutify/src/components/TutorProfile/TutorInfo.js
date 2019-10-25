import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from '../profilePage/Title';
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CourseSelection from '../profilePage/CourseSelection';
import Button from '@material-ui/core/Button';


class TutorInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      first_name: "",
      last_name: "",
      email: "",
      education_level: "",
      subject: ""

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
          this.setState({
            Toggle: true, first_name: res.tutor.first_name, last_name: res.tutor.last_name,
            email: res.tutor.email, education_level: res.tutor.education_level, subject: res.tutor.subject
          });
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


  checkSession = () => {
    fetch('http://localhost:3001/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          this.setState({
            Toggle: true, first_name: res.userInfo.first_name, last_name: res.userInfo.last_name,
            email: res.email, education_level: res.userInfo.education_level, school: res.userInfo.school,
            program_of_study: res.userInfo.program_of_study
          });
        }
        else {
          this.setState({ Toggle: false });
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <React.Fragment >
          <Title> Tutor Info</Title>
          <Typography component="p" variant="h6">
            Tutor Name : Pooja Patel
      </Typography>
          <br />
          <Typography component="p" variant="h7">
            Email : Pooja@hotmail.com
      </Typography>
          <br />
          <Typography component="p" variant="h7">
            School : Concordia University
      </Typography>
          <br />
          <Typography component="p" variant="h7">
            Courses Taught : French
      </Typography>

          <Grid item xs={6}>

            <CourseSelection />
          </Grid>

          <Button

            type="button"
            fullWidth
            variant="contained"
            className="submit"

          >
            Save
        </Button>
        </React.Fragment>
      </Paper>
    );
  }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorInfo);
