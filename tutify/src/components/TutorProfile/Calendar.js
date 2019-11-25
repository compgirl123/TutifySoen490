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

class NewCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          drawerOpened: false,
          title: "",
          description: "",
          location: "",
          date: "",
          startTime: "",
          endTime: "",
          open: false,
          scroll: 'paper',
          date: ""
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
           
            
          })
          .catch(err => console.log(err));
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
onChange = {date => this.setState({ date })}
          value={this.state.date}/>
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

</CardContent>
                            
                        </TableBody>
                    </Table>
                    <div>

<Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
  <DialogTitle id="simple-dialog-title">Add an Event</DialogTitle>
  <DialogContent>
    <DialogContentText>
      To add an event, fill out the desired value fields and click save.
    </DialogContentText>

    <TextField
       InputLabelProps={{
        shrink: true,
      }}
      margin="dense"
      id="title"
      name="title"
      onChange={e => this.setState({ title: e.target.value })}
      autoComplete="title"
      label="Title"
      type="title"
      fullWidth
    />

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
     InputLabelProps={{
      shrink: true,
    }}
      margin="dense"
      id="date"
      name="date"
      label="Date"
      onChange={e => this.setState({ date: e.target.value })}
      type="date"
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
    <Grid item>
      <DialogActions>
        <Button onClick={this.addEvent}>Save</Button>
      </DialogActions>
    </Grid>
  </Grid>

</Dialog>
</div>


                </Card>
            </React.Fragment>
        );
    }
}
export default withStyles(UserDashboardStyles.styles, { withTheme: true })(NewCalendar);
