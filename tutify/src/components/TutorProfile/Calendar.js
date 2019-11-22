import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as UserDashboardStyles from '../../styles/UserDashboard-styles';
import { withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Calendar from 'react-calendar'
import AddToCalendar from 'react-add-to-calendar';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Fab from '@material-ui/core/Fab';

class Notifications extends React.Component {
    render() {
        const { classes } = this.props
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
<Calendar />
</Grid>
<Grid item xs={4}>

<Fab variant="extended" aria-label="edit"
              justify="center"
              onClick={() => { this.handleClickOpen(); }}
              className={classes.editButton}>
                                <AddIcon />

              Add Event
            </Fab>
            </Grid>
            </Grid>

</CardContent>
                            
                        </TableBody>
                    </Table>
                </Card>
            </React.Fragment>
        );
    }
}
export default withStyles(UserDashboardStyles.styles, { withTheme: true })(Notifications);
