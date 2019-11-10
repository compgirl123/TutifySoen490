import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import * as UserDashboardStyles from '../../styles/UserDashboard/UserDashboard-styles';
import { withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Notifications extends React.Component {
    render() {
        const { classes } = this.props
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
