import React from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import * as UserDashboardStyles from '../../../styles/UserDashboard-styles';
import { withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddNotif from "./AddNotif.js";

export class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    // returns the appropriate image for the tutor who sent the notification
    returnImg(notif, tutorImgs) {
        if(!tutorImgs)
            return ""

        let found = tutorImgs.find(x => x.id === notif.tutorid)
        if(found)
            return found.value;
        else
            return ""
    }


    render() {
        const { classes, notifications, updateNotificationList, tutorImgs } = this.props

        return (
            <React.Fragment>
                <Paper className={classes.tableWrapper}>
                    <Table stickyHeader aria-label="">
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography variant="h6">Notifications</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <List>
                                        {notifications ? notifications.map((notif, i) => (
                                            <AddNotif
                                                key={i}
                                                notif={notifications[notifications.length - 1 - i]}
                                                tutorImg={this.returnImg(notifications[notifications.length - 1 - i], tutorImgs)}
                                                updateNotificationList={updateNotificationList}
                                            />
                                        )) : <></>}
                                </List>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        );
    }
}
export default withStyles(UserDashboardStyles.styles, { withTheme: true })(Notifications);
