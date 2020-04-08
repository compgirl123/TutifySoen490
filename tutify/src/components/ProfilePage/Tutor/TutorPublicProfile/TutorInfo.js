import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as tutifyStyle from '../../../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';

export class TutorInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { classes, tutor, profilePicture, email} = this.props;

        return (
            <Card className={classes.card}>
                <React.Fragment>
                    <CardContent>
                        <img src={profilePicture} width="100%" height="40%" alt="Profile">
                        </img>
                    </CardContent>
                    <CardContent>
                        <Typography component="p" variant="h5" >
                            <Box fontWeight="fontWeightBold">
                                {tutor.first_name + " " + tutor.last_name}
                            </Box>
                        </Typography>
                        <hr style={{
                            color: '#FFFFFF',
                            backgroundColor: '#FFFFFF',
                            height: .5,
                            borderColor: '#FFFFFF'
                        }} />
                        <br />
                        <Typography className={classes.InfoContext}>
              Email : {email}
                        </Typography>
                        <br />
                        <Typography className={classes.InfoContext}>
                            
              Program of Study: {tutor.program_of_study}
                        </Typography>
                        <br />
                        <Typography className={classes.InfoContext}>
              School: {tutor.school}
                        </Typography>
                    </CardContent>
                </React.Fragment>
            </Card >
        );
    }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorInfo);