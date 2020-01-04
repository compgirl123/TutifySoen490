import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as UserDashboardStyles from '../../styles/UserDashboard-styles';
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
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  function1 = (newDates) => {
    newDates.sort();
    newDates = newDates.filter(function (elem, pos) {
      return newDates.indexOf(elem) === pos;
    })

    for (var i = 0; i < newDates.length; i++) {
      var stri = newDates[i].substring(6) + "/" + newDates[i].substring(4, 6) + "/" + newDates[i].substring(0, 4);
      stri = stri.toString();
      newDates[i] = stri;
    }
    return newDates;
  };

  function2 = () => {

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
      .then((res) => {
        this.setState({
          tutor_id: res.userInfo._id,
          events: res.userInfo.events
        });
        this.populateEvents();
      })
      .catch(err => console.log(err));
  };


  populateEvents = () => {
    var newDates = [];
    var newEvents = [];

    axios.post('http://localhost:3001/api/populateEvents', {
      events: this.state.events
    })
      .then((res) => {

        newEvents = res.data.data;

        for (var z = 0; z < newEvents.length; z++) {
          var str = newEvents[z].date;
          str = str.substring(0, 11)
          var newStr = str.replace(/\D/g, "");
          newDates.push(newStr);
          newStr = newStr.substring(6) + "/" + newStr.substring(4, 6) + "/" + newStr.substring(0, 4);
          newStr = newStr.toString();
          newEvents[z].date = newStr;
        }

        newDates = this.function1(newDates);

        this.setState({ dates: newDates, eventsDecoded: newEvents });
      }, (error) => {
        console.log(error);
      });
  };

  addEvent = () => {
    this.setState({ open: false });
    if (this.state.location !== "") {
      var newLocation = "@ " + this.state.location;
    }

    axios.post('http://localhost:3001/api/addEvent', {
      events: this.state.events,
      tutor_id: this.state.tutor_id,
      description: this.state.description,
      location: newLocation,
      date: this.state.date,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
    })
      .then((res) => {
        var newDates = [];
        var newEvents = [];
        var replaceEvents = [];

        newEvents = res.data.data;

        for (var z = 0; z < newEvents.length; z++) {
          var str = newEvents[z].date;
          str = str.substring(0, 11)
          var newStr = str.replace(/\D/g, "");
          newDates.push(newStr);
          newStr = newStr.substring(6) + "/" + newStr.substring(4, 6) + "/" + newStr.substring(0, 4);
          newStr = newStr.toString();
          newEvents[z].date = newStr;
          replaceEvents.push(newEvents[z]._id)
        }

        newDates = this.function1(newDates);

        this.setState({
          dates: newDates, eventsDecoded: newEvents, events: replaceEvents, location: "", description: "", startTime: "00:00",
          endTime: "00:00"
        });
        swal("Event successfully added!", "", "success")
      }, (error) => {
        console.log(error);
      });
  };

  deleteEvent = (id) => {
    axios.post('http://localhost:3001/api/deleteEvent', {
      event_id: id,
      tutor_id: this.state.tutor_id
    })
      .then((res) => {
        this.setState({ events: res.data.userInfo.events });
        this.populateEvents();
      }, (error) => {
        console.log(error);
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
                          <TableCell style={{ background: 'lightgray' }}>{date}</TableCell>
                          <TableCell style={{ background: 'lightgray' }}></TableCell>
                          <TableCell style={{ background: 'lightgray' }}></TableCell>
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