import React from "react";
import InputBase from '@material-ui/core/InputBase';
import Questions, { Questions as QuestionsClass } from "../src/components/Quiz/Questions";
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
        // The value sent in the input
        const mockedEvent = { target: { value: "ma"} } 

        // All the mounting and state setting
        const wrapper = mount(<Questions></Questions>);
        const shallowwrapper = wrapper.find(Questions);
        shallowwrapper.setState({ data: json.data });
        
        // Sending the onChange event
        const input = wrapper.find(InputBase).at(0);
        input.props().onChange(mockedEvent);
        shallowwrapper.setState({ selectedIndex: 0 });

        // Expecting a filtered result
        expect(shallowwrapper.state().filteredData.length).toBe(2);
        expect(shallowwrapper.state().filteredData[0].first_name.toString()).toBe("Mo");
    });


   
}); 