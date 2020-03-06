import React from 'react';
import data from './data';
import * as tutifyStyle from '../../styles/Quiz-styles';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import DashBoardNavBar from '../DashBoardNavBar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const dataa = [
    {
        question: 'What does CSS stand for?',
        answers: ['Computer Style Sheets', 'Creative Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'],
        correct: 3
    },
    {
        question: 'Where in an HTML document is the correct place to refer to an external style sheet?',
        answers: ['In the <head> section', 'In the <body> section', 'At the end of the document', 'You can\'t refer to an external style sheet'],
        correct: 1
    }
]
var ahh = [];
var nome = [];
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nr: 0,
            total: dataa.length,
            showButton: false,
            questionAnswered: false,
            score: 0,
            displayPopup: 'flex',
            isAnswered: false,
            classNames: false,
            test: 0,
            datas: dataa,
            haha: [],
            nome: []
        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.last = this.last.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    pushData(nr) {
        this.setState({
            question: data[nr].question,
            answers: [data[nr].answers[0], data[nr].answers[1], data[nr].answers[2], data[nr].answers[3]],
            correct: data[nr].correct,
            nr: this.state.nr + 1
        });
    }

    componentWillMount() {
        let { nr } = this.state;
        this.pushData(nr);
        console.log(this.state.datas);
    }

    nextQuestion() {
        let { nr, total, score } = this.state;
        //alert(this.state.answers[this.state.correct-1])
        let { correct, increaseScore } = this.props;

        if (this.state.test === this.state.correct) {
            //this.state.classNames[this.state.test-1] = 'right';
            this.handleIncreaseScore();
        }
        else {
            //this.state.classNames[this.state.test-1] = 'wrong';
        }

        if (nr === total) {
            this.setState({
                displayPopup: 'flex'
            });
            alert(this.state.score);
        } else {
            this.pushData(nr);
            //alert(nr);
            this.setState({
                showButton: false,
                questionAnswered: false
            });
            this.setState({
                showButton: false,
                questionAnswered: false
            });
            //alert(this.state.nr);
        }

    }

    handleShowButton() {
        //alert(data[(this.state.nr)-1].answers[this.state.nr]);
        this.setState({
            showButton: true,
            questionAnswered: true
        })

    }

    handleStartQuiz() {
        //alert("sweet");
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
        let { isAnswered } = this.props;
        //if(!isAnswered) {
        let elem = e.currentTarget;
        let { correct, increaseScore } = this.props;
        let answer = Number(elem.dataset.id);
        let updatedClassNames = this.state.classNames;
        console.log((elem.dataset.id).split(","));
        //console.log(answer);
        if (answer === correct) {
            alert("ehhlo");
            /*alert("HIHIHI");
            alert(answer);*/
            //updatedClassNames[answer-1] = 'right';
            increaseScore();
        }
        else {
            /*alert("wrong");
            alert(answer);*/

            //updatedClassNames[answer-1] = 'wrong';
        }
        this.setState({
            classNames: updatedClassNames
        })

        ahh[(elem.dataset.id).split(",")[1]] = (elem.dataset.id).split(",")[0];
        nome[(elem.dataset.id).split(",")[1]] = Number((elem.dataset.id).split(",")[2]);
        console.log(ahh);
        console.log(this.state.datas[(elem.dataset.id).split(",")[1]].question);
        this.state.datas[(elem.dataset.id).split(",")[1]].yo = (elem.dataset.id).split(",")[0];
        console.log(this.state.datas[(elem.dataset.id).split(",")[1]]);
        console.log(nome);

        this.setState({
            test: elem.dataset.id,
            haha: ahh,
            nome: nome
        })

        this.handleShowButton();
        //}
    }

    componentDidMount() {
        this.setState({
            classNames: ['', '', '', '']
        });

        return true;
    }
    last() {
        alert(this.state.nome);
    }

    render() {
        let { answers } = this.props;
        const { classes } = this.props;
        let { classNames, datas } = this.state;

        let { nr, total, question, correct, showButton, questionAnswered, displayPopup, score } = this.state;

        return (
            <Paper>
                <React.Fragment>
                    <main>
                        <DashBoardNavBar />
                        <div className={classes.main}>
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Quiz Answers
                            </Typography>
                            {datas.map((c, i) => (
                                <div className="col-lg-10 col-lg-offset-1">
                                    <div className={classes.question}>
                                        <h4 className={classes.h4}> Question {i + 1}/{total}</h4>
                                        <p className={classes.p}>{c.question}</p>
                                    </div>
                                    <div id="answers">
                                        <ul className={classes.answersUl}>
                                            <li onClick={this.checkAnswer} className={classes.answersLi} data-id={c.answers[0] + "," + i + "," + "1"}><span className={classes.answersLiSpan}>A</span> <p className={classes.answersP}>{c.answers[0]}</p></li>
                                            <li onClick={this.checkAnswer} className={classes.answersLi} data-id={c.answers[1] + "," + i + "," + "2"}><span className={classes.answersLiSpan}>B</span> <p className={classes.answersP}>{c.answers[1]}</p></li>
                                            <li onClick={this.checkAnswer} className={classes.answersLi} data-id={c.answers[2] + "," + i + "," + "3"}><span className={classes.answersLiSpan}>C</span> <p className={classes.answersP}>{c.answers[2]}</p></li>
                                            <li onClick={this.checkAnswer} className={classes.answersLi} data-id={c.answers[3] + "," + i + "," + "4"}><span className={classes.answersLiSpan}>D</span> <p className={classes.answersP}>{c.answers[3]}</p></li>
                                        </ul>
                                    </div>
                                    <div className={classes.submit}>
                                        <br />
                                        {this.state.haha[i] !== undefined ? "Answer Chosen: " + this.state.haha[i] : "Answer Chosen: " + "Please Choose an Answer"}
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            ))}
                            <div class={classes.wrapper}>
                                <button className={classes.fancyBtn} onClick={this.last} >{'Finish quiz'}</button>
                            </div>
                        </div>
                        {/*<div className={classes.main}>
                            <div className="row">
                                <div className="col-lg-10 col-lg-offset-1">
                                    <div className={classes.question}>
                                        <h4 className={classes.h4}> Question {nr}/{total}</h4>
                                        <p className={classes.p}>{question}</p>
                                    </div>
                                    <div id="answers">
                                        <ul className={classes.answersUl}>
                                            <li onClick={this.checkAnswer} className={classes.answersLi} data-id="1"><span className={classes.answersLiSpan}>A</span> <p className={classes.answersP}>{this.state.answers[0]}</p></li>
                                            <li onClick={this.checkAnswer} className={classes.answersLi} data-id="2"><span className={classes.answersLiSpan}>B</span> <p className={classes.answersP}>{this.state.answers[1]}</p></li>
                                            <li onClick={this.checkAnswer} className={classes.answersLi} data-id="3"><span className={classes.answersLiSpan}>C</span> <p className={classes.answersP}>{this.state.answers[2]}</p></li>
                                            <li onClick={this.checkAnswer} className={classes.answersLi} data-id="4"><span className={classes.answersLiSpan}>D</span> <p className={classes.answersP}>{this.state.answers[3]}</p></li>
                                        </ul>
                                    </div>
                                    <div className={classes.submit}>
                                    <br/>
                                        {this.state.test > 0 ? "Answer Chosen: "+ this.state.answers[this.state.test-1] :<br/>}
                                        <br/>
                                    <br/>
                                        {showButton ? <button className={classes.fancyBtn} onClick={this.nextQuestion} >{nr === total ? 'Finish quiz' : 'Next question'}</button> : null}
                                    </div>
                                </div>
                            </div>

                        </div>*/}
                    </main>
                </React.Fragment>
            </Paper>

        );
    }
};

//export default Main
export default withStyles(tutifyStyle.styles, { withTheme: true })(Main);