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
export class ChooseCourseAndQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            tutorId: "",
            tutorFirstName: "",
            tutorLastName: "",
            quizzes: [],
            course: "",
            courseIndex: 0,
            points: 0,
            accountType: "",
            allowedAttempts: 1,
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

    handleClose = () => {
        this.setState({ open: false, title: "" });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    checkSession = () => {
        fetch('/api/checkSession', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then((res) => {
                if (res.isLoggedIn) {
                    if (res.userInfo.__t === "tutor") {
                        this.setState({
                            tutorId: res.userInfo._id,
                            tutorFirstName: res.userInfo.first_name,
                            tutorLastName: res.userInfo.last_name,
                            accountType: res.userInfo.__t
                        })
                        this.getTutorCourses();
                        this.getTutorClassquizzesOnFirstLoad();
                    }
                    // if user is a student, then execute the following
                    else if (res.userInfo.__t === "student") {
                        // Setting the states for the student
                        this.setState({
                            tutorId: this.props.match.params.id,
                            accountType: res.userInfo.__t,
                        })
                        this.getUserCourses();
                        this.getAllquizzesStudent();
                        this.getTutorClassquizzesOnFirstLoad();
                    }

                }
                else {
                    this.setState({ Toggle: false });
                }
            })
            .catch(err => console.error(err));
    };

    // Getting all of the tutors the student is registered with as well as their quizzes
    getAllquizzesStudent = () => {
        axios.get('/api/getTutor', {
            params: {
                ID: this.props.match.params.id,
                tutor: this.props.match.params.id
            }
        }).then((res) => {
            console.info("Successfully fetched the quizzes for the Student");
            this.setState({
                tutorFirstName: res.data.tutor.first_name,
                tutorLastName: res.data.tutor.last_name
            });
        })
            .catch(err => console.error("Could not get the quizzes from the database: " + err));
    }

    // Getting all of the courses the tutor teaches
    getTutorCourses = () => {
        axios.get('/api/getTutorCourses', {
        }).then((res) => {
            var courses = [];
            console.info("Successfully fetched the quizzes");
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
            localStorage.setItem("coursesPresent", courses);
            return res.data;
        })
            .catch(err => console.error("Could not get the quizzes from the database: " + err));
    }

    // This function gets the quizzes corresponding to each of the tutor's classes.
    getTutorClassquizzesOnFirstLoad = () => {
        axios.get('/api/getCourseQuizes', {
            params: {
                courseIndex: 0,
                tutorClasses: [localStorage.getItem("coursesPresent").split(",")[0]],
                tutor: this.props.match.params.id
            }
        }).then((res) => {
            console.info("Successfully fetched the quizzes from the class");
            console.info(res);
            this.setState({
                quizzes: res.data.data,
            });
        })
            .catch(err => console.error("Could not get the quizzes from the database: " + err));
    }

    // Getting all of the courses the user is taking for each tutor
    getUserCourses = () => {
        axios.get('/api/getUserCourses', {
        }).then((res) => {
            var courses = [];
            console.info("Successfully fetched the quizzes");
            for (var x = 0; x < res.data.data.length; x++) {
                if (res.data.data[x].tutor._id === this.props.match.params.id) {
                    courses.push(res.data.data[x].course.name)
                }
            }
            localStorage.setItem("coursesPresent", courses);
            this.setState({
                categoryOptions: courses
            });
            if (!localStorage.getItem("reloadStudents")) {
                localStorage.setItem("reloadStudents", true);
                window.location.reload(true);
            }
        })
            .catch(err => console.error("Could not get the quizzes from the database: " + err));
    }

    // Adding a new quiz according to what the user inputs into the Dialog box to the database
    addQuizToDb = () => {
        var tutor = [];
        var inputtedOptionsq1 = [];
        tutor.push(this.state.id);
        inputtedOptionsq1.push(this.state.option1q1, this.state.option2q1, this.state.option3q1, this.state.option4q1);
        this.setState({ options: inputtedOptionsq1 });
        var inputtedOptionsq2 = [];
        inputtedOptionsq2.push(this.state.option1q2, this.state.option2q2, this.state.option3q2, this.state.option4q2);
        this.setState({ options: inputtedOptionsq2 });
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
                        <p>
                            <b>
                                Points : {this.state.points}
                            </b>
                        </p>
                        Tutor: {this.state.tutorFirstName} {this.state.tutorLastName}
                        <br />
                        Course: {this.state.course}
                    </p>
                </div>
            )
        })
            .then((value) => {
                if (value) {
                    console.info("Adding quiz to db...");
                    if (this.state.title !== '' && this.state.description !== '' 
                        && this.state.points !== '' && this.state.tutorId !== '' 
                        && this.state.course !== '') {
                        axios.post('/api/addQuiz', {
                            title: this.state.title,
                            description: this.state.description,
                            points: this.state.points,
                            tutorId: this.state.tutorId,
                            course: this.state.course,
                            allowed_attempts: this.state.allowedAttempts
                        })
                            .then((res) => {
                                swal("Quiz successfully added!", "", "success");
                                window.location.reload();
                            }, (error) => {
                                console.error("Could not add quiz to database (API call error) " + error);
                            });
                }
                else {
                    console.error("Empty fields");
                    swal("Could not add resource, empty or invalid fields.", "", "error")
                }
            }
            });
    }

    // this method deletes a quiz from the database 
    deleteQuiz = (quiz_id,questions) => {
        swal({
            title: "Are you sure you want delete this quiz?",
            icon: "warning",
            buttons: [true, "Yes"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post('/api/deleteQuiz', {
                        _id: quiz_id,
                        questions: questions
                    })
                        .then((res) => {
                            swal("Quiz successfully deleted!", "", "success");
                            window.location.reload();
                        }, (error) => {
                            console.error("Could not delete quiz to database (API call error) " + error);
                        });
                }
            });
    }

    render() {
        const { classes } = this.props;
        const { quizzes, open, newValue, categoryOptions } = this.state;

        const handleChange = (event, newValue) => {
            this.setState({ newValue: newValue });
            axios.get('/api/getCourseQuizes', {
                params: {
                    courseIndex: parseInt(newValue),
                    tutorClasses: this.state.categoryOptions,
                    tutorId: this.state.tutorId,
                    tutor: this.props.match.params.id
                }
            }).then((res) => {
                console.info("Successfully fetched the quizzes");
                this.setState({
                    quizzes: res.data.data
                });
                console.log(this.state.quizzes);
            })
                .catch(err => console.error("Could not get the quizzes from the database: " + err));
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
                                onclick={(e) => { this.setState({ newValue: e.target.value }); this.getTutorClassquizzes(e); }}
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
                                    {quizzes.map((file, index) => (
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
                                                        {this.state.accountType === "tutor" ?
                                                            <IconButton variant="contained" size="lg" active onClick={event => this.deleteQuiz(file._id,file.questions)} className={classes.deleteCourseButton} >
                                                                <DeleteForeverIcon className={classes.deleteIconButton} />
                                                            </IconButton>
                                                            :
                                                            <></>
                                                        }
                                                    </Typography>
                                                        {this.state.accountType === "tutor"
                                                            ? <>
                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    Description : {file.description}
                                                                    <br />
                                                                    Total Allowed Attempts : {file.allowed_attempts}
                                                                </Typography>
                                                            </>
                                                            :
                                                            <></>
                                                        }
                                                        {this.state.accountType === "student"
                                                            ? <>
                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    Description : {file.description}
                                                                    <br />
                                                                    Total Allowed Attempts : {file.allowed_attempts}
                                                                </Typography>
                                                            </>
                                                            :
                                                            <></>
                                                        }
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    {this.state.accountType === "tutor"
                                                        ? <>
                                                            <Button type="button" size="small" href={'/quiz/' + file._id} fullWidth className="submit">
                                                                View Quiz
                                                          </Button>
                                                        </>
                                                        :
                                                        <></>
                                                    }
                                                    {this.state.accountType === "student"
                                                        ? <Button type="button" size="small" href={'/quiz/' + file._id} fullWidth className="submit" disabled={file.available_attempts < 1}>
                                                            Take Quiz, {file.available_attempts} Attempt(s) Left
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

                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="dense"
                                        id="Points"
                                        name="Points"
                                        onChange={e => this.setState({ points: e.target.value })}
                                        autoComplete="Points"
                                        label="Points"
                                        type = "number"
                                        defaultValue={this.state.points}
                                        fullWidth
                                    />

                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="dense"
                                        id="allowedAttempts"
                                        name="AllowedAttempts"
                                        onChange={e => this.setState({ allowedAttempts: e.target.value })}
                                        autoComplete="allowedAttempts"
                                        label="Allowed Attempts"
                                        type = "number"
                                        defaultValue={this.state.allowedAttempts}
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
                                        <Button onClick={this.addQuizToDb}>Save</Button>
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
export default withStyles(tutifyStyle.styles, { withTheme: true })(ChooseCourseAndQuiz);

