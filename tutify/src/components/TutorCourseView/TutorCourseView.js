import React from 'react';
import Footer from '../Footer';
import Grid from '@material-ui/core/Grid';
import * as CourseViewStyles from '../../styles/CourseView-styles';
import { withStyles } from "@material-ui/core/styles";
import CourseStudents from "./CourseStudents";
import UploadDoc from "./UploadDoc";
import TutorDashBoardNavBar from '../TutorProfile/TutorDashboardNavBar';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Tutor views all of the documents uploaded for each individual course
class TutorCourseView extends React.Component {
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
        fetch('/api/checkSession', {
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
            <Paper className={classes.paper}>
                <React.Fragment>
                <main>
                    <TutorDashBoardNavBar />
                    <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <div>

                    <Container maxWidth="lg" className={classes.container}>
                    <p></p>
                    <br/><br/><br/>
                    <Typography>Students</Typography><p></p>

                    <Grid container spacing={3}>
                        <Grid item xs={12} className={classes.gridItem}>
                            <CourseStudents />
                        </Grid>
                    </Grid>
                    <p></p>
                    <Typography>Documents Uploaded</Typography><p></p>
                    <Grid container>
                        <Grid item xs={12} className={classes.gridItem}>
                            <UploadDoc />
                        </Grid>
                    </Grid>

              </Container>
              </div>
                {/* Hero unit */}
              </main>
              {/* Footer */}
              <Footer />
            </main>
        </React.Fragment>
      </Paper>
        );
    }
}


export default withStyles(CourseViewStyles.styles, { withTheme: true })(TutorCourseView);