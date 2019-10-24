import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


class CourseSelection extends React.Component {
  state = {
    name: [],
    data: []
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  componentDidMount() {
    this.getDataFromDb();
  }
  
  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getTutor')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  render() {
    const { classes, theme } = this.props;
    const subjects = [];
    //console.log(this.state.data.length);
    for(var x=0;x<this.state.data.length;x++){
        //console.log(this.state.data[x].subjects);
        for(var y=0;y<this.state.data[x].subjects.length;y++){
            subjects.push(this.state.data[x].subjects[y]);
        }
       
    }
    console.log(subjects);

    return (
      <div className={classes.root}>
        
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-chip">Courses</InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => <Chip key={value} label={value} className={classes.chip} />)}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {subjects.map(name => (
              <MenuItem
                key={name}
                value={name}
                style={{
                  fontWeight:
                    this.state.name.indexOf(name) === -1
                      ? theme.typography.fontWeightRegular
                      : theme.typography.fontWeightMedium,
                }}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

CourseSelection.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CourseSelection);

