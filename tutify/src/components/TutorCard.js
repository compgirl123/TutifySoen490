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
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';


function ConnectButton(props) {
    const isConnected = props.isConnected;
    const classes = props.classes;
    const tutor = props.tutor;
    var url = "/courselist/" + props.tutor._id;
    if (!isConnected) {
        return <Button component="a" href={url} className={classes.connect} >Connect with {tutor.first_name}</Button>
    }
    return <Button className={classes.connect} disabled >Connected <CheckIcon /></Button>
}

class TutorCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openFeedback: false,
            scroll: 'paper',
            user_id: props.user_id,
            connectedTutors: props.connectedTutors,
            tutor: props.tutor._id,
            courses: props.tutor.subjects
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
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

    checkIfConnected(tutorID) {
        return this.state.connectedTutors.some(item => item._id === tutorID)
    }

    render() {
        const { classes, tutor } = this.props
        const { open, scroll } = this.state

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
                                            <Typography>{this.state.courses.map((sub, index) => (
                                                <Chip
                                                    key={index}
                                                    className={classes.chip}
                                                    icon={<CheckIcon />}
                                                    color="secondary"
                                                    label={sub}
                                                />
                                            ))
                                            }
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
                            {tutor.description ? tutor.description : ""}
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
                                <ConnectButton
                                    isConnected={this.checkIfConnected(tutor._id)}
                                    classes={classes}
                                    tutor={tutor}
                                    userId={this.state.user_id}
                                    id={tutor.id}
                                />
                            </DialogActions>
                        </Grid>
                    </Grid>
                </Dialog>
                <Card className={classes.card} onClick={this.handleClickOpen}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.cardMedia}
                            image={tutor.picture}
                            title={tutor.first_name + " " + tutor.last_name}
                        />
                    </CardActionArea>
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
                            {
                                tutor.subjects.map((sub, index) => (
                                    <Chip
                                        key={index}
                                        className={classes.chip}
                                        icon={<CheckIcon />}
                                        color="secondary"
                                        label={sub}
                                    />
                                ))
                            }
                            <br />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorCard);