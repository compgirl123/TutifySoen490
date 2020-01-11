import React from 'react';
import DashBoardNavBar from '../ProfilePage/DashBoardNavBar';
import Footer from '../Footer';
import * as ResourcesStyles from '../../styles/Resources-styles';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import ResourceNavigation from './ResourceNavigation';


class ResourcePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Toggle: false,
            primary: false,
            secondary: false,
            postsecondary: false,
            primaryResources: [
                {
                    img: "https://static.wixstatic.com/media/b470fe_19d8658f20074eddb3fc739477259f4b~mv2.jpg",
                    title: 'Resource Title',
                    desc: 'Resource Description',
                    link: 'http://www.google.com/',
                    category: "",
                },
            ],
            secondaryResources: [
                {
                    img: "https://static.wixstatic.com/media/b470fe_19d8658f20074eddb3fc739477259f4b~mv2.jpg",
                    title: 'Resource Title',
                    desc: 'Resource Description',
                    link: 'http://www.google.com/',
                    category: "",
                },
            ],
            postsecResources: [
                {
                    img: "http://www.tomatotimers.com/assets/images/logo.svg",
                    title: 'Pomodoro for Studying Efficiently',
                    desc: "The Pomodoro Technique is a time management method that can be used for any task. For many people, time is an enemy. The anxiety triggered by “the ticking clock”, especially when it involves a deadline, leads to ineffective work and study habits which in turn lead to procrastination. The aim of the Pomodoro Technique is to use time as a valuable ally in accomplishing what we want to do in the way we want to do it, and to enable us to improve continually the way we work or study.",
                    link: 'http://www.tomatotimers.com/',
                    category: "Studying",
                },
                {
                    img: "https://youthincmag.com/wp-content/uploads/2018/01/education-tools.jpg",
                    title: 'Study Smarter',
                    desc: 'Do you ever feel like your study habits simply aren’t cutting it? Do you wonder what you could be doing to perform better in class and on exams? Many students realize that their high school study habits aren’t very effective in college. This handout offers several tips on effective studying. Implementing these tips into your regular study routine will help you to efficiently and effectively learn course material. Experiment with them and find some that work for you.',
                    link: 'https://learningcenter.unc.edu/tips-and-tools/studying-101-study-smarter-not-harder/',
                    category: "Learning",
                },
            ],
        };
    }

    componentDidMount() {
        this.checkSession();
    }

    checkSession = () => {
        fetch('http://localhost:3001/api/checkSession', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(res => {
                if (res.isLoggedIn) {
                    this.setState({
                        Toggle: true,
                    });
                }
                else {
                    this.setState({ Toggle: false });
                }
            })
            .catch(err => console.log(err));
    };

    imgForLevel = () => {
        if (this.props.location.state.primary)
            return 'https://www.clipartwiki.com/clipimg/full/257-2579818_teacher-clip-early-childhood-kids-learn-cartoon-png.png'
        if (this.props.location.state.secondary)
            return 'https://24t9d72kcs873my15o9hr1pu-wpengine.netdna-ssl.com/wp-content/uploads/2017/09/student-productivity-toggl-702x526.jpg'
        if (this.props.location.state.postsecondary)
            return 'https://24t9d72kcs873my15o9hr1pu-wpengine.netdna-ssl.com/wp-content/uploads/2017/09/student-productivity-toggl-702x526.jpg'
    }


    render() {
        const { classes } = this.props;
        const { primary, secondary, postsecondary } = this.props.location.state;
        const { primaryResources, secondaryResources, postsecResources } = this.state;

        return (
            <React.Fragment>
                <DashBoardNavBar />
                <div className={classes.divContainer}>
                    <div className={classes.logo} >
                    <Typography variant="h2" component="h1" style={{marginRight: '20px'}} gutterBottom>
                        Tools and Resources
                    </Typography>
                        <img alt="logo" src={this.imgForLevel()}/>
                    </div>
                    {primary ? <ResourceNavigation res={primaryResources} /> : <></>}
                    {secondary ? <ResourceNavigation res={secondaryResources} /> : <></>}
                    {postsecondary ? <ResourceNavigation res={postsecResources} /> : <></>}
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default withStyles(ResourcesStyles.styles, { withTheme: true })(ResourcePage);