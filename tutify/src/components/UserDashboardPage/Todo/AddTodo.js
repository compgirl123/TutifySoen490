import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Paper, Grid } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { withStyles } from "@material-ui/core/styles";
import * as UserDashboardStyles from '../../../styles/UserDashboard-styles';

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
        const { classes } = this.props
        return (
            <Paper className={classes.addTodoPaper}>
                <form onSubmit={this.onSubmit}>
                    <Grid container >
                        <Grid className={classes.addTodoGrid} xs={10} md={11} item>
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

export default withStyles(UserDashboardStyles.styles, { withTheme: true })(AddTodo);