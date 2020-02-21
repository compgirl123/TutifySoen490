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
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

// Defines the content of the tab panel
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
// Defines what content is shown based on index of selected tab
function a11yProps(index) {
   //alert(category);
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
            activeTab : 0,
            //tada : ""
        };
    }

    componentDidMount() {
        this.checkSession();
        //this.tada();
    }

    handleClose = () => {
        this.setState({ open: false, link: "", title: "", course: "" });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleSelect(category){
        //this.setState({ tada: category });
        console.log(category);
        /*axios.get('/api/getSelectVideos', {
            params: {
                course: category
            }
        }).then((res) => {
            // fetch the videos
            console.info("Successfully fetched the videos");
            console.log(res);
            console.log(res.data.data);
            console.log(this.props.match.params.id);
            // setting state of the video array in order to get information from each video
            this.setState({
                videos: res.data.data
            });
        })
            .catch(err => console.error("Could not get the videos from the database: " + err));*/
        }
      
      tada = (e) => {
        var a = 0;

        axios.get('/api/getSelectVideos', {
            params: {
                course: this.state.newValue,
                aa: this.state.categoryOptions
            }
        }).then((res) => {
            // fetch the videos
            console.info("Successfully fetched the videos");
            //console.log(this.state.newValue);
            console.log(res);
            //console.log(this.props.match.params.id);
            this.setState({
                videos: res.data.data
            });
            // setting state of the video array in order to get information from each video
            /*this.setState({
                videos: res.data.data
            });*/
        })
            .catch(err => console.error("Could not get the videos from the database: " + err));
    }
    

    // Setting the login state of user.
    checkSession = () => {
        fetch('/api/checkSession', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then((res) => {
                if (res.isLoggedIn) {
                    if (res.userInfo.__t === "tutor") {
                        console.log(res.userInfo.courses.length);
                        //.course after for loop above
                        this.setState({
                            tutorId: res.userInfo._id,
                            tutorFirstName: res.userInfo.first_name,
                            tutorLastName: res.userInfo.last_name,
                            accountType: res.userInfo.__t
                        })
                        this.getTutorCourses1();
                        this.getAllVideos();
                    }
                    else if (res.userInfo.__t === "student") {
                        console.log(res.userInfo);
                        this.setState({
                            tutorId: res.userInfo._id,
                            accountType: res.userInfo.__t
                        })
                        this.getAllVideosStudent();
                        this.getAllVideos();
                        this.getUserCourses1();
                    }

                }
                else {
                    this.setState({ Toggle: false });
                }
            })
            .catch(err => console.log(err));
    };

    getAllVideos = () => {
        axios.get('/api/getVideos', {
            params: {
                tutor: this.props.match.params.id
            }
        }).then((res) => {
            // fetch the videos
            console.info("Successfully fetched the videos");
            console.log(res);
            console.log(res.data.data);
            console.log(this.props.match.params.id);
            // setting state of the video array in order to get information from each video
            /*this.setState({
                videos: res.data.data
            });*/
        })
            .catch(err => console.error("Could not get the videos from the database: " + err));
    }

    getAllVideosStudent = () => {
        axios.get('/api/getTutor', {
            params: {
                ID: this.props.match.params.id
            }
        }).then((res) => {
            // fetch the videos
            console.info("Successfully fetched the videos");
            console.log(res.data.tutor.first_name);
            console.log(res.data.tutor.last_name);
            // console.log(res.data.data);
            console.log(this.props.match.params.id);
            // setting state of the video array in order to get information from each video
            this.setState({
                tutorFirstName: res.data.tutor.first_name,
                tutorLastName: res.data.tutor.last_name,
            });
        })
            .catch(err => console.error("Could not get the videos from the database: " + err));
    }

    //getTutorCourses
    getTutorCourses1 = () => {
        axios.get('/api/getTutorCourses', {
        }).then((res) => {
            // fetch the videos
            var courses = [];
            console.info("Successfully fetched the videos");
            for (var x = 0; x < res.data.data.length; x++) {
                console.log(res.data.data[x].course.name);
                courses.push(res.data.data[x].course.name)
            }
            this.setState({
                categoryOptions: courses
            });
            // setting state of the video array in order to get information from each video

        })
            .catch(err => console.error("Could not get the videos from the database: " + err));
    }

    getUserCourses1 = () => {
        axios.get('/api/getUserCourses', {
        }).then((res) => {
            // fetch the videos
            var courses = [];
            console.info("Successfully fetched the videos");
            for (var x = 0; x < res.data.data.length; x++) {
                console.log(res.data.data[x].course.name);
                courses.push(res.data.data[x].course.name)
            }
            this.setState({
                categoryOptions: courses
            });
            // setting state of the video array in order to get information from each video

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
                        swal("Could not add resource, empty fields.", "", "error")
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

        const handleChange = (event, newValue) => {
            console.log(newValue);
            this.setState({ newValue: newValue });
            axios.get('/api/getSelectVideos', {
                params: {
                    course: newValue,
                    aa: this.state.categoryOptions
                }
            }).then((res) => {
                // fetch the videos
                console.info("Successfully fetched the videos");
                //console.log(this.state.newValue);
                console.log(res);
                //console.log(this.props.match.params.id);
                this.setState({
                    videos: res.data.data
                });
                // setting state of the video array in order to get information from each video
                /*this.setState({
                    videos: res.data.data
                });*/
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
                                //onChange={this.tada()}
                                //onClick={e => this.tada(e); this.setState({ newValue: e.target.value }}
                                onclick={(e)=>{ this.setState({ newValue: e.target.value }); this.tada(e); }}
                                //onClick={e => this.setState({ newValue: e.target.value })}
                                //onClick={this.handleSelect(this.state.newValue)}
                                //onClick={this.setState({aa:this.state.newValue})}
                            >
                                {/*<Tab label="All" {...a11yProps(0)} />*/}
                                {categoryOptions.map((category, index) => (
                                    <Tab label={category} {...a11yProps(index)} />
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
                            <Title> Videos </Title>
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

