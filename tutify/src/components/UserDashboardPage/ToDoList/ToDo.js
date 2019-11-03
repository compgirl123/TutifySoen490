import React, { memo } from "react";
import ReactDOM from "react-dom";

import { useInputValue, useTodos } from "./custom-hooks";

import AddTodo from "./AddToDo";
import ToDoListLayout from "./ToDoListLayout";

const ToDo = memo(props => {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const { todos, addTodo, checkTodo, removeTodo } = useTodos();

  const clearInputAndAddTodo = _ => {
    clearInput();
    addTodo(inputValue);
  };

  return (
    <div>
      <AddTodo
        inputValue={inputValue}
        onInputChange={changeInput}
        onButtonClick={clearInputAndAddTodo}
        onInputKeyPress={event => keyInput(event, clearInputAndAddTodo)}
      />
      <ToDoListLayout
        items={todos}
        onItemCheck={idx => checkTodo(idx)}
        onItemRemove={idx => removeTodo(idx)}
      />
    </div>
  );
});

const rootElement = document.getElementById("root");
ReactDOM.render(<ToDo />, rootElement);
export default ToDo;
