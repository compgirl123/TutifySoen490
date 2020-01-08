import React from 'react';
import DashBoardNavBar from '../ProfilePage/DashBoardNavBar';
import Footer from '../Footer';
import * as ResourcesStyles from '../../styles/Resources-styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";


class ResourceLevels extends React.Component {
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
                        Select your Education Level
                    </Typography>
                    <Container className={classes.container}>
                        <Grid container spacing={4}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://www.irishtimes.com/polopoly_fs/1.3625946.1536688503!/image/image.jpg_gen/derivatives/box_620_330/image.jpg"
                                        title="Primary"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom align="center" variant="h5" component="h2">
                                            Primary
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://study.com/cimages/multimages/16/electives.jpeg"
                                        title="Secondary"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom align="center" variant="h5" component="h2">
                                            Secondary
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://www.macleans.ca/wp-content/uploads/2019/04/University-of-Alberta-Insider-Report.jpg"
                                        title="Post-Secondary"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom align="center" variant="h5" component="h2">
                                            Post-Secondary
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Container>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default withStyles(ResourcesStyles.styles, { withTheme: true })(ResourceLevels);