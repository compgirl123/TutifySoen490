import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";
import * as tutifyStyle from '../styles/SearchTutors-styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Footer from './Footer';
import DashBoardNavBar from './ProfilePage/DashBoardNavBar';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TutorCard from './TutorCard';


const options = [
  'All',
  'Tutor',
  'School',
  'Course',
  'Subject',
  'Program',
];

export class SearchTutors extends Component {
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
      displayTutor: false,
      user_id: null,
      connectedTutors: []
    };
    // this.filterList = this.filterList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickMenu = this.handleClickMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  componentDidMount() {
    this.checkSession();
  }

  handleClickMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
    this.setState({ anchorEl: null });

    if (index === 0) {
      this.setState({ placeholder: 'Search' });
    }
    else if (index === 1) {
      this.setState({ placeholder: 'Search by Tutor' });
    }
    else if (index === 2) {
      this.setState({ placeholder: 'Search by School' });
    }
    else if (index === 3) {
      this.setState({ placeholder: 'Search by Course' });
    }
    else if (index === 4) {
      this.setState({ placeholder: 'Search by Subject' });
    }
    else if (index === 5) {
      this.setState({ placeholder: 'Search by Program' });
    }
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  // Uses our backend api to fetch tutors from our database
  getDataFromDb = () => {
    fetch('/api/getTutors')
      .then((data) => data.json())
      .then((res) => {
        this.setState({ data: res.data, filteredData: res.data });});
  }

  checkSession = () => {
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          this.setState({
            user_id: res.userInfo._id,
            connectedTutors: res.userInfo.tutors
          });
        }
        this.getDataFromDb();
      })
      .catch(err => console.log(err));
  };

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

        switch (this.state.selectedIndex) {
          default:
          case 0: tutor.subjects.forEach(function (entry) {
            currentValue += (entry + " ").toLowerCase()
          });
            currentValue += (tutor.first_name + " " + tutor.last_name
              + " " + tutor.school + " " + tutor.program_of_study).toLowerCase()
            break;
          case 1: // name
            currentValue = (tutor.first_name + " " + tutor.last_name).toLowerCase()
            break;
          case 2: // school
            currentValue = (tutor.school).toLowerCase()
            break;
          case 3: // courses
          case 4: // subjects
            tutor.subjects.forEach(function (entry) {
              currentValue += (entry + " ").toLowerCase()
            });
            break;
          case 5: // program
            currentValue = (tutor.program_of_study).toLowerCase()
            break;
        }

        // If all search terms are found for the tutor, he/she is included 
        filters.forEach(function (entry) {
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
    const { anchorEl } = this.state;
    const { selectedIndex } = this.state;
    return (
      <React.Fragment>

        <main>
          {/* Hero unit */}
          <DashBoardNavBar />
          <div className={classes.heroContent}>
            <Container className={classes.container}>
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
                    testid="searchfilter"
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
                {filteredData.map((tutor, i) => (
                  <TutorCard
                    key={i}
                    tutor={tutor}
                    user_id= {this.state.user_id}
                    connectedTutors= {this.state.connectedTutors}
                  />
                ))}
              </Grid>
            </Container>
          </div>
        </main>
        {/* Footer */}
        <Footer />
        {/* End footer */}
      </React.Fragment>
    );
  }
} // End of component

export default withStyles(tutifyStyle.styles, { withTheme: true })(SearchTutors);