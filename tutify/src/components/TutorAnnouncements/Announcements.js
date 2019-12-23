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
import axios from 'axios';
import swal from 'sweetalert';

const options = [
    'All',
    'Course',
    'Student',
];

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
                        {props.courses.map(value => {
                            const labelId = `checkbox-list-label-${value.course.name}`
                            return (
                                <ListItem key={value.course.name} role={undefined} dense button >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value.course.name} />
                                </ListItem>
                            );
                        })}
                    </List>
                </TableRow>
            </TableBody>
        </Table>
    </Paper>);
}

function ShowStudents(props) {
    if (!props.show) {
        return '';
    }
    return (<Paper>
        <Table stickyHeader aria-label="">
            <TableHead>
                <TableRow>
                    <TableCell><Typography variant="h6">Students</Typography></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <List>
                        {props.students.map(value => {
                            const Name = `${value.first_name + " " + value.last_name}`
                            const labelId = `checkbox-list-label-${Name}`
                            return (
                                <ListItem key={labelId} role={undefined} dense button >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={Name} />
                                </ListItem>
                            );
                        })}
                    </List>
                </TableRow>
            </TableBody>
        </Table>
    </Paper>);
}

// Tutor views all of the documents uploaded for each individual course
class Announcements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCoursesSelected: false,
            isStudentsSelected: false,
            drawerOpened: false,
            placeholder: 'Send to...',
            showDropDown: false,
            selectedIndex: 0,
            anchorEl: null,
            tutor_id: null,
            checked: 1,
            courses: [],
            students: [],
            aTitle: "",
            aText:""
        };
        this.handleClickMenu = this.handleClickMenu.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleFieldChange = this.handleTitleFieldChange.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
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
            this.setState({ isCoursesSelected: false, isStudentsSelected: false })
        }
        else if (index === 1) {
            this.setState({ placeholder: 'Course' });
            this.setState({ isCoursesSelected: true, isStudentsSelected: false });
        }
        else if (index === 2) {
            this.setState({ placeholder: 'Student' });
            this.setState({ isCoursesSelected: false, isStudentsSelected: true })
        }
    };

    handleTitleFieldChange = (e) => {
        this.setState({ aTitle: e.target.value});
    };

    handleTextFieldChange = (e) => {
        this.setState({ aText: e.target.value });
    };

    handleSubmit(event) {
        axios.post('http://localhost:3001/api/sendAnnouncementStudents', {
            students: ["5dc8735ebb22af5ae4ca23e6"],
            announcement: {
                title: this.state.aTitle,
                text: this.state.aText,
                tutorImg: this.state.tutorImg,
                tutorName: this.state.tutorName,
                tutorid: this.state.tutor_id
            }
        })
            .then((res) => {
                swal("Announcement sent!", "", "success")
                    .then((value) => {
                       window.location = "/Announcements";
                    });
            }, (error) => {
                swal("Something went wrong...", "", "error")
                    .then((value) => {
                        console.log(error);
                    });
            })
        event.preventDefault();
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
                    this.setState({ 
                        tutor_id: res.userInfo._id, 
                        students: res.userInfo.students, 
                        tutorName:  res.userInfo.first_name + " " + res.userInfo.last_name,
                        tutorImg: res.userInfo.picture
                    });
                    this.getCourses()
                }

            })
            .catch(err => console.log(err));
    };

    getStudents = () => {
        axios.post('http://localhost:3001/api/findStudents', {
            students: this.state.students
        })
            .then((res) => {
                this.setState({ students: res.data.data });
            }, (error) => {
                console.log(error);
            })
    };

    // Uses our backend api to fetch the tutor's courses from our database
    getCourses = () => {
        fetch('http://localhost:3001/api/getTutorCourses', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(res => {
                this.setState({ courses: res.data });
                this.getStudents()
            })
            .catch(err => console.log(err));
    }

    render() {
        const { classes } = this.props;
        const { anchorEl, selectedIndex, courses, students } = this.state;

        return (
            <React.Fragment>
                <main>
                    <TutorDashBoardNavBar />
                    <Container className={classes.container}>
                        <form onSubmit={this.handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={10}>
                                    <TextField id="outlined-basic"
                                        required
                                        label="Announcement Title"
                                        variant="outlined"
                                        className={classes.announcementTitle} 
                                        value={this.state.aTitle}
                                        onChange={this.handleTitleFieldChange}
                                    />
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
                                        value={this.state.aText}
                                        onChange={this.handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClickMenu} variant="outlined">
                                        {this.state.placeholder}
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
                                </Grid>
                                <Grid item >
                                    <Button type="submit" className={classes.submitButton} aria-controls="simple-menu" aria-haspopup="true" variant="outlined">
                                        Submit
                                    </Button>
                                </Grid>
                                <Grid item sm={6}>
                                    <ShowCourses show={this.state.isCoursesSelected} courses={courses} />
                                    <ShowStudents show={this.state.isStudentsSelected} students={students} />
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