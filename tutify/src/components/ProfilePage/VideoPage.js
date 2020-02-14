import React from "react";
import Typography from "@material-ui/core/Typography";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from '../Footer';
import DashBoardNavBar from '../DashBoardNavBar'
import Title from './Title';
import ReactPlayer from 'react-player';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import swal from '@sweetalert/with-react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";


// displaying the documents shared to students
export class Studentdocs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: ['https://www.youtube.com/watch?v=J4VYMNUg3QM', 'https://www.youtube.com/watch?v=3jAX0sX-nc0', 'https://www.youtube.com/watch?v=VfyYXW_0hA4&list=RDMMVfyYXW_0hA4&start_radio=1'],
            open: false
        };
    }


handleClose = () => {
  this.setState({ open: false, link: "", title: "", course: ""});
};


handleClickOpen = () => {
  this.setState({ open: true });
};

    addVideoToDb = () => {
        var tutor = [];
        tutor.push(this.state.id);
        swal({
          title: "Would you like to add the following video?",
          buttons: {
            confirm: "Yes",
            cancel: "Cancel",
          },
          content: (
            <div>
            <p><b>
                title: {this.state.title} </b>
              </p>
              <p>
              <p>
                link: {this.state.link}
              </p>
                course: {this.state.course}
              </p>
            </div>
          )
        })
          .then((value) => {
            if (value) {
              console.info("Adding video to db...");
              axios.post('/api/addVideoToDb', {
                link: this.state.link,
                title: this.state.title,
                course: this.state.course,
                tutor: tutor
              })
                .then((res) => {
                  this.getTutorDataFromDb();
                  swal("Video successfully added!", "", "success");
                  this.handleClose();
                }, (error) => {
                  console.error("Could not add video to database (API call error) " + error);
                });
            }
          });
      }

    render() {
        const { classes } = this.props;
        const { videos, open } = this.state;
        return (
            <React.Fragment>
                <main>
                    <DashBoardNavBar />
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Container maxWidth="lg" className={classes.container}>
                        <Button variant="contained" size="lg" active onClick={() => { this.handleClickOpen(); }} className={classes.addVideoButton} >
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

                        <div>

                <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
                  <DialogTitle id="simple-dialog-title">Add a new Video</DialogTitle>
                  <DialogContent>

                  <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="dense"
                      id="title"
                      name="title"
                      onChange={e => this.setState({ title: e.target.value })}
                      autoComplete="title"
                      label="Title"
                      type="title"
                      fullWidth
                    />
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="dense"
                      id="link"
                      name="link"
                      onChange={e => this.setState({ link: e.target.value })}
                      autoComplete="link"
                      label="Link"
                      fullWidth
                    />

                    <div>

                      <FormControl className={classes.formControl}
                      >
                        <InputLabel>
                          Course
                        </InputLabel>
                        <Select
                          onChange={e => this.setState({ course: e.target.value })}
                        >
                          <MenuItem value='Course'>Course</MenuItem>

                        </Select>
                      </FormControl>

                    </div>
                      <Button variant="contained" size="lg" active onClick={() => { this.addVideoToDb(); }} className={classes.formControl}>
                        Save
                      </Button>
                    

                  </DialogContent>
                  <Grid
                    container
                    direction="row-reverse"
                    justify="space-between"
                    alignItems="baseline"
                  >
                    <Grid item>
                      <DialogActions>
                        <Button onClick={this.handleClose}>Close</Button>
                      </DialogActions>
                    </Grid>

                  </Grid>

                </Dialog>
              </div>


                        {/* Footer */}
                        <Footer />
                    </main>
                </main>
            </React.Fragment>

        );
    }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(Studentdocs);

