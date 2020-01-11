import React from 'react';
import * as ResourcesStyles from '../../styles/Resources-styles';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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
                <a target="_blank" rel="noopener noreferrer" className={classes.link} href={this.state.link}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={this.state.image}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.title}
                                </Typography>
                                <Typography gutterBottom >
                                    {this.state.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </a>
            </React.Fragment>
        );
    }
}

export default withStyles(ResourcesStyles.styles, { withTheme: true })(ResourceCard);