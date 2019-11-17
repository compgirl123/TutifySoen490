import React from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import Grid from '@material-ui/core/Grid';
import * as CourseViewStyles from '../../styles/CourseView-styles';
import { withStyles } from "@material-ui/core/styles";
import CourseStudents from "./CourseStudents";
import UploadDoc from "./UploadDoc";
import Drawer from "@material-ui/core/Drawer";
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

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
                <NavBar />
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                >
                    <div className={classes.toolbar} />
                </Drawer>

                <main className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9} className={classes.gridItem}>
                            <CourseStudents />
                        </Grid>
                    </Grid>
                    <p></p>
                    <Grid container>
                        <Grid item xs={12} className={classes.gridItem}>
                            <UploadDoc/>
                        </Grid>
                    </Grid>
                    <Footer />
                </main>
            </React.Fragment>
        );
    }
}


export default withStyles(CourseViewStyles.styles, { withTheme: true })(TutorCourseView);