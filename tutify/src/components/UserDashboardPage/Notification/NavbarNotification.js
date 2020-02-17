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

    setRowColor(isNew) {
        if (isNew) {
            return '#F5F5F5'
        }
        return '';
    }


    render() {
        const { notifications, updateNotificationList } = this.props

        return (
            <React.Fragment>
                {notifications ? notifications.map((notif, i) => (
                    <List style={{ background: this.setRowColor(notif.new) }}>
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
