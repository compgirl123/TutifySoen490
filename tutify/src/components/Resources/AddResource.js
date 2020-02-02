import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import swal from 'sweetalert';

function EducationMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (value) => {
        props.setEducationLevel(value);
        setAnchorEl(null);      
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                {props.currentValue === "" ? "Education Level" : props.currentValue}
            </Button>
            <Menu
                id="educationLevel"
                anchorEl={anchorEl}
                keepMounted
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleClose("Primary")}>Primary</MenuItem>
                <MenuItem onClick={() => handleClose("Secondary")}>Secondary</MenuItem>
                <MenuItem onClick={() => handleClose("PostSecondary")}>Post-Secondary</MenuItem>
            </Menu>
        </div>
    );

}

function CategoryMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (value) => {
        props.setCategory(value);
        setAnchorEl(null);
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                {props.currentValue === "" ? "Category" : props.currentValue}
            </Button>
            <Menu
                id="category"
                anchorEl={anchorEl}
                keepMounted
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleClose("Studying")}>Studying</MenuItem>
                <MenuItem onClick={() => handleClose("Writing")}>Writing</MenuItem>
                <MenuItem onClick={() => handleClose("Learning")}>Learning</MenuItem>
                <MenuItem onClick={() => handleClose("Career")}>Career</MenuItem>
                <MenuItem onClick={() => handleClose("Health")}>Health</MenuItem>
            </Menu>
        </div>
    );

}

class AddResource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openFeedback: false,
            scroll: 'paper',
            description: "",
            title: "",
            image: "",
            link: "",
            category: "",
            educationLevel: "",
        };
        this.addResourceToDB = this.addResourceToDB.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.setEducationLevel = this.setEducationLevel.bind(this);
    }

    addResourceToDB = (event) => {
        event.preventDefault();
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
            .catch(err => console.error("Could not add the resource to the database: " + err));
    }

    setCategory(value) {
        this.setState({ category: value })
    }

    setEducationLevel(value) {
        this.setState({ educationLevel: value })
    }

    render() {
        const { open, handleClose } = this.props
        const { scroll, educationLevel, category } = this.state

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
                            id="description"
                            name="description"
                            multiline
                            rows="3"
                            defaultValue={this.state.description}
                            onChange={e => this.setState({ description: e.target.value })}
                            autoComplete="description"
                            label="Description"
                            fullWidth
                        />
                        <Grid
                            container
                            direction="row-reverse"
                            justify="space-between"
                            alignItems="baseline"
                        >
                            <Grid item>
                                <EducationMenu currentValue={educationLevel} setEducationLevel={this.setEducationLevel} />
                            </Grid>
                            <Grid item>
                                <CategoryMenu currentValue={category} setCategory={this.setCategory} />
                            </Grid>
                        </Grid>


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
                            <Button onClick={event => this.addResourceToDB(event)}>Add</Button>
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