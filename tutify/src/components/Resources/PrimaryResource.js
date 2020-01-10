import React from 'react';
import DashBoardNavBar from '../ProfilePage/DashBoardNavBar';
import Footer from '../Footer';
import * as ResourcesStyles from '../../styles/Resources-styles';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import PrimaryResourceNavigation from './PrimaryResourceNavigation';


class PrimaryResource extends React.Component {
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
                        <img alt="logo" src={'https://www.clipartwiki.com/clipimg/full/257-2579818_teacher-clip-early-childhood-kids-learn-cartoon-png.png'} />
                    </div>
                    <PrimaryResourceNavigation />
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default withStyles(ResourcesStyles.styles, { withTheme: true })(PrimaryResource);