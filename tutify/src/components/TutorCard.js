import React, { Component } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip'
import CardActionArea from '@material-ui/core/CardActionArea';
import { BrowserRouter as Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import * as tutifyStyle from '../styles/SearchTutors-styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class TutorCard extends Component {
    // initialize our state
    constructor(props) {
        super(props);
    }

    assignTutor(e, tutor) {
        axios.post('http://localhost:3001/api/assignTutor', {
            student_id: "5dacd2a3c5c0dd6bb0dd1d91", //for testing - profile cynthiatt (to get from session) 
            tutor_id: tutor._id,
        });
    }

    render() {
        const { classes } = this.props
        const { tutor } = this.props

        return (
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardActionArea component={Link} to="/profile_tutor">
                        <CardMedia
                            className={classes.cardMedia}
                            image={tutor.picture}
                            title={tutor.first_name + " " + tutor.last_name}
                        />
                    </CardActionArea>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h5" component="h2">

                            {tutor.first_name} {tutor.last_name}

                        </Typography>
                        <Typography component={'span'}>
                            <span className={classes.school}>{tutor.school}</span>
                            {tutor.program !== "" && (
                                <span className={classes.program}> - {tutor.program}</span>
                            )}
                            <br />
                            {tutor.subjects.map((sub, index) => (
                                <Chip
                                    key={index}
                                    className={classes.chip}
                                    icon={<CheckIcon />}
                                    color="secondary"
                                    label={sub}
                                />
                            ))}
                            <br />
                            <Button onClick={event => this.assignTutor(event, tutor)}>Connect</Button>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorCard);