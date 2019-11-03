
import React from "react";
import InputBase from '@material-ui/core/InputBase';
import SearchResults, { SearchResults as SearchResultsClass } from "./../src/components/SearchResults";
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
    
    it('should be filtering by course subject.', () => {
        // The value sent in the input
        const mockedEvent = { target: { value: "fre"} } 

        // All the mounting and state setting
        const wrapper = mount(<SearchResults></SearchResults>);
        const shallowwrapper = wrapper.find(SearchResultsClass);
        shallowwrapper.setState({ data: json.data });
        
        // Sending the onChange event
        const input = wrapper.find(InputBase).at(0);
        input.props().onChange(mockedEvent);

        // Expecting a filtered result
        expect(shallowwrapper.state().filteredData[0].subject.toString()).toBe("French");
    });
}); 