import React, { Component } from 'react';
import * as tutifyStyle from '../../../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from "../../../Footer";
import NavBar from "../../../NavBar";
import TutorInfo from './TutorInfo';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import 'react-sharingbuttons/dist/main.css';
import TutorCourses from './TutorCourses';
import TutorSubjects from './TutorSubjects';

export class TutorPublicProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tutors: [],
            courses: [],
            students: [],
            open: false,
            tutor: "",
        };
    }
    toggleDrawer = booleanValue => () => {
        this.setState({
            drawerOpened: booleanValue
        });
    };

    componentDidMount() {
        this.getTutor()
    }

    //getting the tutor from the id passed in the path
    getTutor = () => {
        const { match: { params } } = this.props;

        axios.get('/api/getTutor', {
            params: {
              ID: params.id
            }
          }).then((res) => {
            this.setState({
              tutor: res.data.tutor

            });
            console.info("Successfully fetched the specific tutor's information");
          })
            .catch(err => console.error("Could not get the tutor's information from the database: "+err));
    }


    //this method uses the backend API to find a student's courses
    getUserCourses = () => {
        console.info("Fetching student courses from db...");
        fetch('/api/getUserCourses', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(res => {
                this.setState({ courses: res.data });
            })
            .catch(err =>
                console.error("Could not get courses from database (API call error) " + err));
    };


    render() {
        const { classes } = this.props;
        const { tutor } = this.state;

        return (
            <React.Fragment>
                <main>
                    <NavBar />
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Container maxWidth="lg" className={classes.container}>
                            <Grid container spacing={4}>
                                <Grid item xs={4}>
                                    <Card>
                                        <TutorInfo tutor={tutor} />
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid >
                                        <Paper>
                                            <TutorCourses courses={this.state.courses} />
                                        </Paper><br />
                                        <Paper>
                                            <TutorSubjects tutor={tutor} />
                                        </Paper>
                                    </Grid>
                                    <br />
                                    <Grid >
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Container>
                        <Footer />
                    </main>
                </main>
            </React.Fragment>
        );

    }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorPublicProfilePage);