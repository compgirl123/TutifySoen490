import React, { Component } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
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
import SearchIcon from '@material-ui/icons/Search';
import NavBar from '../NavBar';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SearchMenu from './SearchMenu';

class SearchResults extends Component {
  // initialize our state
  constructor(props) {
    super(props);
    this.dropDown = React.createRef();
    this.state = {
      data: [],
      filteredData: [],
      placeholder: 'Search by',
      showDropDown: false,
      selectedIndex: 1,
      anchorEl: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  componentDidMount() {
    this.getDataFromDb();
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  // Uses our backend api to fetch tutors from our database
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getTutor')
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
    const {anchorEl} = this.state;
    const {selectedIndex} = this.state;
    return (
      <React.Fragment>
        <NavBar />

        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Search Tutor
              </Typography>
              <ThemeProvider theme={tutifyStyle.theme}>
                <Paper className={classes.root}>
                  <IconButton aria-controls="lock-menu" aria-haspopup="true" onClick={this.handleClick} >
                    <MenuIcon />
                  </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                      >
                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                        <MenuItem onClick={this.handleClose}>My account</MenuItem>
                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                      </Menu>
                   
                 
                  <InputBase
                    ref={this.inputRef}
                    className={classes.input}
                    placeholder={this.state.placeholder}
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
                          This is a tutor profile. Tutor information will be displayed here. <br />
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