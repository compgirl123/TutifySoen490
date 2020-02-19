import React from "react";
import Typography from "@material-ui/core/Typography";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from '../Footer';
import DashBoardNavBar from '../DashBoardNavBar'
import Title from './Title';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import swal from '@sweetalert/with-react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import axios from "axios";

// displaying the documents shared to students
export class Studentdocs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            videoLink: "",
            tutorId: "",
            tutorFirstName: "",
            tutorLastName: "",
            videos: [],
            open: false,
            Toggle: false
        };
    }

    componentDidMount() {
        this.checkSession();
        this.getAllResources();
    }

    handleClose = () => {
        this.setState({ open: false, link: "", title: "", course: "" });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    // Setting the login state of user.
    checkSession = () => {
        fetch('/api/checkSession', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then((res) => {
                if (res.isLoggedIn) {
                    console.log(res.userInfo._id);
                    this.setState({
                        tutorId: res.userInfo._id,
                        tutorFirstName: res.userInfo.first_name,
                        tutorLastName: res.userInfo.last_name
                    })
                }
                else {
                    this.setState({ Toggle: false });
                }
            })
            .catch(err => console.log(err));
    };

    getAllResources = () => {
        axios.get('/api/getVideos').then((res) => {
            // fetch the videos
            console.info("Successfully fetched the videos");
            console.log(res.data.data);
            // setting state of the video array in order to get information from each video
            this.setState({
                videos: res.data.data
            });
        })
            .catch(err => console.error("Could not get the videos from the database: " + err));
    }

    //Adding a new video to the db
    addVideoToDb = () => {
        var tutor = [];
        tutor.push(this.state.id);
        //swal to confirm the addition of new video
        swal({
            title: "Would you like to add the following video?",
            buttons: {
                confirm: "Yes",
                cancel: "Cancel",
            },
            content: (
                <div>
                    <p>
                        <b>
                            Title: {this.state.title}
                        </b>
                    </p>
                    <p>
                        <p>
                            <b>
                                description: {this.state.description}
                            </b>
                        </p>
                        <p>
                            Video Link: {this.state.videoLink}
                        </p>
                        Tutor: {this.state.tutorFirstName} {this.state.tutorLastName}
                    </p>
                </div>
            )
        })
            //adds the link, title, and course to the db 
            .then((value) => {
                if (value) {
                    console.info("Adding video to db...");
                    console.log(this.state.title);
                    if (this.state.title !== '' && this.state.description !== '' &&
                        this.state.videoLink !== '' && this.state.tutorId !== '') {
                        axios.post('/api/addVideo', {
                            title: this.state.title,
                            description: this.state.description,
                            videoLink: this.state.videoLink,
                            tutorId: this.state.tutorId
                        })
                            .then((res) => {
                                swal("Video successfully added!", "", "success");
                                window.location.reload();
                            }, (error) => {
                                console.error("Could not add video to database (API call error) " + error);
                            });
                    }
                    else {
                        console.error("Empty fields");
                        swal("Could not add resource, empty fields.", "", "error")
                    }
                }
            });
    }

    render() {
        const { classes } = this.props;
        const { videos, open } = this.state;

        return (
            <React.Fragment>
                <main>
                    <DashBoardNavBar />
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Container maxWidth="lg" className={classes.container}>
                            <Button variant="contained" size="lg" active onClick={() => { this.handleClickOpen(); }} className={classes.addVideoButton} >
                                Add Video
                            </Button>
                            <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                                {this.state.tutorFirstName} {this.state.tutorLastName}'s Tutoring Videos
                            </Typography>
                            <Title>Uploaded </Title>
                            <Grid container spacing={4}>
                                {/* Videos */}
                                {videos.map((file, index) => (
                                    <Grid item xs={6} sm={6} lg={6}>
                                        <Card className={classes.card} >
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    title="French"
                                                    width='100%'
                                                    height='100%'
                                                />
                                                <CardContent>
                                                    <h1>{file.title}</h1>
                                                    <h3>Description : {file.description}</h3>
                                                    <div className={classes.cardStyle}>
                                                        <iframe width="100%" height="100%" src={file.videoLink} title={file.title} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                    </div>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>

                        {/* Dialog box when clicked on the "add new video" button */}
                        <div>
                            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
                                <DialogTitle id="simple-dialog-title">{this.state.tutorFirstName}, Add a new Video</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="dense"
                                        id="title"
                                        name="title"
                                        onChange={e => this.setState({ title: e.target.value })}
                                        autoComplete="title"
                                        label="Title"
                                        type="title"
                                        fullWidth
                                    />
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="dense"
                                        id="videoLink"
                                        name="videoLink"
                                        onChange={e => this.setState({ videoLink: e.target.value })}
                                        autoComplete="videoLink"
                                        label="Link"
                                        fullWidth
                                    />
                                    <TextField
                                        id="description"
                                        name="description"
                                        label="Description"
                                        onChange={e => this.setState({ description: e.target.value })}
                                        multiline
                                        rows="4"
                                        defaultValue={this.state.description}
                                        variant="outlined"
                                        style={{ width: '100%', marginTop: "35px" }}
                                    />
                                    <br /><br />
                                    <Button variant="contained" size="lg" active onClick={() => { this.addVideoToDb(); }} className={classes.formControl}>
                                        Save
                                    </Button>
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
                                </Grid>
                            </Dialog>
                        </div>
                        {/* Footer */}
                        <Footer />
                    </main>
                </main>
            </React.Fragment>
        );
    }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(Studentdocs);

