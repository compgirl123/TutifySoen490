import React from "react";
import Typography from "@material-ui/core/Typography";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from '../Footer';
import DashBoardNavBar from '../DashBoardNavBar'
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
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import green from '@material-ui/core/colors/green';

// Defines what content is shown based on index of selected tab
function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

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
            course: "",
            accountType: "",
            open: false,
            Toggle: false,
            categoryOptions: [],
            newValue: 0,
        };
        this.getTutorCourses = this.getTutorCourses.bind(this);
    }

    componentDidMount() {
        this.checkSession();
    }

    // Handling the Closing of the Dialog Box
    handleClose = () => {
        this.setState({ open: false, link: "", title: "", course: "" });
    };

    // Handling the Opening of the Dialog Box
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    // Setting the login state for the user.
    checkSession = () => {
        fetch('/api/checkSession', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then((res) => {
                if (res.isLoggedIn) {
                    // if user is a tutor, then execute the following
                    if (res.userInfo.__t === "tutor") {
                        // Setting the states for the tutor
                        this.setState({
                            tutorId: res.userInfo._id,
                            tutorFirstName: res.userInfo.first_name,
                            tutorLastName: res.userInfo.last_name,
                            accountType: res.userInfo.__t
                        })
                        // getting tutor courses for filtering bar on top
                        this.getTutorCourses();
                        // getting the first class's videos on first Load of page
                        this.getTutorClassVideosOnFirstLoad();
                    }
                    // if user is a student, then execute the following
                    else if (res.userInfo.__t === "student") {
                        // Setting the states for the student
                        this.setState({
                            tutorId: res.userInfo._id,
                            accountType: res.userInfo.__t,
                        })
                        // getting all tutors and their videos for a specific student
                        this.getAllVideosStudent();
                        // getting user courses
                        this.getUserCourses();
                        // getting the first class's videos on first Load of page
                        this.getTutorClassVideosOnFirstLoad();
                    }

                }
                else {
                    this.setState({ Toggle: false });
                }
            })
            .catch(err => console.error(err));
    };

    // Getting all of the tutors the student is registered with as well as their videos
    getAllVideosStudent = () => {
        axios.get('/api/getTutor', {
            params: {
                ID: this.props.match.params.id
            }
        }).then((res) => {
            // fetch the videos
            console.info("Successfully fetched the videos for the Student");
            // setting state of the video array in order to get information from each video
            this.setState({
                tutorFirstName: res.data.tutor.first_name,
                tutorLastName: res.data.tutor.last_name
            });
        })
            .catch(err => console.error("Could not get the videos from the database: " + err));
    }

    // Getting all of the courses the tutor teaches
    getTutorCourses = () => {
        axios.get('/api/getTutorCourses', {
        }).then((res) => {
            var courses = [];
            console.info("Successfully fetched the videos");
            for (var x = 0; x < res.data.data.length; x++) {
                courses.push(res.data.data[x].course.name);
            }
            this.setState({
                categoryOptions: courses
            });

            if (!localStorage.getItem("reloadTutor")) {
                localStorage.setItem("reloadTutor", true);
                window.location.reload(true);
            }
            localStorage.setItem("courses", courses);
            return res.data;
        })
            .catch(err => console.error("Could not get the videos from the database: " + err));
    }

    // This function gets the videos corresponding to each of the tutor's classes.
    getTutorClassVideosOnFirstLoad = () => {
        axios.get('/api/getSelectVideos', {
            params: {
                courseSelected: 0,
                tutorClasses: [localStorage.getItem("courses").split(",")[0]],
                tutor: this.props.match.params.id
            }
        }).then((res) => {
            // fetch the videos
            console.info("Successfully fetched the videos from the class");
            console.info(res);
            this.setState({
                videos: res.data.data
            });
        })
            .catch(err => console.error("Could not get the videos from the database: " + err));
    }

    // Getting all of the courses the user is taking for each tutor
    getUserCourses = () => {
        axios.get('/api/getUserCourses', {
        }).then((res) => {
            // fetch the videos
            var courses = [];
            console.info("Successfully fetched the videos");
            for (var x = 0; x < res.data.data.length; x++) {
                if (res.data.data[x].tutor._id === this.props.match.params.id) {
                    courses.push(res.data.data[x].course.name)
                }
            }
            localStorage.setItem("courses", courses);
            this.setState({
                categoryOptions: courses
            });
            if (!localStorage.getItem("reloadStudents")) {
                localStorage.setItem("reloadStudents", true);
                window.location.reload(true);
            }
        })
            .catch(err => console.error("Could not get the videos from the database: " + err));
    }

    // This function checks if the image url provided by the user is a URL
    isURL(url) {
        if (!url) return false;
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))|' + // OR ip (v4) address
            'localhost' + // OR localhost
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

        return pattern.test(url);
    }

    // Adding a new video according to what the user inputs into the Dialog box to the db
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
                    if (this.state.title !== '' && this.state.description !== '' &&
                        this.state.videoLink !== '' && this.isURL(this.state.videoLink) &&
                        this.state.tutorId !== '' && this.state.course !== '') {
                        axios.post('/api/addVideo', {
                            title: this.state.title,
                            description: this.state.description,
                            videoLink: this.state.videoLink,
                            tutorId: this.state.tutorId,
                            course: this.state.course
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
                        swal("Could not add resource, empty or invalid fields.", "", "error")
                    }
                }
            });
    }

    // this method deletes a video from the database 
    deleteVideo = (video_id) => {
        swal({
            title: "Are you sure you want delete this video?",
            icon: "warning",
            buttons: [true, "Yes"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post('/api/deleteVideo', {
                        _id: video_id
                    })
                        .then((res) => {
                            swal("Video successfully deleted!", "", "success");
                            window.location.reload();
                        }, (error) => {
                            console.error("Could not delete course to database (API call error) " + error);
                        });
                }
            });
    }

    render() {
        const { classes } = this.props;
        const { videos, open, newValue, categoryOptions } = this.state;

        var styles = {
            default_tab: {
              color: green[700],
              indicatorColor: green[900],
              fontWeight: 400,
            }
          }
      
          styles.tab = []
          styles.tab[0] = styles.default_tab;
          styles.tab[1] = styles.default_tab;
          styles.tab[2] = styles.default_tab;

        // Handling the change in option in the top filtering by course bar
        const handleChange = (event, newValue) => {
            this.setState({ newValue: newValue });
            axios.get('/api/getSelectVideos', {
                params: {
                    courseSelected: newValue,
                    tutorClasses: this.state.categoryOptions,
                    tutor: this.props.match.params.id
                }
            }).then((res) => {
                // fetch the videos
                console.info("Successfully fetched the videos");
                this.setState({
                    videos: res.data.data
                });
            })
                .catch(err => console.error("Could not get the videos from the database: " + err));
        };

        // Handling the embedding of the video Links.
        const handleVideoEmbedding = (e) => {
            if ((e.target.value).split("/")[2] === "www.youtube.com") {
                this.setState({ videoLink: "https://www.youtube.com/embed/" + (e.target.value).split("=")[1] });
            } else if ((e.target.value).split("/")[2] === "drive.google.com") {
                this.setState({ videoLink: (e.target.value).split("/view")[0] + "/preview" });
            }
        }

        return (
            <React.Fragment>
                <main>
                    <DashBoardNavBar />
                    <main >
                        <div className={classes.appBarSpacer} />
                        <AppBar position="static" color="default" textAlign="center">
                            <Tabs
                                value={newValue}
                                onChange={handleChange}
                                indicatorColor="primary"
                                aria-label="disabled tabs"
                                onclick={(e) => { this.setState({ newValue: e.target.value }); }}
                            >
                                {categoryOptions.map((category, index) => (
                                    <Tab  style={styles.tab[0]} label={category} {...a11yProps(index)} />
                                ))}
                            </Tabs>
                        </AppBar>
                        <Container maxWidth="lg" className={classes.container}>
                            {this.state.accountType === "tutor" ?
                                <Button variant="contained" size="lg" active onClick={() => { this.handleClickOpen(); }} className={classes.addVideoButton} >
                                    Add Video
                                </Button>
                                :
                                <br />
                            }
                            <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                                {this.state.tutorFirstName} {this.state.tutorLastName}'s Tutoring Videos
                            </Typography>
                            <br />
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
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {file.title}
                                                        {this.state.accountType === "tutor" ?
                                                            <IconButton variant="contained" size="lg" active onClick={event => this.deleteVideo(file._id)} className={classes.deleteCourseButton} >
                                                                <DeleteForeverIcon className={classes.deleteIconButton} />
                                                            </IconButton>
                                                            :
                                                            <></>
                                                        }
                                                    </Typography>
                                                    <Typography gutterBottom variant="h6" component="h6">
                                                        Description : {file.description}
                                                    </Typography>
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
                                        onChange={e => { handleVideoEmbedding(e) }}
                                        autoComplete="videoLink"
                                        label="Link"
                                        defaultValue={this.state.video}
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
                                    <FormControl className={classes.formControl}>
                                        <InputLabel>
                                            Course
                                         </InputLabel>
                                        <Select
                                            onChange={e => this.setState({ course: e.target.value })}>
                                            {categoryOptions.map((category, index) => (
                                                <MenuItem value={category}>{category}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
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

