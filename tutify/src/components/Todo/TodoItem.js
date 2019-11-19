import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    ListItem,
    Checkbox,
    IconButton,
    ListItemText,
    ListItemSecondaryAction,
    Container,
    Typography,
  } from "@material-ui/core";
  import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

export class TodoItem extends Component {
    getStyle = () => {
        return {
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none',
        }
    };

    render() {
        const { id, title, completed } = this.props.todo;
        return (
            <ListItem>
                <Checkbox
                    onChange={ this.props.markComplete.bind(this, id )}checked={ completed ? 'checked':  '' }
                />{' '}
                <ListItemText primary={title}/>
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete Todo" onClick={this.props.delTodo.bind(this, id)} style={{ float: 'right' }}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}

// PropTypes
TodoItem.propTypes = {
    todos: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}


export default TodoItem;