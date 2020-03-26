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
//var dec =  false;
//var dec = true;
 
class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nr: 0,
            questionAnswered: false,
            score: 0,
            finalScore: 0,
            displayPopup: 'flex',
            isAnswered: false,
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
            correctq2: "",
            percent: "",
            question1: "",
            points: 0,
            finishedQuiz: false,
            showButtonTutor: true,
            showButtonStudent: true,
            color: ['red', 'red'],
            open: false,
            questionsClicked: false,
            nbQuestionsAnswered: []
        }
        this.finishQuiz = this.finishQuiz.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        //this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        //this.checkQuestion = this.checkQuestion.bind(this);
        this.addPointstoDb = this.addPointstoDb.bind(this);
    }

    componentWillMount() {
        this.loadQuestions();
        this.checkSession();
    }

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
                localStorage.setItem("reloadTutor", true);
                window.location.reload(true);
            }
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
            localStorage.setItem("courses", courses);
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

    loadQuestions = () => {
        // here, add comment
        axios.get('/api/getSelectedQuizQuestions', {
            params: {
                quizId: this.props.match.params.id
            }
        }).then((res) => {
            // fetch the questions
            if (res.data !== undefined) {
                this.setState({ datas: res.data.data, session: res.session, total: res.data.data.length });
            }
            else {
                this.setState({ datas: [], session: res.session, total: [] });
            }
        })
            .catch(err => console.error("Could not get the questions from the database: " + err));
    }

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

    handleStartQuiz() {
        this.setState({
            displayPopup: 'none',
            nr: 1
        });
    }

    checkAnswer(e) {
        let elem = e.currentTarget;
        let questionIndex = Number((elem.dataset.id).split(",")[1]);
        specificQuestionsAnswered[questionIndex] = true;
        this.setState({nbQuestionsAnswered:specificQuestionsAnswered});
        let answer = Number((elem.dataset.id).split(",")[2]);
        let correct = Number(this.state.datas[(elem.dataset.id).split(",")[1]].answerIndex);
        let updatedClassNames = this.state.classNames;

        this.setState({ questionsClicked: true });

        if (this.state.finishedQuiz === false) {
            if (answer === correct) {
                if (this.state.score <= this.state.total - (this.state.total-1)) {
                    colorArr[(elem.dataset.id).split(",")[1]] = 'green';
                }
            }
            else {
                colorArr[(elem.dataset.id).split(",")[1]] = 'red';
            }

            this.setState({
                color: colorArr,
                classNames: updatedClassNames
            })

            answersSelected[(elem.dataset.id).split(",")[1]] = (elem.dataset.id).split(",")[0];
            answersSelectedNumerical[(elem.dataset.id).split(",")[1]] = Number((elem.dataset.id).split(",")[2]);

            this.setState({
                answerSelected: elem.dataset.id,
                selectedAnswers: answersSelected,
                answersSelectedNumerical: answersSelectedNumerical
            })
            this.handleShowButton();
        }
    }

    finishQuiz() {
        if(this.state.nbQuestionsAnswered.length < this.state.total){
            alert("Please Answer all Questions");
            console.info("If the number of answered questions is less than the total, inform user that they need to answer all questions");
        }
        else if (this.state.nbQuestionsAnswered.length == this.state.total){
            if(this.state.nbQuestionsAnswered.includes(undefined) == true){
                alert("Please Answer all Questions"); 
                console.info("If the number of answered questions is less than the total, inform user that they need to answer all questions");
            }
            else if (this.state.nbQuestionsAnswered.includes(undefined) == false){
                if(this.state.accountType === "student"){
                    if (this.state.questionsClicked === true) {
                        this.addPointstoDb();
                        this.setState({ finishedQuiz: true });
                        this.setState({ showButtonTutor: false });
                        this.setState({ showButtonStudent: false });
                    }
                    else if (this.state.questionsClicked === false) {
                        alert("Please Answer at least one Question");
                    }
                }
                else if(this.state.accountType === "tutor"){
                    if (this.state.questionsClicked === true) {
                        this.setState({ finishedQuiz: true });
                        this.setState({ showButtonTutor: false });
                        this.setState({ showButtonStudent: false });
                    }
                    else if (this.state.questionsClicked === false) {
                        alert("Please Answer at least one Question");
                    }
        
                }
            }
        } 
    }

    // This function adds the points earned for the completed Quiz to Db.
    addPointstoDb() {
        axios.post('/api/addAttempt', {
            points: this.state.points,
            quiz_id: this.props.match.params.id,
            studentId: this.state.tutorId
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
        //swal to confirm the addition of new question
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
                            <b>
                                Question: {this.state.question1}
                            </b>

                        </p>
                        <p>
                            <b>
                                Options: {this.state.options}
                            </b>
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
            //adds the link, title, and course to the db 
            .then((value) => {
                if (value) {
                    console.info("Adding question to db...");
                    axios.post('/api/addQuestion', {
                        question: this.state.question1,
                        choices: inputtedOptions,
                        answerIndex: this.state.correctq1,
                        creator: this.state.tutorId,
                        quizId: this.props.match.params.id
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
                            <p>
                                <div>
                                    {this.state.accountType === "tutor" ?
                                        <Button variant="contained" size="lg" active onClick={() => { this.handleClickOpen(); }} className={classes.addQuestionToDb} >
                                            Add Questions
                                    </Button>
                                        :
                                        <br />
                                    }
                                </div>
                            </p>
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

                            <div class={classes.wrapper}>
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
                                                <div class={classes.wrapper}>
                                                    <p> Congrats! You successfully completed this {this.state.total} question quiz.</p>
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
                                    <Button variant="contained" size="lg" active onClick={() => { this.addQuestionToDb(); }} className={classes.formControl}>
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
                    </main>
                </React.Fragment>
            </Paper>
        );
    }
};

export default withStyles(tutifyStyle.styles, { withTheme: true })(Questions);