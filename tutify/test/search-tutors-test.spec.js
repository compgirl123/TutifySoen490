import React from "react";
import InputBase from '@material-ui/core/InputBase';
import SearchTutors, { SearchTutors as SearchTutorsClass } from "./../src/components/SearchTutors";
import { createShallow, createMount} from '@material-ui/core/test-utils';
import { configure, mount } from 'enzyme';
import { create } from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
var json = require("./testDb/database.json");

configure({ adapter: new Adapter() });
let container;
describe('The tutor search filter ', () => {
    let mount;
    beforeAll(() => {
        mount = createMount();
    });
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });
    afterEach(() => {
        document.body.removeChild(container);
    });
    
    it('should be filtering by course subjects.', () => {
        // The value sent in the input
        const mockedEvent = { target: { value: "fre"} } 

        // All the mounting and state setting
        const wrapper = mount(<SearchTutors></SearchTutors>);
        const shallowwrapper = wrapper.find(SearchTutorsClass);
        shallowwrapper.setState({ data: json.data });
        
        // Sending the onChange event
        const input = wrapper.find(InputBase).at(0);
        input.props().onChange(mockedEvent);

        // Expecting a filtered result
        expect(shallowwrapper.state().filteredData.length).toBe(1);
        expect(shallowwrapper.state().filteredData[0].subjects.toString()).toBe("French");
    });

    it('should be filtering by name.', () => {
        // The value sent in the input
        const mockedEvent = { target: { value: "pate"} } 

        // All the mounting and state setting
        const wrapper = mount(<SearchTutors></SearchTutors>);
        const shallowwrapper = wrapper.find(SearchTutorsClass);
        shallowwrapper.setState({ data: json.data });
        shallowwrapper.setState({ selectedIndex: 1 });
        
        // Sending the onChange event
        const input = wrapper.find(InputBase).at(0);
        input.props().onChange(mockedEvent);

        // Expecting a filtered result
        expect(shallowwrapper.state().filteredData.length).toBe(1);
        expect(shallowwrapper.state().filteredData[0].last_name.toString()).toBe("Patel");
    });
}); 