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
import Button from "@material-ui/core/Button";


function SaveButton(props) {
    if(props.sessionTodosSet && props.todoChanged ){
        return <Button variant="outlined" onClick={event => props.saveTodosDB()}>Save</Button>
    }
    return <Button variant="outlined" disabled >Save</Button>
}

export class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            sessionTodosSet: false,
            _id: null,
            todoChanged: false
        };
        this.addTodo = this.addTodo.bind(this)
    }

    // when component receives the todos from the session as props, update the state of TodoList
    componentDidUpdate() {
        if(!this.state.sessionTodosSet){
            this.props.setTodos(this.props.sessionTodos)
            this.setState({ sessionTodosSet: true, _id: this.props._id });
        }
    }

    // Add strike to a task when checkbox is checked
    markComplete = (id) => {
        this.props.markComplete(id)
        this.setState({ todoChanged: true });
    }

    // Delete Todo from list
    delTodo = (id) => {
        this.props.delTodo(id)
        this.setState({ todoChanged: true });
    }

    // Adds a todo to the list
    addTodo = (title) => {
        this.props.addTodo(title)
        this.setState({ todoChanged: true});
    }

    // Save new todo list to the DB
    saveTodosDB = () => {
        this.props.saveTodos(this.state._id)
        this.setState({ todoChanged: false });
    }


    render() {
        const { classes, todos } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.tableWrapper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow >
                                <TableCell>
                                    <Typography variant="h6">My To-Do List</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <SaveButton
                                    sessionTodosSet={this.state.sessionTodosSet}
                                    todoChanged={this.state.todoChanged}
                                    saveTodosDB={this.saveTodosDB}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow variant="head" style={{background:"white",}} >
                                <TableCell colspan={2}>
                                    <AddTodo addTodo={this.addTodo} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{borderBottom: "none"}} colspan={2}>
                                    <Todos todos={todos} markComplete={this.markComplete} delTodo={this.delTodo} />
                                </TableCell>
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
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired).isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
    addTodo: PropTypes.func.isRequired,
    sessionTodos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      }).isRequired),
}

export default withStyles(UserDashboardStyles.styles, { withTheme: true })(TodoList);