import React from "react";
import InputBase from '@material-ui/core/InputBase';
import UserInfo, { UserInfo as UserInfoClass } from "./../src/components/profilePage/UserInfo";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

var json = require("./testDb/profiles.json");
// get mo as mocked object and set his name and then change it to someone else

configure({ adapter: new Adapter() });
describe('The tutor search filter ', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('setting the default values present on profile page for Student', () => {
        // The value sent in the input
        const mockedEvent = { target: { value: "Rogerino"} } 

        // All the mounting and state setting
        const wrapper = mount(<UserInfo></UserInfo>);
        const shallowwrapper = wrapper.find(UserInfoClass);
        shallowwrapper.setState({ data: json.data });
        
        // Sending the onChange event
        const input2 = wrapper.find(Typography).at(1);
        console.log(input2.props().children);
        var student = input2.props().children.includes("Student");
        console.log(student);
        if(student){
            const input1 = wrapper.find(Box).at(0);
            console.log(input1.props().children);
            input1.props().children = "Claudia Francesca";
            console.log(input1.props().children);
            console.log(document.getElementById(input1.props().id).value);
            document.getElementById(input1.props().children).setAttribute('value', input1.props().children);
            console.log(document.getElementById(input1.props().children).value);
            //const input = wrapper.find("input[name=firstName]").at(0);
            //input.props().onChange(mockedEvent);
            // shallowwrapper.setState({ selectedIndex: 0 });
        }
        

        // Expecting a filtered result
        expect(shallowwrapper.state().updatedFirstName).toBe("Rogerino");
        const button = wrapper.find("button#UpdateValue");
        btn.simulate("click");
        expect(shallowwrapper.state().first_name.toString()).toBe("Rogerino");
    });

    // it('should be filtering by name.', () => {
    //     // The value sent in the input
    //     const mockedEvent = { target: { value: "pate"} } 

    //     // All the mounting and state setting
    //     const wrapper = mount(<UserInfo></UserInfo>);
    //     const shallowwrapper = wrapper.find(UserInfoClass);
    //     shallowwrapper.setState({ data: json.data });
    //     shallowwrapper.setState({ selectedIndex: 1 });
        
    //     // Sending the onChange event
    //     const input = wrapper.find(InputBase).at(0);
    //     input.props().onChange(mockedEvent);

    //     // Expecting a filtered result
    //     expect(shallowwrapper.state().filteredData.length).toBe(1);
    //     expect(shallowwrapper.state().filteredData[0].last_name.toString()).toBe("Patel");
    // });
    
    // it('should be filtering by school.', () => {
    //     // The value sent in the input
    //     const mockedEvent = { target: { value: "con"} } 

    //     // All the mounting and state setting
    //     const wrapper = mount(<UserInfo></UserInfo>);
    //     const shallowwrapper = wrapper.find(UserInfoClass);
    //     shallowwrapper.setState({ data: json.data });
    //     shallowwrapper.setState({ selectedIndex: 2 });
        
    //     // Sending the onChange event
    //     const input = wrapper.find(InputBase).at(0);
    //     input.props().onChange(mockedEvent);

    //     // Expecting a filtered result
    //     expect(shallowwrapper.state().filteredData.length).toBe(3);
    //     expect(shallowwrapper.state().filteredData[0].school.toString()).toBe("Concordia University");
    // });

    // it('should be filtering by course.', () => {
    //     // The value sent in the input
    //     const mockedEvent = { target: { value: "en"} } 

    //     // All the mounting and state setting
    //     const wrapper = mount(<UserInfo></UserInfo>);
    //     const shallowwrapper = wrapper.find(UserInfoClass);
    //     shallowwrapper.setState({ data: json.data });
    //     shallowwrapper.setState({ selectedIndex: 3 });
        
    //     // Sending the onChange event
    //     const input = wrapper.find(InputBase).at(0);
    //     input.props().onChange(mockedEvent);

    //     // Expecting a filtered result
    //     expect(shallowwrapper.state().filteredData.length).toBe(4);
    //     expect(shallowwrapper.state().filteredData[0].subjects.toString()).toBe("Computer Science");
    // });

    // it('should be filtering by program.', () => {
    //     // The value sent in the input
    //     const mockedEvent = { target: { value: "engi"} } 

    //     // All the mounting and state setting
    //     const wrapper = mount(<UserInfo></UserInfo>);
    //     const shallowwrapper = wrapper.find(UserInfoClass);
    //     shallowwrapper.setState({ data: json.data });
    //     shallowwrapper.setState({ selectedIndex: 4 });
        
    //     // Sending the onChange event
    //     const input = wrapper.find(InputBase).at(0);
    //     input.props().onChange(mockedEvent);

    //     // Expecting a filtered result
    //     expect(shallowwrapper.state().filteredData.length).toBe(1);
    //     expect(shallowwrapper.state().filteredData[0].subjects.toString()).toBe("Software Engineering");
    // });

   
}); 