import React from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import Grid from '@material-ui/core/Grid';
import * as CourseViewStyles from '../../styles/CourseView-styles';
import { withStyles } from "@material-ui/core/styles";
import ContactTutor from "./ContactTutor";
import Documents from "./Documents";
import Drawer from "@material-ui/core/Drawer";

class ViewCourse extends React.Component {
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
                    <Grid container>
                        <Grid item sm={6} className={classes.gridItem}>
                            <ContactTutor />
                        </Grid>
                        <Grid item sm={6} className={classes.gridItem}>
                            <Documents/>
                        </Grid>
                    </Grid>
                    <Footer />
                </main>
            </React.Fragment>
        );
    }
}

export default withStyles(CourseViewStyles.styles, { withTheme: true })(ViewCourse);

