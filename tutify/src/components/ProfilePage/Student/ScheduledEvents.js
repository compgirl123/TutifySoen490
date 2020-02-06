import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as UserDashboardStyles from '../../../styles/UserDashboard-styles';
import { withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';

class ScheduledEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll: 'paper',
      events: [],
      eventsDecoded: [],
      dates: [],
    };
  }

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

  //retrieves the session
  checkSession = () => {
    console.info("Fetching session from db...");
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then((res) => {
        this.setState({ events: res.userInfo.events });
        this.populateEvents();
      })
      .catch(err => console.error("Session could not be checked: " + err));
  };

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
        newEvents.forEach(function (newEvent) {
          var str = newEvent.date;
          str = str.substring(0, 11)
          var newStr = str.replace(/\D/g, "");
          newDates.push(newStr);
          newStr = newStr.substring(6) + "/" + newStr.substring(4, 6) + "/" + newStr.substring(0, 4);
          newStr = newStr.toString();
          newEvent.date = newStr;
        });

        newDates = this.displayedDates(newDates);

        this.setState({ dates: newDates, eventsDecoded: newEvents });

      }, (error) => {
        console.error("Could not get events from database (API call error) " + error);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Card className={classes.card}>
          <Table stickyHeader aria-label="">
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Scheduled Events</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <CardContent >

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
                              <TableCell style={{ width: 200 }}>{event.description} {event.location} </TableCell>
                              <TableCell >Tutor: {event.tutorName} </TableCell>
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

        </Card>
      </React.Fragment>
    );
  }
}
export default withStyles(UserDashboardStyles.styles, { withTheme: true })(ScheduledEvents);
