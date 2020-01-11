import React from 'react';
import DashBoardNavBar from '../ProfilePage/DashBoardNavBar';
import Footer from '../Footer';
import * as ResourcesStyles from '../../styles/Resources-styles';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import PostSecResourceNavigation from './PostSecResourceNavigation';
import PrimaryResourceNavigation from './PrimaryResourceNavigation';
import SecondaryResourceNavigation from './SecondaryResourceNavigation';


class ResourcePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Toggle: false,
            primary: false,
            secondary: false,
            postsecondary: false,
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
        if(this.props.location.state.primary)
            return 'https://www.clipartwiki.com/clipimg/full/257-2579818_teacher-clip-early-childhood-kids-learn-cartoon-png.png'
        if(this.props.location.state.secondary)
            return 'https://24t9d72kcs873my15o9hr1pu-wpengine.netdna-ssl.com/wp-content/uploads/2017/09/student-productivity-toggl-702x526.jpg'
        if(this.props.location.state.postsecondary)
            return 'https://24t9d72kcs873my15o9hr1pu-wpengine.netdna-ssl.com/wp-content/uploads/2017/09/student-productivity-toggl-702x526.jpg'
    }


    render() {
        const { classes } = this.props;
        const { primary, secondary, postsecondary } = this.props.location.state;

        return (
            <React.Fragment>
                <DashBoardNavBar />
                <div className={classes.divContainer}>
                    <Typography variant="h2" component="h1" align="center" gutterBottom>
                        Resources and Tools
                    </Typography>
                    <div className={classes.logo}>
                        <img alt="logo" src={this.imgForLevel()} />
                    </div>
                    {primary ?  <PrimaryResourceNavigation /> : <></>}
                    {postsecondary ?  <PostSecResourceNavigation /> : <></>}
                    {secondary ?  <SecondaryResourceNavigation /> : <></>}
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default withStyles(ResourcesStyles.styles, { withTheme: true })(ResourcePage);