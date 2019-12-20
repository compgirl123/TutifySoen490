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
import uuid from 'uuid';
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
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id)
                    todo.completed = !todo.completed;
                return todo;
            })
        });
    }


    // Delete Todo from list
    delTodo = (id) => {
        this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })
    }

    // Adds a todo to the list
    addTodo = (title) => {
        const newTodo = {
            id: uuid.v4(),
            title: title,
            completed: false
        }
        this.setState({ todos: [...this.state.todos, newTodo]})
    }

    render() {
        const { classes } = this.props;
        const { todos } = this.state;
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
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired).isRequired,
    markComplete: PropTypes.func.isRequired
  }
export default withStyles(UserDashboardStyles.styles, { withTheme: true })(TodoList);