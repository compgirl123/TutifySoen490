import React from "react";
import Typography from "@material-ui/core/Typography";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from "../Footer";
import DashBoardNavBar from "./DashBoardNavBar";
import UserInfo from './UserInfo';
import TutorInfo from '../TutorProfile/TutorInfo'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

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
              <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                My Profile
              </Typography>
              <Grid container spacing={4}>

                {/* User Info */}
                <Grid item xs={5}>
                  <Card>
                  {this.state.__t === "tutor" ? 
                 <TutorInfo/>
                 :
                <UserInfo /> }
                  </Card>
                 
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  {/* Adding Picture */}
                  {this.state.__t === "tutor"
                    ? <img src={this.state.tutorPicture} alt="Profile" width="225" height="225">
                    </img>
                    : this.state.__t === "student"
                      ? <img src={"https://i.imgur.com/L6lDhbz.jpg"} alt="Profile" width="225" height="225">
                      </img>
                      :
                      <p></p>
                  }
      </Grid>
              </Grid>
            </Container>
            <main>
              {/* Hero unit */}

            </main>
            <Footer />

          </main>

        </main>
      </React.Fragment>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(ProfilePage);