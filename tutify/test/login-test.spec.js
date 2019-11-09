import React from "react";
import InputBase from '@material-ui/core/InputBase';
import Login, { Login as LoginClass } from "./../src/components/Login";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import large_tutify from './../assets/large_tutify.png';

var json = require("./testDb/accounts.json");

configure({ adapter: new Adapter() });
describe('The Login Page ', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('should be filtering according to the input.', () => {
        // The value sent in the input
        const mockedEvent = { target: { value: "ma"} } 

        // All the mounting and state setting
        const wrapper = mount(<Login></Login>);
        const shallowwrapper = wrapper.find(LoginClass);
        shallowwrapper.setState({ data: json.data });
        
        // Sending the onChange event
        const input = wrapper.find(InputBase).at(0);
        input.props().onChange(mockedEvent);
        shallowwrapper.setState({ selectedIndex: 0 });

        // Expecting a filtered result
        expect(shallowwrapper.state().filteredData.length).toBe(2);
        expect(shallowwrapper.state().filteredData[0].first_name.toString()).toBe("Mo");
    });

    it('should be filtering by name.', () => {
        // The value sent in the input
        const mockedEvent = { target: { value: "pate"} } 

        // All the mounting and state setting
        const wrapper = mount(<Login></Login>);
        const shallowwrapper = wrapper.find(LoginClass);
        shallowwrapper.setState({ data: json.data });
        shallowwrapper.setState({ selectedIndex: 1 });
        
        // Sending the onChange event
        const input = wrapper.find(InputBase).at(0);
        input.props().onChange(mockedEvent);

        // Expecting a filtered result
        expect(shallowwrapper.state().filteredData.length).toBe(1);
        expect(shallowwrapper.state().filteredData[0].last_name.toString()).toBe("Patel");
    });
    
    it('should be filtering by school.', () => {
        // The value sent in the input
        const mockedEvent = { target: { value: "con"} } 

        // All the mounting and state setting
        const wrapper = mount(<Login></Login>);
        const shallowwrapper = wrapper.find(LoginClass);
        shallowwrapper.setState({ data: json.data });
        shallowwrapper.setState({ selectedIndex: 2 });
        
        // Sending the onChange event
        const input = wrapper.find(InputBase).at(0);
        input.props().onChange(mockedEvent);

        // Expecting a filtered result
        expect(shallowwrapper.state().filteredData.length).toBe(3);
        expect(shallowwrapper.state().filteredData[0].school.toString()).toBe("Concordia University");
    });

    it('should be filtering by course.', () => {
        // The value sent in the input
        const mockedEvent = { target: { value: "en"} } 

        // All the mounting and state setting
        const wrapper = mount(<Login></Login>);
        const shallowwrapper = wrapper.find(LoginClass);
        shallowwrapper.setState({ data: json.data });
        shallowwrapper.setState({ selectedIndex: 3 });
        
        // Sending the onChange event
        const input = wrapper.find(InputBase).at(0);
        input.props().onChange(mockedEvent);

        // Expecting a filtered result
        expect(shallowwrapper.state().filteredData.length).toBe(4);
        expect(shallowwrapper.state().filteredData[0].subjects.toString()).toBe("Computer Science");
    });

    it('should be filtering by program.', () => {
        // The value sent in the input
        const mockedEvent = { target: { value: "engi"} } 

        // All the mounting and state setting
        const wrapper = mount(<Login></Login>);
        const shallowwrapper = wrapper.find(LoginClass);
        shallowwrapper.setState({ data: json.data });
        shallowwrapper.setState({ selectedIndex: 4 });
        
        // Sending the onChange event
        const input = wrapper.find(InputBase).at(0);
        input.props().onChange(mockedEvent);

        // Expecting a filtered result
        expect(shallowwrapper.state().filteredData.length).toBe(1);
        expect(shallowwrapper.state().filteredData[0].subjects.toString()).toBe("Software Engineering");
    });

   
}); 