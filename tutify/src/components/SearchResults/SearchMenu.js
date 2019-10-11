import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import SearchResults from './SearchResults';

const useStyles = makeStyles(theme => ({
    menu: {
        marginTop: '10px',
    }
}));

const options = [
    'Search by',
    'School',
    'Course/Subject',
    'Program',
    'Year',
];

export default function SimpleListMenu() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClickListItem = event => {
        setAnchorEl(event.currentTarget);

    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    

    return (
        <div>
            <IconButton aria-controls="lock-menu" aria-haspopup="true" onClick={handleClickListItem}>
                <MenuIcon />
            </IconButton>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.menu}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option}
                        disabled={index === 0}
                        selected={index === selectedIndex}
                        onClick={event => handleMenuItemClick(event, index)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}