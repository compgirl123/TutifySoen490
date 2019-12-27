import React from "react";
import TodoItem, { TodoItem as TodoItemClass } from "../src/components/UserDashboardPage/Todo/TodoItem";
import TodoList, { TodoList as TodoListClass } from "../src/components/UserDashboardPage/Todo/TodoList";
import Todos, { Todos as TodosClass } from "../src/components/UserDashboardPage/Todo/Todos";
import AddTodo, { AddTodo as AddTodoClass } from "../src/components/UserDashboardPage/Todo/AddTodo";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import TextField from '@material-ui/core/TextField';

// importing the json object with the profile information
var json = require("./testDb/enhanced-profile.json");

configure({ adapter: new Adapter() });

describe('The Student Dashboard Page To Do List', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Add To Do Item to List', () => {
        // All the mounting and state setting
        const wrapper = mount(<AddTodo></AddTodo>);
        const wrapper_shallow = shallow(<AddTodo></AddTodo>);
        const student_class_wrapper = wrapper.find(AddTodoClass);
        student_class_wrapper.setState({ data: json.data });

        // The value sent in the input
        const toDoItem = { target: { value: "Do COMP 472 HomeWork"} } 
        const input = wrapper.find(TextField).at(0);
        input.props().onChange(toDoItem);

        expect(student_class_wrapper.state().title).toBe("Do COMP 472 HomeWork");

    });


    it('View ToDo List', () => {

        // The value sent in the input
        const toDoFullInfo = [
            {
              _id: {
                "$oid": "5e054e93ad6a2d8862c23241"
              },
              id: "6de9de30-ab34-43df-ab49-6f72d664cc20",
              title: "Do COMP 472 HomeWork",
              completed: false
            }
          ]
        
        // All the mounting and state setting
        const wrapper =  mount(<TodoList todos = {toDoFullInfo}></TodoList>);
        const wrapper_shallow = shallow(<TodoList todos = {toDoFullInfo}></TodoList>);
        const student_class_wrapper = wrapper.find(TodoListClass);

        // Setting the Props for the Page.
        wrapper_shallow.setProps({ setTodos: { sessionTodos: toDoFullInfo } });
        wrapper_shallow.setProps({ sessionTodos: { todos: toDoFullInfo } });

        // Getting the Todo Component on the Page that should contain the TodoList.
        const input = wrapper.find(Todos).at(0);

        // Expect the title of the todo item to be a certain value
        expect(input.props().todos[0].title).toBe("Do COMP 472 HomeWork");

        // Expect the checkbox of the todo item to not be checked
        expect(input.props().todos[0].completed).toBe(false);

    });
}); 

describe('The Student Dashboard Page Notifications', () => {
    // TO DO

}); 
