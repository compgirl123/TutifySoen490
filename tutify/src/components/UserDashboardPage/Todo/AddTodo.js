import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Paper, Grid } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

export class AddTodo extends Component {
    state = {
        title: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({ title: '' });
    }

    onChange = (e) => this.setState({ title: e.target.value });

    render() {
        return (
            <Paper style={{ margin: 12, padding: 12 }}>
                <form onSubmit={this.onSubmit}>
                    <Grid container >
                        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
                            <TextField
                                placeholder="Add Todo..."
                                value={this.state.title}
                                onChange={this.onChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid xs={4} md={1} item>
                            <Fab
                                size="small"
                                color="secondary"
                                aria-label="add"
                                type="submit"
                            >
                                <AddIcon />
                            </Fab>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

        )
    }
}

// PropTypes
AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
}

export default AddTodo;