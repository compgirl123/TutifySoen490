import React from 'react';
import List from '@material-ui/core/List';
import * as UserDashboardStyles from '../../../styles/UserDashboard-styles';
import { withStyles } from "@material-ui/core/styles";
import NavbarAddNotif from "./NavbarAddNotif.js";

export class NavbarNotification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    filterNotification(notification) {
        return notification.filter((notif, i) => {
            return (i < 10)
        })
    }
    render() {
        const { notifications, updateNotificationList } = this.props

        return (
            <React.Fragment>
                {notifications ? this.filterNotification(notifications).map((notif, i) => (
                    
                    <List >
                        <NavbarAddNotif
                            key={i}
                            notif={notifications[notifications.length - 1 - i]}
                            updateNotificationList={updateNotificationList}
                        />
                    </List>
                )) : <></>}
            </React.Fragment>
        );
    }
}
export default withStyles(UserDashboardStyles.styles, { withTheme: true })(NavbarNotification);
