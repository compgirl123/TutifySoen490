import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as UserDashboardStyles from '../../../styles/UserDashboard-styles';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import AddTodo from "./AddTodo";
import Todos from "./Todos";
import PropTypes from 'prop-types';


class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
        };
        this.addTodo = this.addTodo.bind(this)
    }

    // Add strike to a task when checkbox is checked
    markComplete = (id) => {
        this.props.markComplete(id)
    }

    // Delete Todo from list
    delTodo = (id) => {
        this.props.delTodo(id)
    }

    // Adds a todo to the list
    addTodo = (title) => {
        this.props.addTodo(title)
    }

    render() {
        const { classes, todos } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.tableWrapper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography variant="h6">My To-Do List</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <AddTodo addTodo={this.addTodo} />
                                <Todos todos={todos} markComplete={this.markComplete} delTodo={this.delTodo} />
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        );
    }
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired).isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
    addTodo: PropTypes.func.isRequired
}

export default withStyles(UserDashboardStyles.styles, { withTheme: true })(TodoList);