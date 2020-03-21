import React from "react";
import Typography from "@material-ui/core/Typography";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from '../Footer';
import DashBoardNavBar from '../DashBoardNavBar'
import Title from '../ProfilePage/Title';
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
import CardActions from '@material-ui/core/CardActions';


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
            tutorId: "",
            tutorFirstName: "",
            tutorLastName: "",
            optionsq1: [],
            optionsq2: [],
            correctq1: "",
            correctq2: "",
            videos: [],
            course: "",
            courseIndex: 0,
            accountType: "",
            open: false,
            Toggle: false,
            categoryOptions: [],
            newValue: 0
        };
        this.getTutorCourses = this.getTutorCourses.bind(this);
    }

    componentDidMount() {
        this.checkSession();
    }

    // Handling the Closing of the Dialog Box
    handleClose = () => {
        this.setState({ open: false, title: "" });
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
                        // getting the first class's videos on first Load of page
                        this.getTutorClassVideosOnFirstLoad();
                        // getting tutor courses for filtering bar on top
                        this.getTutorCourses();
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
    // ici
    getTutorClassVideosOnFirstLoad = () => {
       // here, add comment
        axios.get('/api/getCourseQuizes', {
            params: {
                courseIndex: 0,
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


    // Adding a new quiz according to what the user inputs into the Dialog box to the db
    addQuizToDb = () => {
        var tutor = [];
        var inputtedOptionsq1 = [];
        tutor.push(this.state.id);
        inputtedOptionsq1.push(this.state.option1q1, this.state.option2q1, this.state.option3q1, this.state.option4q1);
        this.setState({ options: inputtedOptionsq1 });
        var inputtedOptionsq2 = [];
        inputtedOptionsq2.push(this.state.option1q2, this.state.option2q2, this.state.option3q2, this.state.option4q2);
        this.setState({ options: inputtedOptionsq2 });
        //swal to confirm the addition of new video
        swal({
            title: "Would you like to add the following quiz?",
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
                                Description : {this.state.description}
                            </b>
                        </p>
                        Tutor: {this.state.tutorFirstName} {this.state.tutorLastName}
                        <br />
                        Course: {this.state.course}
                    </p>
                </div>
            )
        })
            //adds the link, title, and course to the db 
            .then((value) => {
                if (value) {
                    console.info("Adding video to db...");
                    /*if (this.state.title !== '' && this.state.description !== '' &&
                        this.state.videoLink !== '' && this.isURL(this.state.videoLink)&& 
                        this.state.tutorId !== '' && this.state.course !== '') {*/
                    axios.post('/api/addQuiz', {
                        title: this.state.title,
                        description: this.state.description,
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
                /*}*/
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

        // Handling the change in option in the top filtering by course bar
        const handleChange = (event, newValue) => {
            this.setState({ newValue: newValue });
            axios.get('/api/getCourseQuizes', {
                params: {
                    courseIndex: parseInt(newValue),
                    tutorClasses: this.state.categoryOptions,
                    tutorId: this.state.tutorId
                }
            }).then((res) => {
                // fetch the videos
                console.info("Successfully fetched the videos");
                console.log(res)
                this.setState({
                    videos: res.data.data
                });
            })
                .catch(err => console.error("Could not get the videos from the database: " + err));
        };

        return (
            <React.Fragment>
                <main>
                    <DashBoardNavBar />
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <AppBar position="static" color="default" textAlign="center">
                            <Tabs
                                value={newValue}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="scrollable auto tabs example"
                                onclick={(e) => { this.setState({ newValue: e.target.value }); this.getTutorClassVideos(e); }}
                            >

                                {categoryOptions.map((category, index) => (
                                    <Tab label={category} {...a11yProps(index)} />
                                ))}

                            </Tabs>
                        </AppBar>
                        <Container maxWidth="lg" className={classes.container}>
                            {this.state.accountType === "tutor" ?
                                <Button variant="contained" size="lg" active onClick={() => { this.handleClickOpen(); }} className={classes.addVideoButton} >
                                    Add Quiz
                                </Button>
                                :
                                <br />
                            }
                            <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                                {this.state.tutorFirstName} {this.state.tutorLastName}'s Quizzes
                            </Typography>
                            <Title> Quizzes </Title>
                            <Grid container spacing={4}>
                                {/* Quizzes */}
                                <Grid container spacing={5}>
                                    {videos.map((file, index) => (
                                        <Grid item xs={4} md={4} lg={4}>
                                            <Card className={classes.card}>
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
                                                            {this.state.discriminator === "tutor" ?
                                                                <IconButton variant="contained" size="lg" active onClick={event => this.deleteVideo(file._id)} className={classes.deleteCourseButton} >
                                                                    <DeleteForeverIcon className={classes.deleteIconButton} />
                                                                </IconButton>
                                                                :
                                                                <></>
                                                            }
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Description : {file.description}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    {this.state.accountType === "tutor"
                                                        ? <Button type="button" size="small" onClick={() => window.location.replace("/quiz/" + (file._id).replace(/ /g, ""))} fullWidth className="submit">
                                                            View Quiz
                                                    </Button>
                                                        :
                                                        <></>
                                                    }
                                                    {this.state.accountType === "student"
                                                        ? <Button type="button" size="small" fullWidth className="submit">
                                                            Take Quiz
                                                        </Button>
                                                        :
                                                        <></>
                                                    }
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Container>

                        {/* Dialog box when clicked on the "add new video" button */}
                        <div>
                            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
                                <DialogTitle id="simple-dialog-title">{this.state.tutorFirstName}, Add Quiz Information</DialogTitle>
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
                                        id="description"
                                        name="description"
                                        onChange={e => this.setState({ description: e.target.value })}
                                        autoComplete="description"
                                        label="description"
                                        defaultValue={this.state.description}
                                        fullWidth
                                    />
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
                                    <Button variant="contained" size="lg" active onClick={() => { this.addQuizToDb(); }} className={classes.formControl}>
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

