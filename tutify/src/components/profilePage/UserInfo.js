import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      first_name: "",
      last_name: "",
      email: "",
      education_level: "",
      school: "",
      program_of_study: ""
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
    //this.setState({Toggle: false});

  };
  render() {
    const { classes } = this.props;


    return (
      <Paper className={classes.paper}>
        <React.Fragment>
          <Title> User Info</Title>
          <Typography component="p" variant="h6">
            {this.state.first_name} {this.state.last_name}
            {/*Kasthurie Paramasivampillai*/}
          </Typography>
          <Typography component="p" variant="h7">
            {/*Email: sriahila@hotmail.com*/}
            Email : {this.state.email}
          </Typography>
          <Typography color="textSecondary" className={classes.InfoContext}>
            {/*Concordia University */}
            Program of Study: {this.state.program_of_study}
          </Typography>
          <Typography color="textSecondary" className={classes.InfoContext}>
            {/*Concordia University */}
            Education Level: {this.state.education_level}
          </Typography>
          <Typography color="textSecondary" className={classes.InfoContext}>
            {/*Concordia University */}
            School: {this.state.school}
          </Typography>

          <div>
            <Grid item xs={6}>
              {/*<FormControl >
              <InputLabel htmlFor="tutoring_type">Tutoring Type</InputLabel>
              <Select
                name="tutoring_type"
                value={this.state.tutoring_type}
                onChange={event => {this.setState({tutoring_type:event.target.value}); }}
              // onChange={(e) => this.setState({ first_name: e.target.value })}
                input={<Input id="tutoring_type" />}
              >
                <MenuItem value="20">Group Tutoring</MenuItem>
                <MenuItem value="30">Midterm Crash</MenuItem>
                <MenuItem value="40">Final Crash</MenuItem>
                <MenuItem value="50">Weekly Tutorials</MenuItem>
              </Select>
              
            </FormControl>*/}
            </Grid>
            <Grid item xs={6}>
              <form autoComplete="off">
                {/*<CourseSelection />*/}
                {/*<FormControl >
              <InputLabel htmlFor="course" fullWidth>Select Courses</InputLabel>
              <Select
                name="course"
                value={this.state.course}
                onChange={event => {
                  this.setState({course:event.target.value});
                }}
                input={<Input id="course" />}
              >
                <MenuItem value="chem204">CHEM 204</MenuItem>
                <MenuItem value="phys204">PHYS 204</MenuItem>
                <MenuItem value="math204">Math 204</MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="French">French</MenuItem>
              </Select>
              
              </FormControl>*/}
              </form>
            </Grid>


            <Button

              type="button"
              fullWidth
              variant="contained"
              className="submit"

            >
              Save Options
        </Button>

          </div>


        </React.Fragment>
      </Paper>);
  }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(UserInfo);
