import React from 'react';
import Footer from '../Footer';
import TutorDashBoardNavBar from '../TutorProfile/TutorDashboardNavBar';
import { Grid, TextField, Container, ListItem, } from '@material-ui/core';
import * as TutorAnnouncementsStyles from '../../styles/TutorAnnouncements-styles';
import { withStyles } from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

function ShowCourses(props) {
    if (!props.show) {
        return '';
    }
    return (<Paper>
        <Table stickyHeader aria-label="">
            <TableHead>
                <TableRow>
                    <TableCell><Typography variant="h6">Courses</Typography></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <List>
                        {courses.map(value => {
                            const labelId = `checkbox-list-label-${value}`
                            return (
                                <ListItem key={value} role={undefined} dense button >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value} />
                                </ListItem>
                            );
                        })}
                    </List>
                </TableRow>
            </TableBody>
        </Table>
    </Paper>);
}
const options = [
    'All',
    'Course',
    'Student',
];

const courses = [
    'MATH101',
    'MATH102',
    'MATH103',
];


// Tutor views all of the documents uploaded for each individual course
class Announcements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCoursesSelected: false,
            drawerOpened: false,
            data: [],
            filteredData: [],
            placeholder: 'Send to',
            showDropDown: false,
            selectedIndex: 0,
            anchorEl: null,
            user_id: null,
            checked: 1,
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
            this.setState({ placeholder: 'All' });
            this.setState({ isCoursesSelected: false })
        }
        else if (index === 1) {
            this.setState({ placeholder: 'Course' });
            this.setState({ isCoursesSelected: true });
        }
        else if (index === 2) {
            this.setState({ placeholder: 'Student' });
            this.setState({ isCoursesSelected: false })
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
                                    <ShowCourses show={this.state.isCoursesSelected} />
                                    <Button className={classes.submitButton} aria-controls="simple-menu" aria-haspopup="true" variant="outlined">
                                        Submit
                                    </Button>
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