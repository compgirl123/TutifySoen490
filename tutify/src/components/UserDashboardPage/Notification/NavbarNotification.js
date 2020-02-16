import React from 'react';
import List from '@material-ui/core/List';
import * as UserDashboardStyles from '../../../styles/UserDashboard-styles';
import { withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import NavbarAddNotif from "./NavbarAddNotif.js";

export class NavbarNotification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { classes, notifications, updateNotificationList } = this.props
        
        return (
            <React.Fragment>
                    <Table aria-label="">
                        <TableBody>
                            <TableRow>
                                <List>
                                    {notifications ? notifications.map((notif, i) => (
                                        <NavbarAddNotif
                                            key={i}
                                            notif={notifications[notifications.length - 1 - i]}
                                            updateNotificationList = {updateNotificationList}
                                        />
                                    )) : <></>}
                                </List>
                            </TableRow>
                        </TableBody>
                    </Table>
            </React.Fragment>
        );
    }
}
export default withStyles(UserDashboardStyles.styles, { withTheme: true })(NavbarNotification);
