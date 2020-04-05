import React from 'react';
import * as tutifyStyle from '../../styles/Quiz-styles';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import DashBoardNavBar from '../DashBoardNavBar';
import Button from '@material-ui/core/Button';
import axios from "axios";
import swal from '@sweetalert/with-react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import MenuItem from "@material-ui/core/MenuItem";

var answersSelected = [];
var answersSelectedNumerical = [];
var colorArr = [];
var specificQuestionsAnswered = [];
var pointsAccumulated = [];
var totalScorePoints = [];

export class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionAnswered: false,
            classNames: false,
            answerSelected: 0,
            datas: [],
            selectedAnswers: [],
            answersSelectedNumerical: [],
            categoryOptions: [],
            option1q1: "",
            option2q1: "",
            option3q1: "",
            option4q1: "",
            correctq1: "",
            question1: "",
            points1: 0,
            finishedQuiz: false,
            showButtonTutor: true,
            showButtonStudent: true,
            color: ['red', 'red'],
            open: false,
            questionsClicked: false,
            nbQuestionsAnswered: [],
            quizzes: [],
            left_attempts: 0,
            attempts: 0,
            attemptsLeft: 0,
            totalAttempts: 0,
            totalPoints: 0,
            totalScorePoints: 0
        }
        this.finishQuiz = this.finishQuiz.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.addPointstoDb = this.addPointstoDb.bind(this);
        this.quizAttempts = this.quizAttempts.bind(this);
    }

    componentWillMount() {
        this.loadQuestions();
        this.checkSession();
    }

    // Setting the login state for the user for both tutor and student.
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
                    }
                    // if user is a student, then execute the following
                    else if (res.userInfo.__t === "student") {
                        console.log(res);
                        // Setting the states for the student
                        this.setState({
                            tutorId: res.userInfo._id,
                            accountType: res.userInfo.__t,
                        })
                        // getting user courses
                        this.getUserCourses();
                        this.getTutorClassquizzesOnFirstLoad();
                    }
                }
                else {
                    this.setState({ Toggle: false });
                }
            })
            .catch(err => console.error(err));
    };

    // Getting all of the courses the tutor teaches
    getTutorCourses = () => {
        axios.get('/api/getTutorCourses', {
        }).then((res) => {
            var courses = [];
            console.info("Successfully fetched the courses");
            for (var x = 0; x < res.data.data.length; x++) {
                courses.push(res.data.data[x].course.name);
            }
            this.setState({
                categoryOptions: courses
            });

            if (!localStorage.getItem("reloadTutor")) {
                // Setting localStorage variable to reload page to reload Questions for tutor.
                localStorage.setItem("reloadTutor", true);
                window.location.reload(true);
            }
            // Store all of the tutor's courses in a localStorage variable to display courses on page.
            localStorage.setItem("courses", courses);
            return res.data;
        })
            .catch(err => console.error("Could not get the courses from the database: " + err));
    }

    // Getting all of the courses the user is taking for each tutor
    getUserCourses = () => {
        axios.get('/api/getUserCourses', {
        }).then((res) => {
            // fetch the courses
            var courses = [];
            console.info("Successfully fetched the courses");
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

    // Loading all of the questions for the selected quiz.
    loadQuestions = () => {
        axios.get('/api/getSelectedQuizQuestions', {
            params: {
                quizId: this.props.match.params.id
            }
        }).then((res) => {
            // fetch the questions
            if (res.data !== undefined) {
                this.setState({ datas: res.data.data, session: res.session, total: res.data.data.length });
                for(var x=0;x<this.state.datas.length;x++){
                    console.log(this.state.datas[x].points);
                    totalScorePoints.push(this.state.datas[x].points);
                    var totalP=0;
                    for(var i in totalScorePoints) { totalP += totalScorePoints[i]; }
                    console.log(totalP);
                }
                this.setState({ totalScorePoints:totalP });
            }
            else {
                this.setState({ datas: [], session: res.session, total: [] });
            }
            
        })
            .catch(err => console.error("Could not get the questions from the database: " + err));
    }

    // Handling the showing of the finish quiz button and return to menu button.
    handleShowButton() {
        this.setState({
            showButtonTutor: true,
            showButtonStudent: true,
            questionAnswered: true
        })
    }

    // Handling the Closing of the Dialog Box
    handleClose = () => {
        this.setState({ open: false, title: "", description: "", question: "", course: "" });
    };

    // Handling the Opening of the Dialog Box
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    // Constantly checking answer upon selection of an option for each question of the quiz. 
    checkAnswer(e) {
        // Getting the question number and answer selected
        let elem = e.currentTarget;
        let questionIndex = Number((elem.dataset.id).split(",")[1]);
        specificQuestionsAnswered[questionIndex] = true;
        this.setState({ nbQuestionsAnswered: specificQuestionsAnswered });
        let answer = Number((elem.dataset.id).split(",")[2]);
        let correct = Number(this.state.datas[(elem.dataset.id).split(",")[1]].answerIndex);
        let updatedClassNames = this.state.classNames;
        this.setState({ questionsClicked: true });
 
        // if quiz is not finished but user selects answer, then save answer selected
        if (this.state.finishedQuiz === false) {
            if (answer === correct) {
                // set the correct answer to be shown in green if the person taking the quiz has answered correctly
                colorArr[(elem.dataset.id).split(",")[1]] = 'green';
                pointsAccumulated[questionIndex] = this.state.datas[questionIndex].points;
            }
            else {
                // set the correct answer to be shown in red if the person taking the quiz has not answered correctly
                colorArr[(elem.dataset.id).split(",")[1]] = 'red';
                pointsAccumulated[questionIndex] = null;
                // check if it ever gets here then remove points.
            }

            var total=0;
            for(var i in pointsAccumulated) { total += pointsAccumulated[i]; }
            console.log(total);

            this.setState({
                color: colorArr,
                classNames: updatedClassNames,
                totalPoints: total
            })

            answersSelected[(elem.dataset.id).split(",")[1]] = (elem.dataset.id).split(",")[0];
            answersSelectedNumerical[(elem.dataset.id).split(",")[1]] = Number((elem.dataset.id).split(",")[2]);

            // saving all of the final answered questions into states.
            this.setState({
                answerSelected: elem.dataset.id,
                selectedAnswers: answersSelected,
                answersSelectedNumerical: answersSelectedNumerical
            })
            this.handleShowButton();
        }
    }

    /**
     * Handles what happends when quiz is finished. Forces user to answer all questions to make
     * the quiz count for the total number of points earned for that quiz.
     **/
    finishQuiz() {
        if (this.state.nbQuestionsAnswered.length < this.state.total) {
            alert("Please Answer all Questions");
            console.info("If the number of answered questions is less than the total, inform user that they need to answer all questions");
        }
        else if (this.state.nbQuestionsAnswered.length === this.state.total) {
            if (this.state.nbQuestionsAnswered.includes(undefined) === true) {
                alert("Please Answer all Questions");
                console.info("If the number of answered questions is less than the total, inform user that they need to answer all questions");
            }
            else if (this.state.nbQuestionsAnswered.includes(undefined) === false) {
                if (this.state.accountType === "student") {
                    if (this.state.questionsClicked === true) {
                        console.log(this.state.quizzes);
                        console.log(this.state.attemptsLeft);
                        console.log(this.state.totalAttempts);
                        //console.log(this.state.quizzes);
                        this.addPointstoDb();
                        this.setState({
                            finishedQuiz: true,
                            showButtonTutor: false,
                            showButtonStudent: false
                        });
                        this.getTutorClassquizzesOnFirstLoad();
                    }
                    else if (this.state.questionsClicked === false) {
                        alert("Please Answer at least one Question");
                    }
                }
                else if (this.state.accountType === "tutor") {
                    if (this.state.questionsClicked === true) {
                        this.setState({
                            finishedQuiz: true,
                            showButtonTutor: false,
                            showButtonStudent: false
                        });
                        this.getTutorClassquizzesOnFirstLoad();
                    }
                    else if (this.state.questionsClicked === false) {
                        alert("Please Answer at least one Question");
                    }

                }
            }
        }
    }

    deleteQuestion = (question_id) => {
        swal({
            title: "Are you sure you want delete this question?",
            icon: "warning",
            buttons: [true, "Yes"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post('/api/deleteQuestion', {
                        _id: question_id
                    })
                        .then((res) => {
                            swal("Question successfully deleted!", "", "success");
                            window.location.reload();
                        }, (error) => {
                            console.error("Could not delete question to database (API call error) " + error);
                        });
                }
            });
    }

    // This function retrieves the quizzes corresponding to each of the tutor's classes.
    getTutorClassquizzesOnFirstLoad = () => {
            axios.get('/api/getCourseQuizes', {
                params: {
                    courseIndex: 0,
                    tutorClasses: [localStorage.getItem("coursesPresent").split(",")[0]],
                    tutor: this.props.match.params.id
                }
            }).then((res) => {
                console.info("Successfully fetched the quizzes from the class");
                console.log([localStorage.getItem("coursesPresent").split(",")[0]]);
                console.info(res);
                this.setState({
                    quizzes: res.data.data,
                    totalAttempts: res.data.data.allowed_attempts,
                    attemptsLeft: res.data.data.available_attempts
                });
            })
                .catch(err => console.error("Could not get the quizzes from the database: " + err));
    }

    // Fetches all of the attempts for certain quizzes corresponding to a certain class.
    quizAttempts = () => {
        axios.get('/api/getSpecificQuizAttempts', {
            params: {
                quizId: this.props.match.params.id
            }
        }).then((res) => {
            // fetch the quizzes
            var quiz_attempts = [];
            console.info("Successfully fetched the quizzes from the class");
            if (res.data.data.length === 0) {
                this.setState({ left_attempts: this.state.quizzes - 1 });
            }
            if (res.data.data.length > 0) {
                for (var x = 0; x < res.data.data.length; x++) {
                    quiz_attempts.push(res.data.data[x].attempts_left);
                }
                this.setState({ left_attempts: Math.min(...quiz_attempts) - 1 });
                if (this.state.left_attempts <= 0) {
                    window.location.replace("/choosetutorQuiz");
                }
            }
        })
            .catch(err => console.error("Could not get the quizzes from the database: " + err));
    }

    // This function adds the completed quiz with the points associated with it as an attempt for the student.
    addPointstoDb = () => {
        axios.post('/api/addAttempt', {
            completed_attempts: this.state.quizzes,
            quiz_id: this.props.match.params.id,
            studentId: this.state.tutorId,
            quiz_points_scored: this.state.totalPoints
        }).then((res) => {
            console.info("Successfully created an attempt");
        })
            .catch(err => console.error("Could not create an attempt and put it in the database: " + err));
    }

    // Adding a new question according to what the user inputs into the Dialog box to the db
    addQuestionToDb = () => {
        var tutor = [];
        var inputtedOptions = [];
        tutor.push(this.state.id);
        inputtedOptions.push(this.state.option1q1, this.state.option2q1, this.state.option3q1, this.state.option4q1);
        this.setState({ options: inputtedOptions });
        swal({
            title: "Would you like to add the following question to the quiz page?",
            buttons: {
                confirm: "Yes",
                cancel: "Cancel",
            },
            content: (
                <div>
                    <p>
                        <p>
                            <b> Question: {this.state.question1} </b>
                        </p>
                        <p>
                            <b>Options: {this.state.options}</b>
                            <p>Option 1: {this.state.option1q1}</p>
                            <p>Option 2: {this.state.option2q1}</p>
                            <p>Option 3: {this.state.option3q1}</p>
                            <p>Option 4: {this.state.option4q1}</p>
                        </p>
                        <p>
                            <b>
                                Correct: {this.state.correctq1}
                            </b>
                        </p>
                    Tutor: {this.state.tutorFirstName} {this.state.tutorLastName}
                    </p>
                </div>
            )
        })
        // adds the question, choices, answerIndex, creator and quizId to database
        .then((value) => {
            if (value) {
                console.info("Adding question to db...");
                if (this.state.question1 !== '' && this.state.option1q1 !== ''
                    && this.state.option2q1 !== '' && this.state.option3q1 !== ''
                    && this.state.option4q1 !== '' && this.state.correctq1 !== '' && this.state.points1 !== '') {

                    axios.post('/api/addQuestion', {
                        question: this.state.question1,
                        choices: inputtedOptions,
                        answerIndex: this.state.correctq1,
                        creator: this.state.tutorId,
                        quizId: this.props.match.params.id,
                        points: this.state.points1
                    })
                        .then((res) => {
                            swal("Question successfully added!", "", "success");
                            window.location.reload();
                            console.log(res);
                            console.log(this.state.course);
                        }, (error) => {
                            console.error("Could not add question to database (API call error) " + error);
                        });
                }
                else {
                    console.error("Empty fields");
                    swal("Could not add resource, empty or invalid fields.", "", "error")
                }
            }
        });
    }

    render() {
        const { classes } = this.props;
        let { datas, open, total } = this.state;

        return (
            <Paper>
                <React.Fragment>
                    <main>
                        <DashBoardNavBar />
                        <div className={classes.main}>
                            <div className={classes.questionButton}>
                                {this.state.accountType === "tutor" ?
                                    <Button variant="contained" size="lg" active onClick={() => { this.handleClickOpen(); }} className={classes.addQuestionToDb} >
                                        Add Questions
                                    </Button>
                                    :
                                    <br />
                                }
                            </div>

                            {datas.map((c, i) => (
                                <div className="col-lg-10 col-lg-offset-1">
                                    <div className={classes.question}>
                                        <h1> Question {i + 1}/{total}</h1>
                                        <p className={classes.p}>{c.question}</p>
                                    </div>
                                    <div id="answers">
                                        <ul className={classes.answersUl}>
                                            <li onClick={this.checkAnswer} className={classes.answersLi} data-id={`${c.choices[0]},${i},1`}><span className={classes.answersLiSpan}>A</span> <p className={classes.answersP}>{c.choices[0]}</p></li>
                                            <li onClick={this.checkAnswer} className={classes.answersLi} data-id={`${c.choices[1]},${i},2`}><span className={classes.answersLiSpan}>B</span> <p className={classes.answersP}>{c.choices[1]}</p></li>
                                            <li onClick={this.checkAnswer} className={classes.answersLi} data-id={`${c.choices[2]},${i},3`}><span className={classes.answersLiSpan}>C</span> <p className={classes.answersP}>{c.choices[2]}</p></li>
                                            <li onClick={this.checkAnswer} className={classes.answersLi} data-id={`${c.choices[3]},${i},4`}><span className={classes.answersLiSpan}>D</span> <p className={classes.answersP}>{c.choices[3]}</p></li>
                                        </ul>
                                    <div className={classes.DeleteQuestion}>
                                    {this.state.accountType === "tutor" ?
                                        <Button variant="contained" size="lg" active onClick={event => this.deleteQuestion(c._id)}>
                                            Delete Question
                                        </Button>
                                        :
                                        <br />
                                    }
                                </div>
                                    </div>
                                    <div className={classes.submit}>
                                        <br />
                                        {this.state.selectedAnswers[i] !== undefined ? `Answer Chosen: ${this.state.selectedAnswers[i]}` : `Answer Chosen: Please Choose an Answer`}
                                        <br />
                                        <b><font color={this.state.color[i]}>
                                            {this.state.finishedQuiz === true ?
                                                `Correct Answer : ${c.choices[c.answerIndex - 1]}`
                                                :
                                                <br />
                                            }
                                        </font>
                                        </b>
                                        <br />
                                    </div>
                                </div>
                            ))}
                            <div className={classes.wrapper}>
                                {this.state.showButtonStudent === true
                                    ? <button className={classes.fancyBtn} onClick={this.finishQuiz}>{'Finish quiz'}</button>
                                    : [
                                        (this.state.accountType === "tutor"
                                            ?
                                            <>
                                                <button className={classes.fancyBtn} onClick={() => window.location.replace("/chooseClassAndQuiz")}>{'Return To Main Quiz Page'}</button>
                                            </>
                                            : <></>
                                        ),
                                        (this.state.accountType === "student"
                                            ?
                                            <>
                                                <div className={classes.wrapper}>
                                                    <p> Congrats! You scored {this.state.totalPoints} points out of a total {this.state.totalScorePoints} for this {this.state.total} question quiz.</p>
                                                </div>
                                                <button className={classes.fancyBtn} onClick={() => window.location.replace("/choosetutorQuiz")}>{'Return To Main Quiz Page'}</button>
                                            </>
                                            : <></>
                                        )
                                    ]
                                }
                            </div>
                        </div>
                        <div>
                            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
                                <DialogTitle id="simple-dialog-title">{this.state.tutorFirstName} Add new Questions to Quiz</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="dense"
                                        id="question1"
                                        name="question1"
                                        onChange={e => this.setState({ question1: e.target.value })}
                                        autoComplete="question1"
                                        label="question1"
                                        defaultValue={this.state.question}
                                        fullWidth
                                    />
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="dense"
                                        id="points1"
                                        name="points1"
                                        onChange={e => this.setState({ points1: e.target.value })}
                                        label="Points"
                                        type="number"
                                        defaultValue={this.state.question}
                                        fullWidth
                                    />
                                    <TextField
                                        id="option1q1"
                                        name="option1q1"
                                        label="option1"
                                        onChange={e => this.setState({ option1q1: e.target.value })}
                                        defaultValue={this.state.option1q1}
                                        variant="outlined"
                                        style={{ width: '100%', marginTop: "35px" }}
                                    />
                                    <TextField
                                        id="option2q1"
                                        name="option2q1"
                                        label="option2"
                                        onChange={e => this.setState({ option2q1: e.target.value })}
                                        defaultValue={this.state.option2q1}
                                        variant="outlined"
                                        style={{ width: '100%', marginTop: "35px" }}
                                    />
                                    <TextField
                                        id="option3q1"
                                        name="option3q1"
                                        label="option3"
                                        onChange={e => this.setState({ option3q1: e.target.value })}
                                        defaultValue={this.state.option3q1}
                                        variant="outlined"
                                        style={{ width: '100%', marginTop: "35px" }}
                                    />
                                    <TextField
                                        id="option4q1"
                                        name="option4q1"
                                        label="option4"
                                        onChange={e => this.setState({ option4q1: e.target.value })}
                                        defaultValue={this.state.option4q1}
                                        variant="outlined"
                                        style={{ width: '100%', marginTop: "35px" }}
                                    />
                                    <br /><br />
                                    <FormControl className={classes.formControl}>
                                        <InputLabel>
                                            Please choose the right option
                                        </InputLabel>
                                        <Select onChange={e => this.setState({ correctq1: e.target.value })}>
                                            <MenuItem value={1}>One</MenuItem>
                                            <MenuItem value={2}>Two</MenuItem>
                                            <MenuItem value={3}>Three</MenuItem>
                                            <MenuItem value={4}>Four</MenuItem>
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
                                            <Button onClick={this.addQuestionToDb}>Save</Button>
                                        </DialogActions>
                                    </Grid>
                                </Grid>
                            </Dialog>
                        </div>
                    </main>
                </React.Fragment>
            </Paper>
        );
    }
};

export default withStyles(tutifyStyle.styles, { withTheme: true })(Questions);