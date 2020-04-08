import React from "react";
import InputBase from '@material-ui/core/InputBase';
import SearchTutors, { SearchTutors as SearchTutorsClass } from "../src/components/SearchTutors";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

var json = require("./testDb/database.json");

configure({ adapter: new Adapter() });
describe('The tutor search filter ', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('should be filtering according to the input.', () => {
        const mockedEvent = { target: { value: "ma"} } 
        const wrapper = mount(<SearchTutors></SearchTutors>);
        const shallowwrapper = wrapper.find(SearchTutorsClass);
        shallowwrapper.setState({ data: json.data });
        
        const input = wrapper.find(InputBase).at(0);
        input.props().onChange(mockedEvent);
        shallowwrapper.setState({ selectedIndex: 0 });

        expect(shallowwrapper.state().filteredData.length).toBe(2);
        expect(shallowwrapper.state().filteredData[0].first_name.toString()).toBe("Mo");
    });

    it('should be filtering by name.', () => {
        const mockedEvent = { target: { value: "pate"} } 

        const wrapper = mount(<SearchTutors></SearchTutors>);
        const shallowwrapper = wrapper.find(SearchTutorsClass);
        shallowwrapper.setState({ data: json.data });
        shallowwrapper.setState({ selectedIndex: 1 });
        
        const input = wrapper.find(InputBase).at(0);
        input.props().onChange(mockedEvent);

        expect(shallowwrapper.state().filteredData.length).toBe(1);
        expect(shallowwrapper.state().filteredData[0].last_name.toString()).toBe("Patel");
    });
    
    it('should be filtering by school.', () => {
        const mockedEvent = { target: { value: "con"} } 
        const wrapper = mount(<SearchTutors></SearchTutors>);
        const shallowwrapper = wrapper.find(SearchTutorsClass);
        shallowwrapper.setState({ data: json.data });
        shallowwrapper.setState({ selectedIndex: 2 });
        
        const input = wrapper.find(InputBase).at(0);
        input.props().onChange(mockedEvent);

        expect(shallowwrapper.state().filteredData.length).toBe(3);
        expect(shallowwrapper.state().filteredData[0].school.toString()).toBe("Concordia University");
    });

    it('should be filtering by course.', () => {
        const mockedEvent = { target: { value: "en"} } 
        const wrapper = mount(<SearchTutors></SearchTutors>);
        const shallowwrapper = wrapper.find(SearchTutorsClass);
        shallowwrapper.setState({ data: json.data });
        shallowwrapper.setState({ selectedIndex: 3 });
        
        const input = wrapper.find(InputBase).at(0);
        input.props().onChange(mockedEvent);

        expect(shallowwrapper.state().filteredData.length).toBe(4);
        expect(shallowwrapper.state().filteredData[0].subjects.toString()).toBe("Computer Science");
    });

    it('should be filtering by program.', () => {
        const mockedEvent = { target: { value: "engi"} } 
        const wrapper = mount(<SearchTutors></SearchTutors>);
        const shallowwrapper = wrapper.find(SearchTutorsClass);
        shallowwrapper.setState({ data: json.data });
        shallowwrapper.setState({ selectedIndex: 4 });
        
        const input = wrapper.find(InputBase).at(0);
        input.props().onChange(mockedEvent);

        expect(shallowwrapper.state().filteredData.length).toBe(1);
        expect(shallowwrapper.state().filteredData[0].subjects.toString()).toBe("Software Engineering");
    });

   
}); 