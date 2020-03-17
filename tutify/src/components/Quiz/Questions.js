import React from 'react';
import * as tutifyStyle from '../../styles/Quiz-styles';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import DashBoardNavBar from '../DashBoardNavBar';

const datah = [
    {
        question: 'What does CSS stand for?',
        choices: ['Computer Style Sheets', 'Creative Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'],
        correct: '3'
    },
    {
        question: 'Where in an HTML document is the correct place to refer to an external style sheet?',
        choices: ['In the <head> section', 'In the <body> section', 'At the end of the document', 'You can\'t refer to an external style sheet'],
        correct: '1'
    }
]
var answersSelected = [];
var answersSelectedNumerical = [];
var colorArr=[];

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nr: 0,
            total: datah.length,
            questionAnswered: false,
            score: 0,
            finalScore: 0,
            displayPopup: 'flex',
            isAnswered: false,
            classNames: false,
            answerSelected: 0,
            datas: datah,
            selectedAnswers: [],
            answersSelectedNumerical: [],
            percent: "",
            finishedQuiz : false,
            showButton : true,
            color:['red','red'],
            
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
                    this.setState({ datas: res.data, session: res.session });
                }
                else {
                    this.setState({ datas: [], session: res.session });
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
            color:colorArr,
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
        this.setState({ finishedQuiz: true});
        this.setState({ showButton: false});
    }

    render() {
        const { classes } = this.props;
        let { datas, total } = this.state;

        return (
            <Paper>
                <React.Fragment>
                    <main>
                        <DashBoardNavBar />
                        <div className={classes.main}>
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
                                                `Correct Answer : ${datah[i].choices[datah[i].correct - 1]}`
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
                            {this.state.showButton === true?
                            <button className={classes.fancyBtn} onClick={this.finishQuiz}>{'Finish quiz'}</button>
                            :
                            <button className={classes.fancyBtn} >{'Return To Main Quiz Page'}</button>
                            }
                            </div>
                            
                        </div>
                    </main>
                </React.Fragment>
            </Paper>
        );
    }
};

export default withStyles(tutifyStyle.styles, { withTheme: true })(Questions);