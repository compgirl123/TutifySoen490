import React, { Component } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';

class AddResource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openFeedback: false,
            scroll: 'paper',
        };
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
                        <Typography variant="h5">
                            
                        </Typography>
                        
                    </DialogContentText>
                    <DialogContentText>
                        <Typography>
                            Contact
                        </Typography>
                        
                    </DialogContentText>
                    <DialogContentText>
                        <Typography>
                            Availabilities
                        </Typography>
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
                            <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                    </Grid>
                    <Grid item>
                        <DialogActions>
                            
                        </DialogActions>
                    </Grid>
                </Grid>
            </Dialog>
        );
    }
}

export default (AddResource);