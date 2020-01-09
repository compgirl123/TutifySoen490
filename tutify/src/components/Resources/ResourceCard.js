import React from 'react';
import DashBoardNavBar from '../ProfilePage/DashBoardNavBar';
import Footer from '../Footer';
import * as ResourcesStyles from '../../styles/Resources-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import ResourceNavigation from './ResourceNavigation';


class ResourceCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: props.image,
            title: props.title,
            description: props.description,
            link: props.link,
        };
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Link className={classes.link} to={this.state.link}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={this.state.image}
                                title={this.state.title}
                            />
                            <CardContent>
                                <Typography gutterBottom align="center" variant="h5" component="h2">
                                    {this.state.title}
                                </Typography>
                                <Typography gutterBottom >
                                    {this.state.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>
            </React.Fragment>
        );
    }
}

export default withStyles(ResourcesStyles.styles, { withTheme: true })(ResourceCard);