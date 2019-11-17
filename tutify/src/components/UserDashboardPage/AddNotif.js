import React, { memo } from "react";
import { Paper, Grid } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ToDo from "./ToDoList/ToDo";

const AddNotif = memo(props => (
    <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container>
            <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
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
            </Grid>
            <Grid xs={4} md={1} item>
                <Fab
                    size="small"
                    color="secondary"
                    aria-label="add"
                    onButtonClick={ToDo.clearInputAndAddToDo}
                >
                    <AddIcon />
                </Fab>
            </Grid>
        </Grid>
    </Paper>
));

export default AddNotif;
