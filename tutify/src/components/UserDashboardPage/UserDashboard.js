import React from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import Grid from '@material-ui/core/Grid';
import Notifications from './Notifications';
import * as UserDashboardStyles from '../../styles/UserDashboard-styles';
import { withStyles } from "@material-ui/core/styles";
import Sidebar from '../ProfilePage/StudentSidebar';
import Drawer from "@material-ui/core/Drawer";
import MyCourseList from "./MyCourseList";
import VisibleTodoList from '../../redux/containers/VisibleTodoList'

class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            todos: [],
            tutors: []
        };
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
                        Toggle: true, 
                        _id: res.userInfo._id, 
                        todos: res.userInfo.todos, 
                        tutors: res.userInfo.tutors,
                        notifications: res.userInfo.notifications 
                    });
                    this.getDataFromDb()
                }
                else {
                    this.setState({ Toggle: false });
                }
            })
            .catch(err => console.log(err));
    };

    getDataFromDb = () => {
        fetch('http://localhost:3001/api/getUserCourses', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(res => {
                this.setState({ courses: res.data });

            })
            .catch(err => console.log(err));
    }

    render() {
        const { classes } = this.props;
        const { courses, tutors, todos, _id, notifications } = this.state;

        return (
            <React.Fragment>
                <NavBar />
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
                            <Notifications notifications={notifications} />
                        </Grid>
                        <Grid item xs={4} sm={6} className={classes.gridItem}>
                            <VisibleTodoList sessionTodos={todos} _id={_id}/>
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