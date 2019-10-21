import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import SchoolIcon from '@material-ui/icons/School';
import CheckIcon from '@material-ui/icons/Check';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from "@material-ui/styles";
import Copyright from "../Copyright"
import { withStyles } from "@material-ui/core/styles";
import * as tutifyStyle from './SearchResults-styles';
import Chip from '@material-ui/core/Chip'
import CardActionArea from '@material-ui/core/CardActionArea';
import { BrowserRouter as Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
const fetch = require("node-fetch");


export class SearchResults extends Component {
  // initialize our state
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredData: [],
    };
    this.handleChange = this.handleChange.bind(this);
  } 

  // when component mounts, first thing it does is fetch all existing data in our db
  componentDidMount() {
    this.getDataFromDb();
  }

  // Uses our backend api to fetch tutors from our database
  getDataFromDb = (fetchFunction = fetch) => {
    fetchFunction('http://localhost:3001/api/getTutor')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data, filteredData: res.data }));
  }

  // filters the list of tutors displayed
  handleChange(e) {
    // Variable to hold the original version of the list
    let currentList = this.state.data;
    // Variable to hold the filtered list before putting into state
    let newList = [];
        
    // If the search bar isn't empty
    if (e.target.value !== "") {          
      // Determine which tutors should be displayed based on search term
      newList = currentList.filter(tutor => {
          const name = (tutor.first_name + " " + tutor.last_name).toLowerCase()
          const filter = e.target.value.toLowerCase(); //search term

          // check to see if the current tutor includes the search term (substring)
          return name.includes(filter);
      });
    } else {
      newList = currentList;
    }

    this.setState({
      filteredData: newList
    });
  }

  render() {
    const { classes } = this.props;
    const { filteredData } = this.state;
    return (
      <React.Fragment>
        <AppBar className={classes.appBar} position="relative">
          <Toolbar>
            <SchoolIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              Tutify
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
                <ThemeProvider theme={tutifyStyle.theme}>
                  <Paper className={classes.root}>
                    <IconButton className={classes.iconButton} aria-label="menu">
                      <MenuIcon />
                    </IconButton>
                    <InputBase
                      className={classes.input}
                      placeholder="Enter a name"
                      inputProps={{ 'aria-label': 'enter a name' }}
                      onChange={this.handleChange}
                    />
                    <IconButton className={classes.iconButton} aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </ThemeProvider>
            </Container>
          </div>
          <div className={classes.gridContainer}>
            <Container className={classes.cardGrid} width="100%">
              {/* End hero unit */}
              <Grid container spacing={4}>
                {filteredData.map(tutor => (
                  <Grid item key={tutor.id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                    <CardActionArea component={Link} to="/SearchPage">
                      <CardMedia
                        className={classes.cardMedia}
                        image={tutor.picture}
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
          </div>
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