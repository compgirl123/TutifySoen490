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

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


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
<Calendar />

</CardContent>
                            
                        </TableBody>
                    </Table>
                </Card>
            </React.Fragment>
        );
    }
}
export default withStyles(UserDashboardStyles.styles, { withTheme: true })(Notifications);
