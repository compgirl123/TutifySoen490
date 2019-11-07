import React from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import Grid from '@material-ui/core/Grid';
import Notifications from './Notifications';
import * as UserDashboardStyles from '../../styles/UserDashboard/UserDashboard-styles';
import { withStyles } from "@material-ui/core/styles";
import { Sidebar } from '../profilePage/StudentSidebar';
import Drawer from "@material-ui/core/Drawer";
import MyCourseList from "./MyCourseList";
import ToDoList from "./ToDoList/ToDoList";

class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            todos: []
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
                    this.setState({ Toggle: true, todos: res.userInfo.todos  });
                    this.getDataFromDb()
                }
                else {
                    this.setState({ Toggle: false });
                }
            })
            .catch(err => console.log(err));
    };

    // Uses our backend api to fetch the courses from our database
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
        const { courses, todos } = this.state;

        return (
            <React.Fragment>
                <NavBar />
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                >
                    <div className={classes.toolbar} />
                    <Sidebar />
                </Drawer>
                <main className={classes.root}>
                    <Grid container>
                        <Grid item sm={6} className={classes.gridItem}>
                            <Notifications />
                        </Grid>
                        <Grid item sm={6} className={classes.gridItem}>
                            <ToDoList todos={todos} />
                        </Grid>
                    </Grid>
                    <Grid container>
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