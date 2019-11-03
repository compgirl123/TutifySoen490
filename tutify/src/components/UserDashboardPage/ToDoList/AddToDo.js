import React, { memo } from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const AddTodo = memo(props => (
  <Paper style={{ margin: 16, padding: 16 }}>
    <Grid container>
      <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
        <TextField
          placeholder="Add ToDo here"
          value={props.inputValue}
          onChange={props.onInputChange}
          onKeyPress={props.onInputKeyPress}
          fullWidth
        />
      </Grid>
      <Grid xs={4} md={1} item>
          <Fab
          size="small" 
          color="secondary" 
          aria-label="add"
          onClick={props.onButtonClick}
          >
            <AddIcon/>
          </Fab>
      </Grid>
    </Grid>
  </Paper>
));

export default AddTodo;
