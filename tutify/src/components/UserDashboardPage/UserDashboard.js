import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from '../NavBar';
import Footer from '../Footer';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Notifications from './Notifications';
import * as UserDashboardStyles from '../../styles/UserDashboard/UserDashboard-styles';
import { withStyles } from "@material-ui/core/styles";
import { Sidebar } from '../profilePage/StudentSidebar';
import Drawer from "@material-ui/core/Drawer";
class UserDashboard extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <NavBar/>
                <Drawer
                className={classes.drawer}
                variant="permanent"
                >
                    <div className={classes.toolbar}/>

                    
                    <Sidebar/>
                </Drawer>
                <main>
                <Container className={classes.root}>
                    <Grid spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Notifications/>
                        </Grid>
                    </Grid>
                </Container>
                </main>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default withStyles(UserDashboardStyles.styles, { withTheme: true })(UserDashboard);