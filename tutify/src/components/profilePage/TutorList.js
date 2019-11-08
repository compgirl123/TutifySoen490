import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { List } from '@material-ui/core';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";

class TutorList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subListOpen: ""
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleSubList = this.handleSubList.bind(this);
        this.renderListItems = this.renderListItems.bind(this);
        this.renderSubListButton = this.renderSubListButton.bind(this);
        this.renderSubList = this.renderSubList.bind(this);

    }
    handleClick = () => {
        this.setState(prevState => ({
            check: !prevState.openList
        }));
    };

    handleSubList = parent => {
        if (this.state.subListOpen == parent) {
            this.setState({ subListOpen: "" });
        } else {
            this.setState({ subListOpen: parent });
        }
    };

    renderListItems = (pages, classes) => {
        let content = [],
            isSub,
            key;
        pages.map(page => {
            isSub = typeof page == "object";
            console.log(isSub);
            key = isSub ? Object.keys(page)[0] : page;
            content.push(
                <ListItem
                    button
                    to={`/${key}`}
                    key={key}
                >
                    <ListItemText primary={key.replace(/-/g, " ")} />
                    {isSub && this.renderSubListButton(key)}
                </ListItem>,
                isSub && this.renderSubList(page[key], key, classes)
            );
        });
        return content;
    };

    renderSubListButton = subListParent => {
        return (
            <ListItemSecondaryAction>
                <IconButton
                    color="inherit"
                    aria-label={
                        this.state.subListOpen == subListParent
                            ? "Close Submmenu"
                            : "Open Submenu"
                    }
                    onClick={() => this.handleSubList(subListParent)}
                >
                    {this.state.subListOpen == subListParent ? (
                        <ExpandLess />
                    ) : (
                            <ExpandMore />
                        )}
                </IconButton>
            </ListItemSecondaryAction>
        );
    };

    renderSubList = (subList, subListParent, classes) => {
        return (
            <Collapse
                in={this.state.subListOpen == subListParent}
                timeout="auto"
                unmountOnExit
                key={subListParent}
            >
                <List component="div" disablePadding>
                    {this.renderListItems(subList, classes)}
                </List>
            </Collapse>
        );
    };
    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.renderListItems(this.props.pages, classes)}
            </div>

        );
    }
}

export default TutorList;