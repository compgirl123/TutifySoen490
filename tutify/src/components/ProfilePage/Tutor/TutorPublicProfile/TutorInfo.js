import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as tutifyStyle from '../../../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import EnrollButton from "../../../EnrollButton";
import ConnectButton from "../../../ConnectButton";

export class TutorInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    checkIfConnected(tutorID, studentTutors) {
        return studentTutors.some(item => item._id === tutorID)
    }

    render() {
        const { classes, tutor, profilePicture, email, studentID, studentTutors} = this.props;

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

                        <Typography className={classes.InfoContext}>
                            <br />
                            Email : {email}
                        </Typography>

                        <Typography className={classes.InfoContext}>
                            <br />
                            Program of Study: {tutor.program_of_study}
                        </Typography>

                        <Typography className={classes.InfoContext}>
                            <br />
                            School: {tutor.school}
                        </Typography>

                        {studentID != "" ? <>
                            <hr style={{
                                color: '#FFFFFF',
                                backgroundColor: '#FFFFFF',
                                height: .5,
                                borderColor: '#FFFFFF',
                                marginBottom:'20px',
                                marginTop:'20px'
                            }} />
                            <ConnectButton
                                isConnected={this.checkIfConnected(tutor._id,studentTutors)}
                                tutor={tutor}
                                userId={studentID}
                                id={tutor._id}
                            />
                            <EnrollButton
                                isConnected={this.checkIfConnected(tutor._id,studentTutors)}
                                tutor={tutor}
                            />
                            </> : <></>
                        }                      

                    </CardContent>
                </React.Fragment>
            </Card >
        );
    }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorInfo);