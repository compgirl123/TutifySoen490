import React from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Notifications from './Notifications';
import * as UserDashboardStyles from '../../styles/UserDashboard/UserDashboard-styles';
import { withStyles } from "@material-ui/core/styles";
import { Sidebar } from '../profilePage/StudentSidebar';
import Drawer from "@material-ui/core/Drawer";
import MyCourseList from "./MyCourseList";
import ToDoList from "./ToDoList/ToDoList";
class UserDashboard extends React.Component {
    render() {
        const { classes } = this.props;
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
                <main >
                    <Container className={classes.root}>
                        <Grid item xs={4} sm={6} className={classes.gridItem}>
                            <Notifications />
                        </Grid>
                        <Grid item xs={4} sm={6} className={classes.gridItem}>
                            <MyCourseList />
                        </Grid>
                        <Grid item xs={4} sm={6} className={classes.gridItem}>
                            <ToDoList />
                        </Grid>
                    </Container>
                </main>
                <Footer />
            </React.Fragment>
        );
    }
}

export default withStyles(UserDashboardStyles.styles, { withTheme: true })(UserDashboard);