import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import * as tutifyStyle from './ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Copyright from "../Copyright";
import DashBoardNavBar from "./DashBoardNavBar";


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false
    };
  }
  toggleDrawer = booleanValue => () => {
    this.setState({
      drawerOpened: booleanValue
    });
  };

  render() {
    const { classes } = this.props;

    return (
    <React.Fragment>
      <main>
        <DashBoardNavBar/>
       <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
               Courses Current Enrolled In:
        </Typography>
          <Grid container spacing={2}>

            {/* Payment Info */}
            <Grid item xs={4} md={4} lg={4}>
            <Paper className={classes.fixedHeightPaper}>           
            <Typography>
            <img src="https://i.imgur.com/L6lDhbz.jpg"  alt="Subject">
             </img>
             <br/>
                       <h3>Tutor Name: Mo Alawami</h3> 
                       <h3>Subject : CHEM 204</h3> 
                       <Button fullWidth variant="contained">View Course Material </Button> 
                        <br/>
                      </Typography>
            </Paper>
          </Grid>
          </Grid>
        </Container>
        <main>
        {/* Hero unit */}
      
        
      </main>
        {/* Footer */}
        <footer className={classes.footer}>
    <Typography variant="h6" align="center" gutterBottom>
      Tutify
    </Typography>
    <Copyright />
  </footer>

      </main>

        
      </main>
    </React.Fragment>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(ProfilePage );