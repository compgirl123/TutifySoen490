import React from "react";
import { Grid } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';



class AddNotif extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            title: ''
        };
    }


    render() {
        const { addTodo } = this.props
        const { notif } = this.props
        return (

            <Grid container>
                <Grid xs={10} md={12} item >
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar src="" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={notif.announcementTitle}
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
                                    {" — "}{notif.tutorAnnouncement}
                                </React.Fragment>

                            }
                        />
                        <Grid xs={6} md={1} item>
                            <Fab
                                size="small"
                                color="secondary"
                                aria-label="add"
                                onClick={() => addTodo(notif.announcementTitle)}

                            >
                                <AddIcon />
                            </Fab>
                        </Grid>
                    </ListItem>
                    <Divider />
                </Grid>
            </Grid>
        )
    }

}

export default AddNotif;
