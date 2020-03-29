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
      dialogBoxDescription: "",
      dialogBoxPointsLeft: 0,
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

          axios.post('/api/unlockBadge', {
            student_id: this.state.id,
            badge_id: this.state.badge_id,
            totalPoints: totalPoints,
          })
            .then(res => {
              swal("Successfully unlocked badge", "", "success")
                .then((value) => {
                  window.location = "/trophies";
                });
              //celerbation confetti
              this.setState({ open: false })
              this.checkSession();
            })
            .catch(err => console.error("Session could not be checked: " + err));
        }
      });
  }
  

  getBadges = () => {
    axios.get('/api/getBadges')
      .then((res) => {
        var allBadges = [];
        var badges1 = [];
        var badges2 = [];
        var bag1 = [];
        for (var i = 0; i < 8; i++) {
          for (var j = 0; j < 8; j++) {
            if (this.state.discriminator[j].badgeId === res.data.data[i].badge._id) {
              bag1 = this.state.discriminator[j];
              allBadges.push({ label: res.data.data[i], value: bag1 });
            }
          }
        }

        for (var i = 0; i < 4; i++) {
          badges1.push(allBadges[i]);
          badges2.push(allBadges[i + 4]);
        }
        this.setState({
          badges1: badges1, badges2: badges2, badges: allBadges, dialogBoxFileName: res.data.data[0].badge.imageName,
          dialogBoxfinalFile: res.data.data[0].finalFile, dialogBoxBadgePoints: res.data.data[0].badge.badgePoints,
        });
      }, (error) => {
        console.error("Could not get uploaded profile image from database (API call error) " + error);
      });
  }


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

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const percentage = this.state.levelPoints;
    const value = (this.state.levelPoints / 200) * 100;
    //const button = document.querySelector(".hello")
    //if(button){
    //button.addEventListener("click", () => confetti(button))
    //}
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

              <Grid container spacing={4}>

                {/* User Info */}
                <Grid item xs={3} align="center">
                  <CircularProgressbar value={value} text={`${percentage} Points`} styles={buildStyles({
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
                          <Avatar variant="rounded" src={badge.label.finalFile} style={{ width: '100px', height: '100px' }} />
                        </Button>
                        :
                        <Button variant="outlined" className={classes.badgeButtonDisabled} onClick={() => { this.handleClickOpen(badge.label.badge._id); }}>
                          <Avatar variant="rounded" src={badge.label.finalFile} style={{ width: '100px', height: '100px' }} />
                        </Button>
                      }
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid container spacing={4}>

                {/* User Info */}
                <Grid item xs={3} align="center">
                  <Button variant="outlined" size="large" style={{ marginTop: "50px", fontWeight: "bold", fontSize: 20 }} >Level {this.state.level}: 200 Points</Button>
                </Grid>
                <Grid item xs={1}>
                </Grid>
                {this.state.badges2.map(badge => (
                  <Grid item xs={6} md={2} className={classes.badgeGrid}>
                    <Grid>

                      {badge.value.enable === 1 ?

                        <Button variant="outlined" className={classes.badgeButton2} onClick={() => { this.handleClickOpen(badge.label.badge._id); }}>
                          <Avatar variant="rounded" src={badge.label.finalFile} style={{ width: '100px', height: '100px' }} />
                        </Button>
                        :
                        <Button variant="outlined" className={classes.badgeButtonDisabled2} onClick={() => { this.handleClickOpen(badge.label.badge._id); }}>
                          <Avatar variant="rounded" src={badge.label.finalFile} style={{ width: '100px', height: '100px' }} />
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
          <div>
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="lg" align="center">
              <DialogTitle align="center">{this.state.dialogBoxFileName}</DialogTitle>
              <DialogContent align="center">
                <Avatar variant="rounded" src={this.state.dialogBoxfinalFile} style={{ width: '150px', height: '150px' }} />
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

            </Dialog>
          </div>
        </main>
      </React.Fragment>
    );

  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(TrophiesView);