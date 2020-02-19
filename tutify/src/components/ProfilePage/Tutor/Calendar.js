import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as UserDashboardStyles from '../../../styles/UserDashboard-styles';
import { withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Calendar from 'react-calendar'
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import axios from 'axios';
import swal from 'sweetalert';
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import IconButton from '@material-ui/core/IconButton';
import ShowStudents from "../../TutorAnnouncements/ShowStudents";
import {sendNotification} from '../../../helper/notificationsHelper';

export class NewCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      description: "",
      location: "",
      date: "",
      startTime: "00:00",
      endTime: "00:00",
      open: false,
      scroll: 'paper',
      tutor_id: "",
      event_id: "",
      events: [],
      eventsDecoded: [],
      dates: [],
      eventId: "",
      students: [],
      studentsSelected: [],
      Toggle: false,
      placeholder: "Share with student",
      tutorName: "",
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.shareWithStudent = this.shareWithStudent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);

  }

  toggleDrawer = booleanValue => () => {
    this.setState({
      drawerOpened: booleanValue
    });
  };

  handleFeedback = () => {
    this.setState({ open: true })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  displayedDates = (newDates) => {
    newDates.sort();
    //remove duplicates
    newDates = newDates.filter(function (elem, pos) {
      return newDates.indexOf(elem) === pos;
    })
    //change number to date format (ex:dd/mm/yyyy)
    for (var i = 0; i < newDates.length; i++) {
      var stri = newDates[i].substring(6) + "/" + newDates[i].substring(4, 6) + "/" + newDates[i].substring(0, 4);
      stri = stri.toString();
      newDates[i] = stri;
    }
    return newDates;
  };

  componentDidMount() {
    this.checkSession();
  }


  handleSelection = (students) => {
    //assign students selected from dropdown list to an array
    this.setState({ studentsSelected: students });
  }

  //retrieves the session
  checkSession = () => {
    console.info("Fetching session...");
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then((res) => {
        this.setState({
          tutor_id: res.userInfo._id,
          events: res.userInfo.events,
          students: res.userInfo.students,
          tutorName: res.userInfo.first_name + " " + res.userInfo.last_name,
          tutorImg: res.userInfo.picture,
        });
        this.populateEvents();
        this.FindStudentsForList();
      })
      .catch(err => console.error("Session could not be checked: " + err));
  };

  //converts student object ids to student information
  FindStudentsForList = () => {
    console.info("Fetching students from db...");
    axios.post('/api/findStudents', {
      students: this.state.students
    })
      .then((res) => {
        this.setState({ students: res.data.data });
      }, (error) => {
        console.error("Could not get tutor's students from database (API call error) " + error);
      })
  };

  //toggles with opening and closing of dropdown list of students
  shareWithStudent = () => {
    if (this.state.placeholder === "Share with student") {
      this.setState({ Toggle: true, placeholder: "Hide student list" });
    }
    else {
      this.setState({ Toggle: false, placeholder: "Share with student" });
    }
  }

  //retireves events from database and displays them
  populateEvents = () => {
    var newDates = [];
    var newEvents = [];
    console.info("Fetching events from db...");
    axios.post('/api/populateEvents', {
      events: this.state.events
    })
      .then((res) => {

        newEvents = res.data.data;

        //changes the format of the date
        for (var z = 0; z < newEvents.length; z++) {
          var str = newEvents[z].date;
          str = str.substring(0, 11)
          var newStr = str.replace(/\D/g, "");
          newDates.push(newStr);
          newStr = newStr.substring(6) + "/" + newStr.substring(4, 6) + "/" + newStr.substring(0, 4);
          newStr = newStr.toString();
          newEvents[z].date = newStr;
        }
        newDates = this.displayedDates(newDates);

        this.setState({ dates: newDates, eventsDecoded: newEvents });
      }, (error) => {
        console.error("Could not get events from database (API call error) " + error);
      });
  };

  //adds an events to the database and retrieves modified events array to display in front end
  addEvent = () => {
    this.setState({ open: false });
    if (this.state.location !== "") {
      var newLocation = "@ " + this.state.location;
    }
    console.info("adding an event and fetching events from db...");
    axios.post('/api/addEvent', {
      events: this.state.events,
      tutor_id: this.state.tutor_id,
      description: this.state.description,
      location: newLocation,
      date: this.state.date,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      students: this.state.studentsSelected,
      tutorName: this.state.tutorName,
      studentNames: this.state.studentNames
    })
      .then((res) => {
        var newDates = [];
        var newEvents = [];
        var replaceEvents = [];

        newEvents = res.data.data;

        // Send announcement for this new event
        sendNotification(this.state.studentsSelected, 
          {tutorImg: this.state.tutorImg, tutorName: this.state.tutorName, tutorid: this.state.tutor_id}, 
          {title: "New event scheduled", text: "A new event was added to your schedule."});

        //change the format of the date and add new event id to list of event ids
        for (var z = 0; z < newEvents.length; z++) {
          var str = newEvents[z].date;
          str = str.substring(0, 11)
          var newStr = str.replace(/\D/g, "");
          newDates.push(newStr);
          newStr = newStr.substring(6) + "/" + newStr.substring(4, 6) + "/" + newStr.substring(0, 4);
          newStr = newStr.toString();
          newEvents[z].date = newStr;
          replaceEvents.push(newEvents[z]._id);
        }
        newDates = this.displayedDates(newDates);

        //reset all states
        this.setState({
          dates: newDates, eventsDecoded: newEvents, events: replaceEvents, location: "", description: "", startTime: "00:00",
          endTime: "00:00", studentsSelected: []
        });
        swal("Event successfully added!", "", "success")
      }, (error) => {
        console.error("Could not get events data from database (API call error) " + error);
      });
  };

  //deletes an events from the database and retrieves modified array of events to display in front end
  deleteEvent = (id) => {
    swal({
      title: "Are you sure you want delete this event?",
      icon: "warning",
      buttons: [true, "Yes"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          console.info("deleting an event and fetching events from db...");
          axios.post('/api/deleteEvent', {
            event_id: id,
            tutor_id: this.state.tutor_id
          })
            .then((res) => {
              this.setState({ events: res.data.userInfo.events });
              this.populateEvents();
            }, (error) => {
              console.error("Could not get updated events from database (API call error) " + error);
            });
          swal("Event successfully deleted!", "", "success")

        }
      });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <React.Fragment>
        <Card className={classes.card}>
          <Table stickyHeader aria-label="">
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Calendar</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <CardContent >
                <Grid container spacing={2}>

                  <Grid item xs={8}>
                    <Calendar
                      onChange={date => this.setState({ date })}
                      value={this.state.date} />
                  </Grid>
                  <Grid item xs={4}>

                    <Fab variant="extended" aria-label="edit"
                      justify="center"
                      onClick={() => { this.handleClickOpen(); }}
                    >
                      <AddIcon />

                      Add Event
            </Fab>
                  </Grid>
                </Grid>
                &nbsp;
            <Grid style={{
                  height: 300,
                  overflow: 'auto'
                }}>
                  <Table size="small">

                    {this.state.dates.map(date => (
                      <TableBody>
                        <TableRow >
                          <TableCell className={classes.tableCell}>{date}</TableCell>
                          <TableCell className={classes.tableCell}></TableCell>
                          <TableCell className={classes.tableCell}></TableCell>
                        </TableRow>
                        {this.state.eventsDecoded.map(event => {
                          return date === event.date ?
                            <TableRow key={event._id}>
                              <TableCell style={{ width: 100 }}>{event.startTime} - {event.endTime}</TableCell>
                              <TableCell style={{ width: 300 }}>{event.description} {event.location}</TableCell>
                              <TableCell ><IconButton onClick={e => this.deleteEvent(event._id)}>
                                <DeleteOutlined />
                              </IconButton>
                              </TableCell>
                            </TableRow>
                            :
                            <TableRow ></TableRow>
                        })}
                      </TableBody>
                    ))}
                  </Table>
                </Grid>
              </CardContent>
            </TableBody>
          </Table>
          <div>

            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
              <DialogTitle id="simple-dialog-title">Add an Event</DialogTitle>
              <DialogContent>
                {this.state.date === "" ?
                  <div>
                    <DialogContentText>
                      To add an event, fill out the desired value fields and click save.
                    </DialogContentText>
                    <DialogContentText style={{ color: "red" }}>
                      Select a date before continuing
                    </DialogContentText>
                  </div>
                  :
                  <div>
                    <DialogContentText>
                      To add an event, fill out the desired value fields and click save.
                    </DialogContentText>
                  </div>
                }

                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="dense"
                  id="description"
                  name="description"
                  onChange={e => this.setState({ description: e.target.value })}
                  autoComplete="description"
                  label="Description"
                  type="description"
                  fullWidth
                />

                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="dense"
                  id="location"
                  name="location"
                  onChange={e => this.setState({ location: e.target.value })}
                  autoComplete="location"
                  label="Location"
                  type="location"
                  fullWidth
                />

                <TextField
                  margin="dense"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  id="startTime"
                  name="startTime"
                  label="Start Time"
                  onChange={e => this.setState({ startTime: e.target.value })}
                  type="time"
                  fullWidth
                />

                <TextField
                  margin="dense"

                  InputLabelProps={{
                    shrink: true,
                  }}
                  id="endTime"
                  name="endTime"
                  label="End Time"
                  onChange={e => this.setState({ endTime: e.target.value })}
                  type="time"
                  fullWidth
                />

                <Button aria-controls="simple-menu" aria-haspopup="true" variant="outlined" style={{ marginTop: '30px', marginBottom: '30px' }} onClick={this.shareWithStudent}>
                  {this.state.placeholder}
                </Button>
                {this.state.Toggle ?
                  <ShowStudents students={this.state.students} handleSelection={this.handleSelection} />
                  : <></>
                }


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
                {this.state.date === "" ?

                  <Grid item>
                    <DialogActions>
                      <Button onClick={this.addEvent} disabled>Save</Button>
                    </DialogActions>
                  </Grid>
                  :

                  <Grid item>
                    <DialogActions>
                      <Button onClick={this.addEvent} >Save</Button>
                    </DialogActions>
                  </Grid>
                }
              </Grid>

            </Dialog>
          </div>
        </Card>
      </React.Fragment>
    );
  }
}
export default withStyles(UserDashboardStyles.styles, { withTheme: true })(NewCalendar);