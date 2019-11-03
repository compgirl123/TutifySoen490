import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import * as UserDashboardStyles from '../../styles/UserDashboard/UserDashboard-styles';
import { withStyles } from "@material-ui/core/styles";
import CardHeader from '@material-ui/core/CardHeader';

class Notifications extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
             
                <Card className={classes.cardWrapper}>
                    <CardHeader
                        className={classes.cardHeader}
                        title="Notifications">
                    </CardHeader>
                    <CardContent>
                        <List>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar src="" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Announcement title"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Tutor Name
                                            </Typography>
                                            {" — Tutor announcement"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar src="" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Announcement title"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Tutor Name
                                            </Typography>
                                            {" — Tutor announcement"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar src="" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Announcement Title"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Tutor Name
                                            </Typography>
                                            {' — Tutor announcement'}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar src="" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Announcement title"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Tutor Name
                                            </Typography>
                                            {" — Tutor announcement"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar src="" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Announcement title"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Tutor Name
                                            </Typography>
                                            {" — Tutor announcement"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar src="" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Announcement title"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Tutor Name
                                            </Typography>
                                            {" — Tutor announcement"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            
            </React.Fragment>
    
    
        );
    }
    
}
export default withStyles(UserDashboardStyles.styles, { withTheme: true })(Notifications);
