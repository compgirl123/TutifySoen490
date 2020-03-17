import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as tutifyStyle from '../../../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';

export class TutorInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tutor: "",
            first_name: "",
            last_name: "",
            email: "",
            school: "",
            subjects: [],
            courses: [],
            scroll: 'paper',
            tutorPicture: "",
            description: "",
            profilePicture: "",
        }
        this.getImg = this.getImg.bind(this);
    }

    componentDidMount() {
        this.getTutor()
    }
    //retrieves the tutor
    getTutor = () => {
        const tutor = this.props;
        console.info("Fetching tutor...");
        axios.get(`/getTutor/${tutor}`)
            .then(({ data: tutor }) => {
                console.log('tutor', tutor);
                this.setState({
                    tutor,
                    first_name: tutor.first_name,
                    last_name: tutor.last_name,
                    email: tutor.email,
                    school: tutor.school,

                });
                this.getImg();
            })
    };

    // Fetches the profile image file from our database
    getImg() {
        axios.get('/api/getPicture/' + this.state.profilePictureID.imgData)
            .then((res) => {
                this.setState({
                    profilePicture: res.data.data
                });
            }, (error) => {
                console.error("Could not get uploaded profile image from database (API call error) " + error);
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <React.Fragment>

                    <CardContent>
                        <img src={this.state.profilePicture} width="100%" height="40%" alt="Profile">
                        </img>
                    </CardContent>
                    <CardContent>
                        <Typography component="p" variant="h5" >
                            <Box fontWeight="fontWeightBold">
                                {this.state.first_name + " " + this.state.last_name}
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
              Email : {this.state.email}
                        </Typography>

                        <Typography className={classes.InfoContext}>
                            <br />
              Program of Study: {this.state.program_of_study}
                        </Typography>

                        <Typography className={classes.InfoContext}>
                            <br />
              School: {this.state.school}
                        </Typography>

                        <Typography className={classes.InfoContext}>
                            <br />
                  Description:<br />
                        </Typography>
                        <div style={{ maxHeight: 120, overflow: 'auto' }}>
                            <Typography className={classes.InfoContext}>
                                {this.state.description}
                            </Typography>
                        </div>
                        <br />
                    </CardContent>
                </React.Fragment>
            </Card >
        );
    }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorInfo);