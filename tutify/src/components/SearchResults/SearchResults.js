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
import Chip from '@material-ui/core/Chip';
import CardActionArea from '@material-ui/core/CardActionArea';
import { BrowserRouter as Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import NavBar from '../NavBar';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const options = [
  'All',
  'Tutor',
  'School',
  'Course',
  'Subject',
  'Program',
];

class SearchResults extends Component {
  // initialize our state
  constructor(props) {
    super(props);
    this.dropDown = React.createRef();
    this.state = {
      data: [],
      filteredData: [],
      placeholder: 'Search',
      showDropDown: false,
      selectedIndex: 0,
      anchorEl: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickMenu = this.handleClickMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  componentDidMount() {
    this.getDataFromDb();
  }

  handleClickMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({selectedIndex: index});
    this.setState({anchorEl: null});

    if(index === 0) {
      this.setState({placeholder: 'Search'});
    }
    else if(index === 1) {
      this.setState({placeholder: 'Search by Tutor'});
    }
    else if(index === 2) {
      this.setState({placeholder: 'Search by School'});
    }
    else if(index === 3) {
      this.setState({placeholder: 'Search by Course'});
    }
    else if(index === 4) {
      this.setState({placeholder: 'Search by Subject'});
    }
    else if(index === 5) {
      this.setState({placeholder: 'Search by Program'});
    }
  };

  handleCloseMenu = () => {
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
      // if search includes whitespace, split it into different search terms
      const filters = e.target.value.toLowerCase().split(" ");

      // Determine which tutors should be displayed based on search term
      newList = currentList.filter(tutor => {
        let currentValue = ""
        let returnValue = true
        switch(this.state.selectedIndex){
          default:
          case 0: tutor.subject.forEach(function(entry) {       
                    currentValue += (entry + " ").toLowerCase()
                  });
                  currentValue += (tutor.first_name + " " + tutor.last_name 
                  + " " + tutor.school + " " + tutor.program).toLowerCase() 
                  break;
          case 1: // name
                  currentValue = (tutor.first_name + " " + tutor.last_name).toLowerCase() 
                  break;
          case 2: // school
                  currentValue = (tutor.school).toLowerCase()
                  break; 
          case 3: // courses
          case 4: // subjects
                  tutor.subject.forEach(function(entry) {       
                    currentValue += (entry + " ").toLowerCase()
                  });
                  break;
          case 5: // program
                  currentValue = (tutor.program).toLowerCase()
                  break; 
        }
        
        // If all search terms are found for the tutor, he/she is included 
        filters.forEach(function(entry) { 
          if (!currentValue.includes(entry)) {
            return returnValue = false;
          }   
        });
        return returnValue;

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
        <NavBar/>

        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm" className={classes.container}>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Search Tutors
              </Typography>
              <ThemeProvider theme={tutifyStyle.theme}>
                <Paper className={classes.root}>
                  <div>
                  <IconButton aria-controls="lock-menu" aria-haspopup="true" onClick={this.handleClickMenu} >
                    <MenuIcon />
                  </IconButton>
                      <Menu
                        id="lock-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        className={classes.menu}
                        open={Boolean(anchorEl)}
                        onClose={this.handleCloseMenu}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                      >
                        {options.map((option, index) => (
                    <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={event => this.handleMenuItemClick(event, index)}
                    >
                        {option}
                    </MenuItem>
                ))}
                      </Menu>
                  </div>
                                                   
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
                        <Typography variant="h5" component="h2">
                          {tutor.first_name} {tutor.last_name}
                        </Typography>
                        <Typography>   
                          <span className={classes.school}>{tutor.school}</span>
                          { tutor.program != "" && (
                            <span className={classes.program}> - {tutor.program}</span>  
                          )}                            
                          <br /> 
                          {tutor.subject.map(sub => (
                            <Chip
                              className={classes.chip}
                              icon={<CheckIcon />}
                              color="secondary"
                              label={sub}
                            />
                          ))}
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