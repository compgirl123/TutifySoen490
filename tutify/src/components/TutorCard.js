import React, { Component } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip'
import CardActionArea from '@material-ui/core/CardActionArea';
import { withStyles } from "@material-ui/core/styles";
import * as tutifyStyle from '../styles/SearchTutors-styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ButtonBase } from '@material-ui/core';

class TutorCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            scroll: 'paper'
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    assignTutor(e, tutor) {
        axios.post('http://localhost:3001/api/assignTutor', {
            student_id: "5dacd2a3c5c0dd6bb0dd1d91", //for testing - profile cynthiatt (to get from session) 
            tutor_id: tutor._id,
        });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props
        const { tutor } = this.props
        const { open } = this.state
        const { scroll } = this.state
        return (
            <Grid item xs={12} sm={6} md={4}>
                <Dialog
                    open={open}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                >
                    <DialogActions>
                        <Button onClick={this.handleClose}>Close</Button>
                    </DialogActions>
                    <DialogTitle id="scroll-dialog-title"></DialogTitle>
                    <DialogContent>
                    </DialogContent>
                </Dialog>
                <Card className={classes.card}>
                    <ButtonBase onClick={this.handleClickOpen}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.cardMedia}
                                image={tutor.picture}
                                title={tutor.first_name + " " + tutor.last_name}
                            />
                        </CardActionArea>
                    </ButtonBase>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h5" component="h2">

                            {tutor.first_name} {tutor.last_name}

                        </Typography>
                        <Typography component={'span'}>
                            <span className={classes.school}>{tutor.school}</span>
                            {tutor.program !== "" && (
                                <span className={classes.program}> - {tutor.program}</span>
                            )}
                            <br />
                            {tutor.subjects.map((sub, index) => (
                                <Chip
                                    key={index}
                                    className={classes.chip}
                                    icon={<CheckIcon />}
                                    color="secondary"
                                    label={sub}
                                />
                            ))}
                            <br />
                            <Button onClick={event => this.assignTutor(event, tutor)}>Connect</Button>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorCard);