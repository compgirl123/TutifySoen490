import React from "react";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from "../Footer";
import DashBoardNavBar from "./DashBoardNavBar";
import UserInfo from './UserInfo';
import Card from '@material-ui/core/Card';
import UserCoursesInfo from './UserCoursesInfo';
import UserTutorsInfo from './UserTutorsInfo';
import Paper from '@material-ui/core/Paper';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      tutorPicture: "",
      __t: ""
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
          this.setState({ Toggle: true });
          this.setState({ tutorPicture: res.userInfo.picture, __t: res.userInfo.__t });
        }
        else {
          this.setState({ Toggle: false });
        }
      })
      .catch(err => console.log(err));
  
	 };
	handleChange(event) {
    fetch('http://localhost:3001/api/logout', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
	  this.setState({ Toggle: false });
 })
 .catch(err => console.log(err));
 };
 render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <main>
          <DashBoardNavBar />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              
              <Grid container spacing={4}>
​
                {/* User Info */}
                <Grid item xs={4}>
                  <Card>
                <UserInfo /> 
                  </Card>
                  </Grid>

                  <Grid item xs = {6}>
       <Grid >
         <Paper>
           <UserCoursesInfo />
         </Paper>
         </Grid>
         <br />
         <Grid >
         <Paper>
           <UserTutorsInfo />
         </Paper>
         </Grid>
       </Grid>
                
              </Grid>
            </Container>
            <main>
              {/* Hero unit */}
​
            </main>
            <Footer />
​
          </main>
​
        </main>
      </React.Fragment>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(ProfilePage);