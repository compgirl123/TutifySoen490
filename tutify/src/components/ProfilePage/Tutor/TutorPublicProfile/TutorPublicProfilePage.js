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
            courses: [],
            subjects: [],
            tutor: {},
            profilePicture: ""
        };
        this.getImg = this.getImg.bind(this);
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
              tutor: res.data.tutor,
              courses: res.data.tutor.courses,
              subjects: res.data.tutor.subjects
            });
            console.info("Successfully fetched the specific tutor's information");
            this.getImg();
          })
            .catch(err => console.error("Could not get the tutor's information from the database: "+err));
    }

    // Fetches the profile image file from our database
    getImg() {
        axios.get('/api/getPicture/' + this.state.tutor.uploadedPicture.imgData)
            .then((res) => {
                this.setState({
                    profilePicture: res.data.data
                });
            }, (error) => {
                console.error("Could not get uploaded profile image from database (API call error) " + error);
            });
    }

    render() {
        const { classes } = this.props;
        const { tutor, courses, subjects, profilePicture } = this.state;

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
                                        <TutorInfo tutor={tutor} profilePicture={profilePicture} />
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid >
                                        <Paper>
                                            <TutorCourses courses={courses} />
                                        </Paper><br />
                                        <Paper>
                                            <TutorSubjects subjects={subjects} />
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