import React from 'react';
import data from './data';
import * as tutifyStyle from '../../styles/Quiz-styles';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import DashBoardNavBar from '../DashBoardNavBar';

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
var answersSelected = [];
var answersSelectedNumerical = [];
class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nr: 0,
            total: dataa.length,
            showButton: false,
            questionAnswered: false,
            score: 0,
            finalScore : 0,
            displayPopup: 'flex',
            isAnswered: false,
            classNames: false,
            answerSelected: 0,
            datas: dataa,
            selectedAnswers: [],
            answersSelectedNumerical: [],
            percent: ""
        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.last = this.last.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
        this.handleDecreaseScore = this.handleDecreaseScore.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    pushData(nr) {
        this.setState({
            question: data[nr].question,
            answers: [data[nr].answers[0], data[nr].answers[1], data[nr].answers[2], data[nr].answers[3]],
            correct: data[nr].correct,
            nr: this.state.nr 
        });
    }

    componentWillMount() {
        let { nr } = this.state;
        this.pushData(nr);
    }

    nextQuestion() {
        let { nr, total} = this.state;

        if (this.state.answerSelected === this.state.correct) {
            this.handleIncreaseScore();
        }
        else{
            this.handleDecreaseScore();
        }

        if (nr === total) {
            this.setState({
                displayPopup: 'flex'
            });
            alert(this.state.score);
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
    
    handleDecreaseScore() {
        this.setState({
            score: this.state.score - 1
        });
    }

    checkAnswer(e) {
        let elem = e.currentTarget;
        let answer = Number((elem.dataset.id).split(",")[2]);
        let correct = Number(this.state.datas[(elem.dataset.id).split(",")[1]].correct);
        let updatedClassNames = this.state.classNames;
      
        if (answer === correct) {
            if(this.state.score <= this.state.total - 1){
                this.handleIncreaseScore();
            }
        }
        else{
            if(this.state.score > 0){
                this.handleDecreaseScore();
            }
        }
  
        this.setState({
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

        return true;
    }

    last() {
        this.setState({finalScore:this.state.score});
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
                                            <li onClick={this.checkAnswer} className={classes.answersLi} data-id={`${c.answers[0]},${i},1`}><span className={classes.answersLiSpan}>A</span> <p className={classes.answersP}>{c.answers[0]}</p></li>
                                            <li onClick={this.checkAnswer} className={classes.answersLi} data-id={`${c.answers[1]},${i},2`}><span className={classes.answersLiSpan}>B</span> <p className={classes.answersP}>{c.answers[1]}</p></li>
                                            <li onClick={this.checkAnswer} className={classes.answersLi} data-id={`${c.answers[2]},${i},3`}><span className={classes.answersLiSpan}>C</span> <p className={classes.answersP}>{c.answers[2]}</p></li>
                                            <li onClick={this.checkAnswer} className={classes.answersLi} data-id={`${c.answers[3]},${i},4`}><span className={classes.answersLiSpan}>D</span> <p className={classes.answersP}>{c.answers[3]}</p></li>
                                        </ul>
                                    </div>
                                    <div className={classes.submit}>
                                        <br />
                                        {this.state.selectedAnswers[i] !== undefined ? `Answer Chosen: ${this.state.selectedAnswers[i]}` : `Answer Chosen: Please Choose an Answer}`}
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            ))}
                            <div class={classes.wrapper}>
                                <button className={classes.fancyBtn} onClick={this.last} >{'Finish quiz'}</button>
                            </div>
                            <div class={classes.wrapper}>
                                <p>Score: You got {this.state.finalScore}/ {this.state.total} or {(this.state.finalScore / this.state.total) * 100} %</p>
                            </div>
                            <div class={classes.wrapper}>
                                <button className={classes.fancyBtn} onClick={() => window.location.replace("/quizResults/")} >{'View Answers'}</button>
                            </div>
                        </div>
                    </main>
                </React.Fragment>
            </Paper>
        );
    }
};

export default withStyles(tutifyStyle.styles, { withTheme: true })(Questions);