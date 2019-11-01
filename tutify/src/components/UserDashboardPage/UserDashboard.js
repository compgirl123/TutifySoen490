import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from '../NavBar';
import Footer from '../Footer';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Notifications from './Notifications';
import * as UserDashboardStyles from '../../styles/UserDashboard/UserDashboard-styles';
import { withStyles } from "@material-ui/core/styles";

class UserDashboard extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <NavBar />
                <Container className={classes.root}>
                    <Grid spacing={3}>
                        <Grid item spacing={6}>
                            <Notifications/>
                        </Grid>
                    </Grid>
                </Container>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default withStyles(UserDashboardStyles.styles, { withTheme: true })(UserDashboard);