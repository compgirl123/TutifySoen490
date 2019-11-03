import React, { memo } from "react";
import { List, Paper, Grid } from "@material-ui/core";

import ToDoListItem from "./ToDoListItem";

const TodoListLayout = memo(props => (
  <>
    {props.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List style={{ overflow: "scroll" }}>
          {props.items.map((todo, idx) => (
            <ToDoListItem
              {...todo}
              key={`TodoItem.${idx}`}
              divider={idx !== props.items.length - 1}
              onButtonClick={() => props.onItemRemove(idx)}
              onCheckBoxToggle={() => props.onItemCheck(idx)}
            />
          ))}
        </List>
      </Paper>
    )}
  </>
));

export default TodoListLayout;