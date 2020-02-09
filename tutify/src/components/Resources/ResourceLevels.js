import React from 'react';
import DashBoardNavBar from '../DashBoardNavBar';
import Footer from '../Footer';
import * as ResourcesStyles from '../../styles/Resources-styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import AddResource from "./AddResource";



const useStyles = makeStyles(theme => ({
    addResource: {
        margin: '0 auto',
    },
}));

// This functional component is used for conditional rendering
// If User is logged in as a tutor, the component will be rendered
function AddResourceButton(props) {
    const classes = useStyles();
    if (props.isTutor) {
        return (
            <div className={classes.addResource}>
                <Button variant="contained" size="large" onClick={props.handleOpen}>
                    Add a resource
                </Button>
            </div>
        );
    }
    return <></>;
}
class ResourceLevels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTutor: false,
            open: false,
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
    }

    componentWillMount() {
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
                    if (res.userInfo.__t === 'tutor') {
                        this.setState({
                            isTutor: true,
                        })
                    }
                }
                else {
                    this.setState({ Toggle: false });
                }
            })
            .catch(err => console.error("Session could not be checked: " + err));
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
                        <Grid container spacing={10}>
                            <Link className={classes.link} to={{ pathname: '/primary', state: { primary: true } }} >
                                <Card className={classes.ResCard}>
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
                            </Link>
                            <Link className={classes.link} to={{ pathname: '/secondary', state: { secondary: true } }} >
                                <Card className={classes.ResCard}>
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
                            </Link>
                            <Link className={classes.link} to={{ pathname: '/postsecondary', state: { postsecondary: true } }} >
                                <Card className={classes.ResCard}>
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
                            </Link>
                            <AddResourceButton handleOpen={this.handleOpen} isTutor={this.state.isTutor} />
                            <AddResource open={this.state.open} handleClose={this.handleClose} />
                        </Grid>
                    </Container>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default withStyles(ResourcesStyles.styles, { withTheme: true })(ResourceLevels);