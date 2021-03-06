import React from "react";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from "../Footer";
import DashBoardNavBar from "../DashBoardNavBar";
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import swal from 'sweetalert';
import 'react-sharingbuttons/dist/main.css';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import HelpIcon from '@material-ui/icons/Help';
import LockIcon from '@material-ui/icons/Lock';

export class TrophiesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: "",
      openAboutPage: false,
      open: false,
      totalPoints: "",
      levelPoints: "",
      badges1: [],
      dialogBoxFileName: "",
      dialogBoxfinalFile: "",
      dialogBoxBadgePoints: 100,
      dialogBoxDescription: "",
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
    this.setState({ open: false, openAboutPage: false });
  };

  //this function unlocks a badge
  Unlock = () => {
    swal({
      title: "Are you sure you want to unlock this badge?",
      icon: "warning",
      buttons: [true, "Yes"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          var totalPoints = this.state.totalPoints - this.state.dialogBoxBadgePoints;
          //unlock badge backend
          console.info("Unlocking badge...");
          axios.post('/api/unlockBadge', {
            student_id: this.state.id,
            badge_id: this.state.badge_id,
            totalPoints: totalPoints,
          })
            .then(res => {
              console.info("Badge unlocked...");
              swal("Congratulations!", "You successfully unlocked the " + this.state.dialogBoxFileName, "success")
                .then((value) => {
                  window.location = "/trophies";
                });
              this.setState({ open: false })
              this.checkSession();
            })
            .catch(err => console.error("Badge could not be unlocked: " + err));
        }
      });
  }

  //this method gets all badges from the backend
  getBadges = () => {
    console.info("Getting badges from db...");
    axios.get('/api/getBadges')
      .then((res) => {
        var allBadges = [];
        var badges1 = [];
        var badges2 = [];
        var bag1 = [];
        //combine two arrays into one
        for (var i = 0; i < 8; i++) {
          for (var j = 0; j < 8; j++) {
            if (this.state.discriminator[j].badgeId === res.data.data[i].badge._id) {
              bag1 = this.state.discriminator[j];
              allBadges.push({ label: res.data.data[i], value: bag1 });
            }
          }
        }
        allBadges.sort(function (a, b) {
          return (a.label.badge.badgePoints < b.label.badge.badgePoints) ? -1 : 1;
        });
        //splitting 8 badges into two arrays of 4 badges each
        for (var k = 0; k < 4; k++) {
          badges1.push(allBadges[k]);
          badges2.push(allBadges[k + 4]);
        }
        this.setState({
          badges1: badges1, badges2: badges2, badges: allBadges, dialogBoxFileName: res.data.data[0].badge.imageName,
          dialogBoxfinalFile: res.data.data[0].finalFile, dialogBoxBadgePoints: res.data.data[0].badge.badgePoints,
        });
      }, (error) => {
        console.error("Could not get badges from database (API call error) " + error);
      });
  }

  //this function handles the opening of a dialog box
  handleClickOpen = (id) => {
    var badge2 = [];
    this.state.badges.forEach(function (badge) {
      if (badge.label.badge._id === id) {
        badge2 = badge;
      }
    });

    this.setState({
      open: true, dialogBoxFileName: badge2.label.badge.imageName, dialogBoxfinalFile: badge2.label.finalFile,
      dialogBoxBadgePoints: badge2.label.badge.badgePoints, badge_id: id, dialogBoxenable: badge2.value.enable,
      dialogBoxDescription: badge2.label.badge.description
    });
  };

  explainBadgeSystem = () => {
    this.setState({ openAboutPage: true });
  }

  render() {
    const { classes } = this.props;
    const { open, openAboutPage } = this.state;
    const value = this.state.levelPoints % 200;
    const level = Math.ceil(this.state.levelPoints / 200);
    const percentage = (value / 200)*100;


    return (
      <React.Fragment>
        <main>
          <DashBoardNavBar />
          <main>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={4}>
                {/* User Info */}
                <Grid item xs={3} align="center">
                  <Typography variant="h1" className={classes.levelHeading}>
                    Level {level}
                  </Typography>
                  <Typography variant="h1" className={classes.levelHeading2}>
                    Level {level}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={6} >
                  <Button variant="outlined" size="large" className={classes.totalPoints} >Total Points: {this.state.totalPoints}</Button>
                  <Button size="large" className={classes.buttonBadges} onClick={() => { this.explainBadgeSystem(); }}>
                    <HelpIcon fontSize="large" />
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                {/* User Info */}
                <Grid item xs={3} align="center">
                  <CircularProgressbar value={percentage} text={`${value} Points`} styles={buildStyles({
                    textColor: 'gray',
                    pathColor: 'rgba(0,200,83,1)',
                    textSize: "13px",
                  })} className={classes.CircularProgressbar} />
                </Grid>
                <Grid item xs={1}>
                </Grid>
                {this.state.badges1.map(badge => (
                  <Grid item xs={6} md={2} className={classes.badgeGrid}>
                    <Grid>
                      {badge.value.enable === 1 ?
                        <Button variant="outlined" className={classes.badgeButton1} onClick={() => { this.handleClickOpen(badge.label.badge._id); }}>
                          <Avatar variant="rounded" src={badge.label.finalFile} className={classes.avatarBadgeEnabled} />
                        </Button>
                        :
                        <Button variant="outlined" className={classes.badgeButtonDisabled} onClick={() => { this.handleClickOpen(badge.label.badge._id); }}>
                          <Avatar variant="rounded" src={badge.label.finalFile} className={classes.avatarBadgeDisabled} />
                          <LockIcon fontSize="small" className={classes.lockIcon} />
                        </Button>
                      }
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid container spacing={4}>
                {/* User Info */}
                <Grid item xs={3} align="center">
                  <Button variant="outlined" size="large" className={classes.levelButton} >Level {level} Completion: 200 Points</Button>
                </Grid>
                <Grid item xs={1}>
                </Grid>
                {this.state.badges2.map(badge => (
                  <Grid item xs={6} md={2} className={classes.badgeGrid}>
                    <Grid>
                      {badge.value.enable === 1 ?
                        <Button variant="outlined" className={classes.badgeButton2} onClick={() => { this.handleClickOpen(badge.label.badge._id); }}>
                          <Avatar variant="rounded" src={badge.label.finalFile} className={classes.avatarBadgeEnabled} />
                        </Button>
                        :
                        <Button variant="outlined" className={classes.badgeButtonDisabled2} onClick={() => { this.handleClickOpen(badge.label.badge._id); }}>
                          <Avatar variant="rounded" src={badge.label.finalFile} className={classes.avatarBadgeDisabled} />
                          <LockIcon fontSize="small" className={classes.lockIcon} />
                        </Button>
                      }
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Container>
            <main>
              {/* Hero unit */}
            </main>
            <Footer />
          </main>
          <div  >
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}
              align="center" maxWidth="xl">
              <div style={{ width: 500 }}>
                <DialogTitle align="center">{this.state.dialogBoxFileName}</DialogTitle>
                <DialogContent align="center">
                  <Avatar variant="rounded" src={this.state.dialogBoxfinalFile} className={classes.avatarDialogBox} />
                </DialogContent>
                <DialogContent>
                  <DialogContentText>
                    {this.state.dialogBoxDescription}
                  </DialogContentText>
                </DialogContent>
                <DialogContent>
                  <Button variant="outlined" size="large" className={classes.dialogBoxBadgePoints} >Points: {this.state.dialogBoxBadgePoints}</Button>
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
                      (this.state.dialogBoxenable === 0) ?
                        <DialogActions>
                          <Button variant="contained" onClick={() => this.Unlock()} disabled>Unlock</Button>
                        </DialogActions>
                        :
                        <DialogActions>
                        </DialogActions>
                    }
                  </Grid>
                </Grid>
              </div>
            </Dialog>
          </div>
          <div>
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={openAboutPage}
              align="center" maxWidth="xl">
              <div style={{ width: 500 }}>
                <DialogTitle align="center" className={classes.dialogTitle} >Badge System</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Welcome to your badge collection!
                  </DialogContentText>
                  <DialogContentText>
                    To unlock a badge you need a certain number of points.
                  </DialogContentText>
                  <DialogContentText>
                    These points can be earned by completing the quizzes assigned by your tutor.
                  </DialogContentText>
                  <DialogContentText>
                    Each quiz will be assigned points as determined by your tutor.
                  </DialogContentText>
                  <DialogContentText className={classes.dialogText}>
                    Good Luck!
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
                </Grid>
              </div>
            </Dialog>
          </div>
        </main>
      </React.Fragment>
    );

  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(TrophiesView);