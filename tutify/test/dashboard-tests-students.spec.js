import React from "react";
import TodoItem, { TodoItem as TodoItemClass } from "../src/components/UserDashboardPage/Todo/TodoItem";
import TodoList, { TodoList as TodoListClass } from "../src/components/UserDashboardPage/Todo/TodoList";
import Todos, { Todos as TodosClass } from "../src/components/UserDashboardPage/Todo/Todos";
import AddTodo, { AddTodo as AddTodoClass } from "../src/components/UserDashboardPage/Todo/AddTodo";
import Notifications, { Notifications as NotificationsClass } from "../src/components/UserDashboardPage/Notification/Notifications";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import List from '@material-ui/core/List';

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
    const toDoItem = { target: { value: "Do COMP 472 HomeWork" } }
    const toDo = wrapper.find(TextField).at(0);
    toDo.props().onChange(toDoItem);

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
    const wrapper = mount(<TodoList todos={toDoFullInfo}></TodoList>);
    const wrapper_shallow = shallow(<TodoList todos={toDoFullInfo}></TodoList>);
    const student_class_wrapper = wrapper.find(TodoListClass);

    // Setting the Props for the Page.
    wrapper_shallow.setProps({ setTodos: { sessionTodos: toDoFullInfo } });
    wrapper_shallow.setProps({ sessionTodos: { todos: toDoFullInfo } });

    // Getting the Todo Component on the Page that should contain the TodoList.
    const toDoComponent = wrapper.find(Todos).at(0);

    // Expect the title of the todo item to be a certain value
    expect(toDoComponent.props().todos[0].title).toBe("Do COMP 472 HomeWork");

    // Expect the checkbox of the todo item to not be checked
    expect(toDoComponent.props().todos[0].completed).toBe(false);

  });

});

describe('<Todos />', () => {
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
  test.skip('render <Todos />', () => {
    const wrapper = shallow(<Todos todos={ toDoFullInfo }/>)
    expect(wrapper.find(Todo).length).toBe(1)
  })

  test.skip('can call delTodo method', () => {
    const mock_delTodo = jest.fn().mockImplementation((idx) => {
      const todos = toDoFullInfo.filter((todo, index) => {
        return idx !== index
      })
      wrapper.setProps({ todos: todos })
    })
    const wrapper = shallow(<Todos todos={ toDoFullInfo } delTodo={ mock_delTodo } />)
    wrapper.find(TodoItem).at(0).find('IconButton').simulate('click')
    expect(wrapper.find(TodoItem).length).toBe(1)
  })
})

describe('The Student Dashboard Page Notifications', () => {
  let mount;

  beforeAll(() => {
    mount = createMount();
  });


  it('Add To Do Item to List', () => {

    const notificationsArray = [
      {
        _id: {
          $oid: "5e01689fbd1ef084d89dec5b"
        },
        title: "A1",
        text: "New announcement.",
        tutorImg: "https://i.imgur.com/kyh5A1e.jpg",
        tutorName: "Mohammed Alawami",
        tutorid: {
          $oid: "5dacd1cf1c9d440000aa0b1b"
        }
      },
      {
        _id: {
          $oid: "5e0287e3641f2eac8f2837ae"
        },
        title: "Testing",
        text: "Hello Students",
        tutorImg: "https://i.imgur.com/kyh5A1e.jpg",
        tutorName: "Mohammed Alawami",
        tutorid: {
          $oid: "5dacd1cf1c9d440000aa0b1b"
        }
      }
    ]

    const wrapper = mount(<Notifications notifications={notificationsArray}></Notifications>);
    const wrapper_shallow = shallow(<Notifications notifications={notificationsArray}></Notifications>);
    
    const student_class_wrapper = wrapper.find(NotificationsClass);
    student_class_wrapper.setState({ notifications: notificationsArray });

    const notifications_title = wrapper.find(TableCell).at(0);
    expect(notifications_title.props().children.props.children).toBe("Notifications");

    const notification = wrapper.find(List).at(0);
    expect(notification.props().children[0].props.notif.title).toBe("Testing");
    expect(notification.props().children[0].props.notif.text).toBe("Hello Students");
    expect(notification.props().children[0].props.notif.tutorName).toBe("Mohammed Alawami");
    expect(notification.props().children[1].props.notif.title).toBe("A1");
    expect(notification.props().children[1].props.notif.text).toBe("New announcement.");
    expect(notification.props().children[1].props.notif.tutorName).toBe("Mohammed Alawami");

  });

}); 
