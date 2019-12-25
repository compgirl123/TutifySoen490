import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import * as UserDashboardStyles from '../../../styles/UserDashboard-styles';
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import { ListItem, Checkbox, IconButton, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
 

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
        const { classes } = this.props
        return (
            <ListItem>
                <Checkbox
                    onChange={ this.props.markComplete.bind(this, id )} checked={ completed ? true : false }
                />{' '}
                <ListItemText primary={title}/>
                <ListItemSecondaryAction>
                    <IconButton className={classes.todoItemButton} aria-label="Delete Todo" onClick={this.props.delTodo.bind(this, id)}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}

// PropTypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}


export default withStyles(UserDashboardStyles.styles, { withTheme: true })(TodoItem);