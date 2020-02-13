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
                            <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                                List of Videos
                           </Typography>
                            <Grid container spacing={2}>
                                {/* Student Info */}
                                <Grid item xs={12} md={12} lg={24}>
                                    <Paper className={fixedHeightPaper}>
                                        <React.Fragment>
                                            <Title>Uploaded </Title>
                                            <Table size="small">
                                                {videos.map((file, index) => (
                                                    <div className='player-wrapper' position="relative" padding-top="56.25%" >
                                                        <ReactPlayer
                                                            url={file}
                                                            className='react-player'
                                                            position='absolute'
                                                            top="0"
                                                            left="0"
                                                            width='100%'
                                                            height='100%'
                                                        />
                                                    </div>))}
                                            </Table>
                                        </React.Fragment>
                                    </Paper>
                                </Grid>
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

