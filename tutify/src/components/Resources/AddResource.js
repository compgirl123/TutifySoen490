import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import swal from 'sweetalert';

class AddResource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openFeedback: false,
            scroll: 'paper',
            description: '',
            title: '',
            image: '',
            link: '',
            category: '',
            educationLevel: '',
        };
    }

    addResourceToDB = () => {
        axios.post('/api/addResource', {
            title: this.state.title,
            description: this.state.description,
            image: this.state.image,
            link: this.state.link,
            category: this.state.category,
            educationLevel: this.state.educationLevel
          }).then((res) => {
            console.info("Successfully added the resource");
            swal("Resource successfully added!", "", "success")
          })
            .catch(err => console.error("Could not add the resource to the database: "+err));
    }


    render() {
        const { open, handleClose } = this.props
        const { scroll } = this.state

        return (
            <Dialog
                open={open}
                handleClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"

            >
                <DialogTitle id="scroll-dialog-title" >
                    <div >
                        <Grid container spacing={2}>
                            <Grid item>
                                <Typography gutterBottom variant="h5">Add a Resource</Typography>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h5"></Typography>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText>
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
                            type="link"
                            fullWidth
                        />
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="dense"
                            id="image"
                            name="image"
                            onChange={e => this.setState({ image: e.target.value })}
                            autoComplete="image"
                            label="Image"
                            type="link"
                            fullWidth
                        />
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="dense"
                            id="educationLevel"
                            name="educationLevel"
                            onChange={e => this.setState({ educationLevel: e.target.value })}
                            autoComplete="educationLevel"
                            label="Education Level"
                            fullWidth
                        />
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="dense"
                            id="category"
                            name="category"
                            onChange={e => this.setState({ category: e.target.value })}
                            autoComplete="category"
                            label="Category"
                            fullWidth
                        />
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="dense"
                            id="description"
                            name="description"
                            multiline
                            rows="4"
                            variant="outlined"
                            defaultValue={this.state.description}
                            onChange={e => this.setState({ description: e.target.value })}
                            autoComplete="description"
                            label="Description"
                            fullWidth
                        />
                    </DialogContentText>
                </DialogContent>
                <Grid
                    container
                    direction="row-reverse"
                    justify="space-between"
                    alignItems="baseline"
                >
                    <Grid item>
                        <DialogActions>
                            <Button>Add</Button>
                        </DialogActions>
                    </Grid>
                    <Grid item>
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                    </Grid>

                </Grid>
            </Dialog>
        );
    }
}

export default (AddResource);