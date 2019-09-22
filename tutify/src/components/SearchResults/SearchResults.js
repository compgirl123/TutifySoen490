import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import SchoolIcon from '@material-ui/icons/School';
import CheckIcon from '@material-ui/icons/Check';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { TextField } from '@material-ui/core';
import { ThemeProvider } from "@material-ui/styles";
import Copyright from "../Copyright"
import { withStyles } from "@material-ui/core/styles";
import * as tutifyStyle from './SearchResults-styles';
import Chip from '@material-ui/core/Chip'
import CardActionArea from '@material-ui/core/CardActionArea';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class SearchResults extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    // TO FIX
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // Uses our backend api to fetch tutors from our database
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getTutor')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar className={classes.appBar} position="relative">
          <Toolbar>
            <SchoolIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              Search Tutor
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Search Tutor
              </Typography>
              <Typography align="center">
                <ThemeProvider theme={tutifyStyle.theme}>
                  <form className={classes.container} noValidate autoComplete="off">
                    <TextField 
                      id="outlined-search"
                      label="Enter a subject"
                      type="search"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
          
                      />
                  </form>
                </ThemeProvider>
              </Typography>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {data.map(tutor => (
                <Grid item key={tutor.id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                  <CardActionArea component={Link} to="/SearchPage">
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      title="Image title"
                    />
                    </CardActionArea>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                      {tutor.first_name} {tutor.last_name}
                      </Typography>
                      <Typography>
                        This is a tutor profile. Tutor information will be displayed here. <br/>
                        <Chip
                          className={classes.chip}
                          icon={<CheckIcon />}
                          color="secondary"
                          label={tutor.subject}
                        />
                      </Typography>
                    </CardContent>

                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Tutify
          </Typography>
          <Copyright />
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
} // End of component

export default withStyles(tutifyStyle.styles, { withTheme: true })(SearchResults);