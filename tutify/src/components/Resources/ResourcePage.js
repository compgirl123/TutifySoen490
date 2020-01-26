import React from 'react';
import DashBoardNavBar from '../ProfilePage/DashBoardNavBar';
import Footer from '../Footer';
import * as ResourcesStyles from '../../styles/Resources-styles';
import { withStyles } from "@material-ui/core/styles";
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
                    img: "https://code.org/shared/images/fill-485x260/courses/logo_tall_aquatic.jpg",
                    title: 'Learn to Code!',
                    desc: 'Code.org® is a nonprofit dedicated to expanding access to computer science in schools and increasing participation by women and underrepresented minorities. Our vision is that every student in every school has the opportunity to learn computer science, just like biology, chemistry or algebra.',
                    link: 'https://code.org/',
                    category: "Learning",
                },
                {
                    img: "https://lh5.googleusercontent.com/p/AF1QipMYLIMC7NAEZTgeMavOk6C35-z-YDvzLCFNliP5=w160-h160-k-no",
                    title: 'Allô Prof to answer your questions',
                    desc: 'Allô Prof is a website where you can contact teachers and ask questions about school material. It is also a place for students to connect and learn together!',
                    link: 'http://www.alloprof.qc.ca/',
                    category: "Studying",
                },
            ],
            secondaryResources: [
                {
                    img: "https://youthincmag.com/wp-content/uploads/2018/01/education-tools.jpg",
                    title: 'Study Smarter',
                    desc: 'Do you ever feel like your study habits simply aren’t cutting it? Do you wonder what you could be doing to perform better in class and on exams? Many students realize that their high school study habits aren’t very effective in college. This handout offers several tips on effective studying. Implementing these tips into your regular study routine will help you to efficiently and effectively learn course material. Experiment with them and find some that work for you.',
                    link: 'https://learningcenter.unc.edu/tips-and-tools/studying-101-study-smarter-not-harder/',
                    category: "Studying",
                },
                {
                    img: "https://www.helpguide.org/wp-content/uploads/2019/10/man-boy-canoe-768.jpg",
                    title: 'Exercising and Mental Health',
                    desc: 'You already know that exercise is good for your body. But did you know it’s also effective in dealing with depression, anxiety, stress, and more?',
                    link: 'https://www.helpguide.org/articles/healthy-living/the-mental-health-benefits-of-exercise.htm',
                    category: "Health",
                },
                {
                    img: "https://www.teljeunes.com/Teljeunes/media/skin/img/site_logo_tj.png",
                    title: 'Need to Talk?',
                    desc: 'You don’t need to give your name. It’s confidential!',
                    link: 'https://www.teljeunes.com/Tel-jeunes-en',
                    category: "Health",
                },
                {
                    img: "https://images.radio-canada.ca/q_auto,w_1250/v1/ici-info/16x9/rentree-cegep-sherbrooke-2.jpg",
                    title: 'Tips to Choose the Right CEGEP for You!',
                    desc: 'Graduating from high school can be a stressful moment, but it does not have to be if you prepare!',
                    link: 'https://www.cegepsquebec.ca/en/cegeps/presentation/comment-bien-choisir-son-cegep/',
                    category: "Career",
                },
                {
                    img: "https://themedallion.ndahingham.com/wp-content/uploads/2019/01/quizlet_logo_large-900x450.png",
                    title: 'Quizlet',
                    desc: 'Search millions of study sets or create your own. Improve your grades by studying with flashcards, games and more.',
                    link: 'https://quizlet.com/',
                    category: "Studying",
                },
                {
                    img: "https://cdn.kastatic.org/images/khan-logo-dark-background.new.png",
                    title: 'Khan Academy',
                    desc: 'Created by experts, Khan Academy’s library of trusted practice and lessons covers math, science, and more. Always free for learners and teachers.',
                    link: 'https://www.khanacademy.org/',
                    category: "Learning",
                },
                {
                    img: "https://www.thoughtco.com/thmb/FUPoW69rRwqaMg-NYg2c02iEm00=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ScienceNotes-58de6ffa5f9b58468363a555.jpg",
                    title: 'Writing a Lab Report',
                    desc: 'A lab report is how you explain what you did in ​your experiment, what you learned, and what the results meant. Here is a template that can help you structure your writing.',
                    link: 'https://www.thoughtco.com/how-to-write-a-lab-report-606052',
                    category: "Writing",
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
                    category: "Studying",
                },
                {
                    img: "https://miro.medium.com/max/1200/0*UEtwA2ask7vQYW06.png",
                    title: 'Stack Overflow - Coding questions',
                    desc: 'Stack Overflow is an open community for anyone that codes. We help you get answers to your toughest coding questions, share knowledge with your coworkers in private, and find your next dream job.',
                    link: 'https://stackoverflow.com/',
                    category: "Learning",
                },
                {
                    img: "https://is5-ssl.mzstatic.com/image/thumb/Purple128/v4/d0/d3/5e/d0d35e99-cc11-9a0a-63e3-e023d36b955a/WolframAlpha-AppIcon-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-4.png/1200x630wa.png",
                    title: 'Wolfram Alpha',
                    desc: "Compute expert-level answers using Wolfram’s breakthrough algorithms, knowledgebase and AI technology",
                    link: 'https://www.wolframalpha.com/',
                    category: "Learning",
                },
                {
                    img: "https://www.headspace.com/static/images/logo.svg",
                    title: 'HeadSpace',
                    desc: "Manage your stress and anxiety for a healthier and happier self.",
                    link: 'https://www.headspace.com/',
                    category: "Health",
                },
                {
                    img: "https://armacad.info/images/2019/11/24/eb2c273d3cf13c60.png",
                    title: 'How to Write a CV',
                    desc: "A CV provides a potential employer with a quick summary/overview of your experience, background and skills to help them decide if you are a good candidate to invite for an interview. CVs are also often required as part of graduate/professional school applications.",
                    link: 'https://www.mcgill.ca/caps/files/caps/guide_cv.pdf',
                    category: "Career",
                },
                {
                    img: "https://media.consumeraffairs.com/files/cache/logos/ashford-university_logo_256_widget_logo.png",
                    title: 'Writing an Article Critique',
                    desc: "An article critique requires you to critically read a piece of research and identify and evaluate the strengths and weaknesses of the article. Click here to learn more about how to write a strong critique.",
                    link: 'https://writingcenter.ashford.edu/writing-article-critique',
                    category: "Writing",
                },
                {
                    img: "https://blog.worldcampus.psu.edu/wp-content/themes/PSUOutreachMarketing-WorldCampusBlog/images/penn-state-world-campus.svg",
                    title: 'Staying Healthy during Final Exams',
                    desc: "During the crunch of finals, food might be one of the last things on your mind. But certain foods can actually help your brain work at optimal levels, and with a little bit of planning, your diet may help you do better on your finals.",
                    link: 'https://blog.worldcampus.psu.edu/the-best-foods-to-eat-during-finals/',
                    category: "Health",
                },
                {
                    img: "https://grad.berkeley.edu/assets/img/grad-div-header.png",
                    title: 'Writing a Statement of Purpose',
                    desc: "The statement of purpose should convince readers– the faculty on the selection committee– that you have solid achievements behind you that show promise for your success in graduate study. Think of the statement of purpose as a composition with four different parts.",
                    link: 'https://grad.berkeley.edu/admissions/apply/statement-purpose/',
                    category: "Writing",
                },
            ],
        };
    }

    componentDidMount() {
        this.checkSession();
    }

    checkSession = () => {
        fetch('/api/checkSession', {
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
        if (this.props.location.state.postsecondary)
            return {
                justifyContent:'center', 
                alignItems:'center',
                minHeight: '450px',
                backgroundImage: 'url("https://24t9d72kcs873my15o9hr1pu-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/student-productivity-toggl-460x275.jpg")'
            }
        if (this.props.location.state.secondary)
            return {
                minHeight: '450px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: 'url("https://westminsterlincoln.org/wp-content/uploads/2018/07/Cornwal-Public-Library-Book-Stack-Header.jpg")'
            }
        if (this.props.location.state.primary)
            return {
                minHeight: '450px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: 'url("https://images.squarespace-cdn.com/content/v1/57b93284e4fcb5fdb2aa62c0/1477843411111-R1TYUZHFJ00HAM46RF8Q/ke17ZwdGBToddI8pDm48kDxhhhwBddJ9fDxYAvV-2zp7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0lfYLKn_Tkl3ql2udpuE0YVV890f3o8Id5G8tJhHvhmC6z2Yvz7ttIxB3b9uYcWrOg/Education+Banner.png?format=2500w")'
            } 
    }


    render() {
        const { classes } = this.props;
        const { primary, secondary, postsecondary } = this.props.location.state;
        const { primaryResources, secondaryResources, postsecResources } = this.state;

        return (
            <React.Fragment>
                <DashBoardNavBar />
                <div className={classes.logo} style={this.imgForLevel()} >
                    <div style={{minHeight:'450px'}}>
                    </div>
                </div>
                <div>
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