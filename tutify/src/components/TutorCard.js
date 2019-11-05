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
import Avatar from '@material-ui/core/Avatar';

class TutorCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openFeedback: false,
            scroll: 'paper',
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.assignTutor = this.assignTutor.bind(this)
    }

    assignTutor(e, tutor) {
        fetch('http://localhost:3001/api/checkSession', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(res => {
                if (res.isLoggedIn) {
                    axios.post('http://localhost:3001/api/assignTutor', {
                        student_id: res.userInfo._id, 
                        tutor_id: tutor._id,
                    });
                    alert('Request successfully sent!')
                }
            })
            .catch(err => console.log(err));
    }

    handleFeedback = () => {
        this.setState({ open: true })
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
                    className={classes.dialog}
                >
                    <DialogTitle id="scroll-dialog-title" className={classes.dialogTitle}>
                        <div className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar src={tutor.picture} className={classes.bigAvatar} />
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="h5">{tutor.first_name} {tutor.last_name}</Typography>
                                            <Typography>{tutor.school}</Typography>
                                            <Typography>{tutor.subjects.map((sub, index) => (
                                                <Chip
                                                    key={index}
                                                    className={classes.chip}
                                                    icon={<CheckIcon />}
                                                    color="secondary"
                                                    label={sub}
                                                />
                                            ))}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText>
                            <Typography variant="h5">
                                {tutor.first_name} {tutor.last_name}
                            </Typography>
                            {[...new Array(10)]
                                .map(
                                    () => `\n Personal Tutor description`,
                                )
                                .join('\n')}
                        </DialogContentText>
                        <DialogContentText>
                            <Typography>
                                Contact
                                </Typography>
                            {tutor.email}
                        </DialogContentText>
                        <DialogContentText>
                            <Typography>
                                Availabilities
                                </Typography>
                            {tutor.availabilities}
                        </DialogContentText>
                    </DialogContent>
                    <Grid
                        container
                        direction="row-reverse"
                        justify="space-between"
                        alignItems="baseline"
                    >
                        <Grid item>
                            <DialogActions>
                                <Button onClick={this.handleClose}>Close</Button>
                            </DialogActions>
                        </Grid>
                        <Grid item>
                            <DialogActions>
                                <Button component="a" href="/courselist" className={classes.connect} onClick={event => this.assignTutor(event, tutor)}>Connect with {tutor.first_name}</Button>
                            </DialogActions>
                        </Grid>
                    </Grid>
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
                            {tutor.program_of_study !== "" && (
                                <span className={classes.program_of_study}> - {tutor.program_of_study}</span>
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

                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorCard);