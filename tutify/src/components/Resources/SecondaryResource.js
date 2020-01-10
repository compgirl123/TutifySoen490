import React from 'react';
import DashBoardNavBar from '../ProfilePage/DashBoardNavBar';
import Footer from '../Footer';
import * as ResourcesStyles from '../../styles/Resources-styles';
import { withStyles } from "@material-ui/core/styles";
import SecondaryResourceNavigation from './SecondaryResourceNavigation';
import Typography from '@material-ui/core/Typography';


class SecondaryResource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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
                        _id: res.userInfo._id,
                        todos: res.userInfo.todos,
                        tutors: res.userInfo.tutors,
                        notifications: res.userInfo.notifications
                    });
                    this.getDataFromDb()
                }
                else {
                    this.setState({ Toggle: false });
                }
            })
            .catch(err => console.log(err));
    };


    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <DashBoardNavBar />
                <div className={classes.divContainer}>
                    <Typography variant="h2" component="h1" align="center" gutterBottom>
                        Resources and Tools
                    </Typography>
                    <div className={classes.logo}>
                        <img alt="logo" src={'https://24t9d72kcs873my15o9hr1pu-wpengine.netdna-ssl.com/wp-content/uploads/2017/09/student-productivity-toggl-702x526.jpg'} />
                    </div>
                    <SecondaryResourceNavigation />
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default withStyles(ResourcesStyles.styles, { withTheme: true })(SecondaryResource);