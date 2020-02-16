import React from "react";
import { Grid } from "@material-ui/core";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

class NavbarAddNotif extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    // This function passes the id of the notif to delete to the function updateNotificationList from parent component UserDashboard
    handleClickDelete = (notif_id, updateNotificationList) => {
        updateNotificationList(notif_id)
    };

    render() {
        const { notif, updateNotificationList } = this.props

        return (
            <Grid container>
                <Grid xs={10} md={12} item >
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar src={notif.tutorImg} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={notif.title}
                            value="notif"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        {notif.tutorName}
                                    </Typography>
                                    {" — "}{notif.text}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider />
                </Grid>
            </Grid>
        )
    }
}

export default NavbarAddNotif;
