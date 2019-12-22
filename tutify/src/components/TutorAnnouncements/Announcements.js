import React from 'react';
import Footer from '../Footer';
import TutorDashBoardNavBar from '../TutorProfile/TutorDashboardNavBar';
import { Grid, TextField, Container, } from '@material-ui/core';
import * as TutorAnnouncementsStyles from '../../styles/TutorAnnouncements-styles';
import { withStyles } from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const options = [
    'All',
    'Course',
    'Student',
];

// Tutor views all of the documents uploaded for each individual course
class Announcements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpened: false,
            data: [],
            filteredData: [],
            placeholder: 'Send to',
            showDropDown: false,
            selectedIndex: 0,
            anchorEl: null,
            user_id: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClickMenu = this.handleClickMenu.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
    }

    toggleDrawer = booleanValue => () => {
        this.setState({
            drawerOpened: booleanValue
        });
    };

    handleCloseMenu = () => {
        this.setState({ anchorEl: null });
    };

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
                    this.getDataFromDb()
                }

            })
            .catch(err => console.log(err));
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const { selectedIndex } = this.state;
        return (
            <React.Fragment>
                <main>
                    <TutorDashBoardNavBar />
                    <Container className={classes.container}>
                        <form>
                            <Grid container spacing={3} direction="column">
                                <Grid item xs={10}>
                                    <TextField id="outlined-basic"
                                        required
                                        label="Announcement Title"
                                        variant="outlined"
                                        className={classes.announcementTitle} />
                                </Grid>
                                <Grid item xs={30}>
                                    <TextField
                                        className={classes.announcementText}
                                        required
                                        id="outlined-multiline-static"
                                        label="Announcement"
                                        multiline
                                        rows="6"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item>
                                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClickMenu} variant="outlined">
                                        Send to
                                    </Button>
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
                                    <Button className={classes.submitButton} aria-controls="simple-menu" aria-haspopup="true" variant="outlined">
                                        Submit
                                    </Button>
                                </Grid>
                                <Grid item>
                                    
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                    <Footer />

                </main>
            </React.Fragment>
        );
    }
}
export default withStyles(TutorAnnouncementsStyles.styles, { withTheme: true })(Announcements);