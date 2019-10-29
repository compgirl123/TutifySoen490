import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import * as tutifyStyle from '../../styles/CourseSelection-styles';

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
    data: [],
    counter: 15
  };

  handleSubmit = (txt)=>{
  };

  handleChange = async (event, callback=this.handleSubmit) => {
    var value = event.target.value;
    await this.setState({ name: value, counter : 15 }, this.handleSubmit);
    this.props.updateCourses(value);
    console.log(this.state.name);
  };

  componentDidMount() {
    this.getDataFromDb();
  }

  wrapperFunction = () => {
    /*this.props.data(this.state.name);
    this.hand*/
    //do something
    /*function 1();
    //do something
    function 2();
    //do something
    function 3();*/
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

    for (var x = 0; x < this.state.data.length; x++) {
      for (var y = 0; y < this.state.data[x].subjects.length; y++) {
        // get email and match to tutor (match to pooja here for now)
        subjects.push(this.state.data[x].subjects[y]);
      }

    }

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-chip">Teach more classes?</InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => <Chip key={value} label={value} className={classes.chip} onChange={this.handleChange.bind(this)}  />)}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {subjects.map(name =>
              (
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

export default withStyles(tutifyStyle.styles, { withTheme: true })(CourseSelection);

