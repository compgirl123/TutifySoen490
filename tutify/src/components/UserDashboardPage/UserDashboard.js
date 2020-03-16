import React from 'react';
import DashBoardNavBar from '../DashBoardNavBar';
import Footer from '../Footer';
import Grid from '@material-ui/core/Grid';
import Notifications from './Notification/Notifications';
import * as UserDashboardStyles from '../../styles/UserDashboard-styles';
import { withStyles } from "@material-ui/core/styles";
import Sidebar from '../ProfilePage/Student/StudentSidebar';
import Drawer from "@material-ui/core/Drawer";
import MyCourseList from "./MyCourseList";
import VisibleTodoList from '../../redux/containers/VisibleTodoList'
import axios from "axios";


class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            courses: [],
            todos: [],
            tutors: [],
            notifications: [],
            tutorImgs: []
        };
    }

    componentDidMount() {
        this.checkSession();
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
                        Toggle: true,
                        _id: res.userInfo._id,
                        todos: res.userInfo.todos,
                        tutors: res.userInfo.tutors,
                        notifications: res.userInfo.notifications
                    });
                    this.fetchTutorImages()
                    this.getCourses()
                }
                else {
                    this.setState({ Toggle: false });
                }
            })
            .catch(err => console.error(err));
    };


    // This function fetches the user's courses from the db
    getCourses = () => {
        fetch('/api/getUserCourses', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(res => {
                this.setState({ courses: res.data });

            })
            .catch(err => console.error(err));
    }

    // This function deletes a notif from the list both in the db and in the current state
    updateNotificationList = (notif_id) => {
        axios.post('/api/deleteNotification', {
            student_id: this.state._id,
            notif_id: notif_id,
        })
            .then((res) => {
                this.setState({
                    notifications: res.data.notifications
                });
            }, (error) => {
                console.log(error);
            });
    }

    // fetch the tutor's profile images
    fetchTutorImages = () => {
        let tutorIds = []; // array for tutor ids
        var tutorImgsTemp = []; // array for tutor ids + image data

        // Get a list of all the tutors who sent notifications
        this.state.notifications.forEach(notif => {
            if(!(tutorIds.includes(notif.tutorid))) {
                tutorIds.push(notif.tutorid)
            }
        });

        let promise = Promise.resolve(); 
        // for each tutor id found, fetch their profile picture     
        tutorIds.forEach(id => {
          promise = axios.get('/api/getTutorPicture/' + id)
          .then((res) => {        
            tutorImgsTemp.push({
                    id:   id,
                    value: res.data.data
                });  
          }, (error) => {
            console.error("Could not get uploaded profile image from database (API call error) " + error);
          });
        });
        
        promise.then(() => {
          // now all our images have been saved
          this.setState({ tutorImgs: tutorImgsTemp });
        })
    }

    render() {
        const { classes } = this.props;
        const { courses, tutors, todos, notifications, _id, tutorImgs } = this.state;

        return (
            <React.Fragment>
                <DashBoardNavBar location="dashboard" />
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                >
                    <div className={classes.toolbar} />
                    <Sidebar tutors={tutors} />
                </Drawer>
                <main className={classes.root}>
                    <Grid container className={classes.container}>
                        <Grid item sm={6} className={classes.gridItem}>
                            <Notifications
                                tutorImgs={tutorImgs}
                                notifications={notifications}
                                updateNotificationList={this.updateNotificationList}
                            />
                        </Grid>
                        <Grid item xs={4} sm={6} className={classes.gridItem}>
                            <VisibleTodoList sessionTodos={todos} _id={_id} />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.container}>
                        <Grid item xs={6} sm={6} className={classes.gridItem}>
                            <MyCourseList courses={courses} />
                        </Grid>

                    </Grid>
                    <Footer />
                </main>
            </React.Fragment>
        );
    }
}

export default withStyles(UserDashboardStyles.styles, { withTheme: true })(UserDashboard);