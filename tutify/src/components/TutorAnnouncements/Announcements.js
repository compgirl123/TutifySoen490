import React from 'react';
import Footer from '../Footer';
import TutorDashBoardNavBar from '../TutorProfile/TutorDashboardNavBar';
import { Grid, TextField, Container, } from '@material-ui/core';
import * as TutorAnnouncementsStyles from '../../styles/TutorAnnouncements-styles';
import { withStyles } from "@material-ui/core/styles";

// Tutor views all of the documents uploaded for each individual course
class Announcements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpened: false,

        };
    }

    toggleDrawer = booleanValue => () => {
        this.setState({
            drawerOpened: booleanValue
        });
    };


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