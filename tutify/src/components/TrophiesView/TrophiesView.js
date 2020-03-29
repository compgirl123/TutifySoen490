import React from "react";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from "../Footer";
import DashBoardNavBar from "../DashBoardNavBar";
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Drawer from "@material-ui/core/Drawer";
import Avatar from '@material-ui/core/Avatar';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import axios from 'axios';
import swal from 'sweetalert';
import 'react-sharingbuttons/dist/main.css';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from "@material-ui/core/Button";
import ShareIcon from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import HelpIcon from '@material-ui/icons/Help';
import { confetti } from 'dom-confetti';

class TrophiesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: "",
      open: false,
      totalPoints: "",
      levelPoints: "",
      badges1: [],
      dialogBoxFileName: "",
      dialogBoxfinalFile: "",
      dialogBoxBadgePoints: 100,
      badges2: [],
      badges: [],
      id: "",
      badge_id: "",
      discriminator: [],
      dialogBoxenable: 0
    };
    this.getBadges = this.getBadges.bind(this);
    this.Unlock = this.Unlock.bind(this);

  }
  toggleDrawer = booleanValue => () => {
    this.setState({
      drawerOpened: booleanValue
    });
  };

  componentWillMount() {
    this.checkSession();

    this.getBadges();

  }

 

  checkSession = () => {
    console.info("Fetching session...");
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        this.setState({
          id: res.userInfo._id,
          level: res.userInfo.level,
          totalPoints: res.userInfo.totalPoints,
          levelPoints: res.userInfo.levelPoints,
          discriminator: res.userInfo.badgeDiscriminator
        });
      })
      .catch(err => console.error("Session could not be checked: " + err));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  

  

  

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const percentage = this.state.levelPoints;
    

    return (
      <React.Fragment>

        <main>

          <DashBoardNavBar />
          <main className={classes.content}>

            <div className={classes.appBarSpacer} />

            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={4}>

                {/* User Info */}
                <Grid item xs={3} align="center">
                  <Typography variant="h1" className={classes.levelHeading}>
                    Level {this.state.level}
                  </Typography>
                  <Typography variant="h1" className={classes.levelHeading2}>
                    Level {this.state.level}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={6} >
                  <Button variant="outlined" size="large" className={classes.totalPoints} >Total Points: {this.state.totalPoints}</Button>
                  <Button size="large" className={classes.buttonBadges}>
                    <HelpIcon fontSize="large" />
                  </Button>

                </Grid>
              </Grid>

              
              
            </Container>
            <main>
              {/* Hero unit */}

            </main>
            <Footer />
          </main>
          <div>
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="lg">
              <DialogTitle align="center">{this.state.dialogBoxFileName}</DialogTitle>
              <DialogContent align="center">
                <Avatar variant="rounded" src={this.state.dialogBoxfinalFile} style={{ width: '150px', height: '150px' }} />
              </DialogContent>
              <DialogContent>

                <DialogContentText>
                </DialogContentText>
              </DialogContent>

              <Grid
                container
                direction="row-reverse"
                justify="space-between"
                alignItems="baseline"
              >
                <Grid item>
                  <DialogActions>
                    <Button onClick={this.handleClose}>Close</Button>
                  </DialogActions>
                </Grid>
                <Grid item>
                  {(this.state.totalPoints >= this.state.dialogBoxBadgePoints)
                    ?
                    (this.state.dialogBoxenable === 0) ?
                      <DialogActions>
                        <Button variant="contained" onClick={() => this.Unlock()} >Unlock</Button>
                      </DialogActions>
                      :
                      <DialogActions>
                      </DialogActions>

                    :
                    <DialogActions>
                      <Button variant="contained" onClick={() => this.Unlock()} disabled>Unlock</Button>
                    </DialogActions>
                  }
                </Grid>

              </Grid>

            </Dialog>
          </div>
        </main>
      </React.Fragment>
    );

  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(TrophiesView);