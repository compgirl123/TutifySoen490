import React from "react";
//import TodoItem, { TodoItem as TodoItemClass } from "../src/components/UserDashboardPage/Todo/TodoItem";
//import TodoList, { TodoList as TodoListClass } from "../src/components/UserDashboardPage/Todo/TodoList";
import AddTodo, { AddTodo as AddTodoClass } from "../src/components/UserDashboardPage/Todo/AddTodo";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Title from "../src/components/TutorProfile/Title";
import TableCell from '@material-ui/core/TableCell';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

// importing the json object with the profile information
var json = require("./testDb/enhanced-profile.json");

configure({ adapter: new Adapter() });

describe('The Student Dashboard Page', () => {
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
        const mockedEvent2 = { target: { value: "orange"} } 
        const input = wrapper.find(TextField).at(0);
        input.props().onChange(mockedEvent2);

        expect(student_class_wrapper.state().title).toBe("orange");
        
        /**
         * Checking the List of Students Page for Tutors and see if all elements are present  
        */

    });
}); 
