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
import MenuItem from "@material-ui/core/MenuItem";
import Grid from '@material-ui/core/Grid';

var answersSelected = [];
var answersSelectedNumerical = [];
var colorArr = [];

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
            percent: "",
            finishedQuiz: false,
            showButton: true,
            color: ['red', 'red'],
            open: false,
        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.finishQuiz = this.finishQuiz.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    componentWillMount() {
        this.loadQuestions();
    }

    async loadQuestions() {
        fetch('/api/getAllQuestions')
            .then(res => res.json())
            .then(res => {
                if (res.data !== undefined) {
                    this.setState({ datas: res.data, session: res.session, total: res.data.length });
                }
                else {
                    this.setState({ datas: [], session: res.session, total: [] });
                }
                console.info("The files have been loaded");
            })
            .catch(err => console.error("Could not load the files: " + err));
    }

    nextQuestion() {
        let { nr, total } = this.state;

        if (this.state.answerSelected === this.state.correct) {
            this.handleIncreaseScore();
        }

        if (nr === total) {
            this.setState({
                displayPopup: 'flex'
            });
        } else {
            this.pushData(nr);
            this.setState({
                showButton: false,
                questionAnswered: false
            });
            this.setState({
                showButton: false,
                questionAnswered: false
            });
        }

    }

    handleShowButton() {
        this.setState({
            showButton: true,
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

    handleIncreaseScore() {
        this.setState({
            score: this.state.score + 1
        });
    }

    checkAnswer(e) {
        let elem = e.currentTarget;
        let answer = Number((elem.dataset.id).split(",")[2]);
        let correct = Number(this.state.datas[(elem.dataset.id).split(",")[1]].answerIndex);
        let updatedClassNames = this.state.classNames;

        if (answer === correct) {
            if (this.state.score <= this.state.total - 1) {
                this.handleIncreaseScore();
                colorArr[(elem.dataset.id).split(",")[1]] = 'green';
            }
        }
        else {
            colorArr[(elem.dataset.id).split(",")[1]] = 'red';
        }
        console.log(colorArr);
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

    componentDidMount() {
        this.setState({
            classNames: ['', '', '', '']
        });
    }

    finishQuiz() {
        this.setState({ finalScore: this.state.score });
        this.setState({ finishedQuiz: true });
        this.setState({ showButton: false });
    }
     // Adding a new question according to what the user inputs into the Dialog box to the db
     addQuestionToDb = () => {
        var tutor = [];
        var inputtedOptions = [];
        tutor.push(this.state.id);
        inputtedOptions.push(this.state.option1,this.state.option2,this.state.option3,this.state.option4);
        console.log(inputtedOptions);
        this.setState({options: inputtedOptions});
        console.log(inputtedOptions);
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
                                Options: {this.state.options}
                            </b>
                            <p>Option 1: {this.state.option1}</p>
                            <p>Option 2: {this.state.option2}</p>
                            <p>Option 3: {this.state.option3}</p>
                            <p>Option 4: {this.state.option4}</p>
                        </p>
                        <p>
                            <b>
                            Correct: {this.state.videoLink}
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
                    console.info("Adding video to db...");
                    if (this.state.title !== '' && this.state.description !== '' &&
                        this.state.videoLink !== '' && this.isURL(this.state.videoLink)&& 
                        this.state.tutorId !== '' && this.state.course !== '') {
                        axios.post('/api/addQuestion', {
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


    render() {
        const { classes } = this.props;
        let { datas,  open, total } = this.state;

        return (
            <Paper>
                <React.Fragment>
                    <main>
                        <DashBoardNavBar />
                        <div className={classes.main}>
                            <p>
                            <div>
                            <Button variant="contained" size="lg" active onClick={() => { this.handleClickOpen(); }} className={classes.addQuestionToDb} >
                            Add Questions
                            </Button>
                            </div>
                            </p>
                            {datas.map((c, i) => (
                                <div className="col-lg-10 col-lg-offset-1">
                                    <div className={classes.question}>
                                        <h4 className={classes.h4}> Question {i + 1}/{total}</h4>
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
                                <p>Score: You got {this.state.finalScore}/ {this.state.total} or {(this.state.finalScore / this.state.total) * 100} %</p>
                            </div>
                            <div class={classes.wrapper}>
                                {this.state.showButton === true ?
                                    <button className={classes.fancyBtn} onClick={this.finishQuiz}>{'Finish quiz'}</button>
                                    :
                                    <button className={classes.fancyBtn} onClick={() => window.location.replace("/chooseClassAndQuiz")}>{'Return To Main Quiz Page'}</button>
                                }
                            </div>
                        </div>

                        <div>
                            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
                                <DialogTitle id="simple-dialog-title">{this.state.tutorFirstName}Add more questions</DialogTitle>
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
                                        //onChange={e => { handleVideoEmbedding(e) }}
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
                                        id="question"
                                        name="question"
                                        //onChange={e => { handleVideoEmbedding(e) }}
                                        autoComplete="question"
                                        label="question"
                                        defaultValue={this.state.question}
                                        fullWidth
                                    />
                                    <FormControl className={classes.formControl}>
                                        <InputLabel>
                                            Course
                                         </InputLabel>
                                        <Select
                                            onChange={e => this.setState({ course: e.target.value })}>
                                            {/* {categoryOptions.map((category, index) => (
                                                <MenuItem value={category}>{category}</MenuItem>
                                            ))} */}
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
                    </main>
                </React.Fragment>
            </Paper>
        );
    }
};

export default withStyles(tutifyStyle.styles, { withTheme: true })(Questions);