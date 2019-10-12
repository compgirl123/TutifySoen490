import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class SimpleSelect extends React.Component {
  state = {
    selected1: null,
    hasError: false
  };

  handleChange(value) {
    this.setState({ selected1: value });
  }

  handleClick() {
    this.setState({ hasError: false });
    if (!this.state.selected1) {
      this.setState({ hasError: true });
    }
  }

  render() {
    // const { classes } = this.props;
    const { selected1, hasError } = this.state;



    return (
            <form autoComplete="off">
        <FormControl >
          <InputLabel htmlFor="name">Name</InputLabel>
          <Select
            name="name"
            value={selected1}
            onChange={event => this.handleChange(event.target.value)}
            input={<Input id="name" />}
          >
            <MenuItem value="hai">Hai</MenuItem>
            <MenuItem value="olivier">Olivier</MenuItem>
            <MenuItem value="kevin">Kevin</MenuItem>
          </Select>
          {hasError && <FormHelperText>This is required!</FormHelperText>}
        </FormControl>
        <button type="button" onClick={() => this.handleClick()}>
          Submit
        </button>
      </form>

    );
  }
}





export default withStyles(styles)(SimpleSelect);