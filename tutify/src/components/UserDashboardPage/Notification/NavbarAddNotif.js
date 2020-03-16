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


    setItemColor(isNew) {
        if (isNew) {
            return '#F5F5F5'
        }
        return '';
    }


    render() {
        const { notif } = this.props
        return (
            <Grid container>
                <Grid xs={10} md={12} item>
                    <ListItem alignItems="flex-start" style={{ background: this.setItemColor(notif.new) }}>
                        <ListItemAvatar>
                            <Avatar />
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
