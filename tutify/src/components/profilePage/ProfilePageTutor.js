import React from "react";
import Typography from "@material-ui/core/Typography";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from "../Footer";
import DashBoardNavBar from "./DashBoardNavBar";
import Link from '@material-ui/core/Link';
import Title from './Title';
import { FormControl } from '@material-ui/core';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from '@material-ui/core/Button';

class ProfilePageTutor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  render() {
    const { classes } = this.props;
    const { tutor } = this.props.location.state

    return (
      <React.Fragment>
        <main>
          <DashBoardNavBar />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                Tutor Profile
              </Typography>
              <Grid container spacing={4}>

                {/* User Info */}
                <Grid item lg={6}>
                  <Paper>
                    <Title> User Info</Title>
                    <Typography component="p" variant="h6">
                      {tutor.first_name} {tutor.last_name}
                      {/*Kasthurie Paramasivampillai*/}
                    </Typography>
                    <Typography component="p" variant="h7">
                      {/*Email: sriahila@hotmail.com*/}
                      Email : {tutor.email}
                    </Typography>
                    <Typography color="textSecondary" className={classes.InfoContext}>
                      {/*Concordia University */}
                      Program of Study: {tutor.program_of_study}
                    </Typography>
                    <Typography color="textSecondary" className={classes.InfoContext}>
                      {/*Concordia University */}
                      Education Level: {tutor.education_level}
                    </Typography>
                    <Typography color="textSecondary" className={classes.InfoContext}>
                      {/*Concordia University */}
                      School: {tutor.school}
                    </Typography>

                    <div>
                      <Grid item xs={6}>

                        <FormControl >
                          <InputLabel htmlFor="tutoring_type">Tutoring Type</InputLabel>
                          <Select
                            name="tutoring_type"
                            value={this.state.tutoring_type}
                            onChange={event => { this.setState({ tutoring_type: event.target.value }); }}
                            // onChange={(e) => this.setState({ first_name: e.target.value })}
                            input={<Input id="tutoring_type" />}
                          >
                            <MenuItem value="20">Group Tutoring</MenuItem>
                            <MenuItem value="30">Midterm Crash</MenuItem>
                            <MenuItem value="40">Final Crash</MenuItem>
                            <MenuItem value="50">Weekly Tutorials</MenuItem>
                          </Select>

                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <form autoComplete="off">
                          <FormControl >
                            <InputLabel htmlFor="course" fullWidth>Select Courses</InputLabel>
                            <Select
                              name="course"
                              value={this.state.course}
                              onChange={event => {
                                this.setState({ course: event.target.value });
                              }}
                              input={<Input id="course" />}
                            >
                              <MenuItem value="chem204">CHEM 204</MenuItem>
                              <MenuItem value="phys204">PHYS 204</MenuItem>
                              <MenuItem value="math204">Math 204</MenuItem>
                              <MenuItem value="English">English</MenuItem>
                              <MenuItem value="French">French</MenuItem>
                            </Select>

                          </FormControl>
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
                      <Link color="primary" href="/">
                        Edit Info
                      </Link>
                    </div>

                  </Paper>
                </Grid>

                {/* Adding Picture */}
                <Grid item xs={12} md={6} lg={6}>
                  <img src={this.props.tutor.picture} alt="Profile">
                  </img>
                </Grid>

              </Grid>
            </Container>
            <main>
              {/* Hero unit */}


            </main>
            <Footer />
          </main>

        </main>
      </React.Fragment>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(ProfilePageTutor);