import React from "react";
import Typography from "@material-ui/core/Typography";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from '../Footer';
import DashBoardNavBar from '../DashBoardNavBar'
import Table from '@material-ui/core/Table';
import Title from './Title';
import ReactPlayer from 'react-player';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';

// displaying the documents shared to students
export class Studentdocs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: ['https://www.youtube.com/watch?v=J4VYMNUg3QM', 'https://www.youtube.com/watch?v=3jAX0sX-nc0', 'https://www.youtube.com/watch?v=VfyYXW_0hA4&list=RDMMVfyYXW_0hA4&start_radio=1'],
        };
    }

    render() {
        const { classes } = this.props;
        const fixedHeightPaper = clsx(classes.paper);
        const { videos } = this.state;
        return (
            <React.Fragment>
                <main>
                    <DashBoardNavBar />
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Container maxWidth="lg" className={classes.container}>
                        <Button variant="contained" size="lg" active onClick={() => { this.handleClickOpen(); }} className={classes.addCourseButton} >
                    Add Video
               </Button>
                            <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                                List of Videos
                           </Typography>
                           <Title>Uploaded </Title>
                            <Grid container spacing={3}>
                                {/* Student Info */}
                                {videos.map((file, index) => (
                                <Grid item item xs={6} sm={6} lg={6}>
                                            <Card className={classes.card}>
                                            <CardActionArea>
                                                <CardMedia
                                                     className={classes.media}
                                                    title="French"
                                                />
                                                <CardContent>
                                                    <div >
                                                        <ReactPlayer
                                                            url={file}
                                                            className='react-player'
                                                            position='absolute'
                                                            width='100%'
                                                            height='100%'
                                                        />
                                                        
                                                    </div>
                                                </CardContent>
                                        </CardActionArea>
                                        </Card>
                                </Grid>
                                 ))}
                            </Grid>
                        </Container>
                        {/* Footer */}
                        <Footer />
                    </main>
                </main>
            </React.Fragment>

        );
    }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(Studentdocs);

