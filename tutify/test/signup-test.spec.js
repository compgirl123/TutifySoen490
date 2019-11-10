import React from "react";
// import TextField from '@material-ui/core/TextField';
import SignUp, { SignUp as SignUpClass } from "./../src/components/SignUp";
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

var json = require("./testDb/database.json");
var state = {
    data: [],
    id: 0,
    first_name: "█",
    last_name: "█",
    program_of_study: "█",
    email: "█",
    password: "█",
    cPassword: "█",
    intervalIsSet: false,
    idToDelete: "█",
    idToUpdate: "█",
    objectToUpdate: "█",
    education_level: "█",
    school: "█",
  };
configure({ adapter: new Adapter() });
describe('In the SignUp page, ', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('the first name input should have a valid name (with NO numbers in it)', () => {
        // The value sent in the input
        const mockedEvent = { target: { value: "Henry"} } 
        const mockedErrorEvent = { target: { value: "Le4che"} } 

        // All the mounting and state setting
        const wrapper = mount(<SignUp></SignUp>);
        const shallowwrapper = wrapper.find(SignUpClass);
        shallowwrapper.setState(state);
        
        // Sending the onChange event
        const input = wrapper.find('input[name="firstName"]').at(0);
        input.props().onChange(mockedEvent);

        // Expecting a filtered result
        expect(shallowwrapper.instance().vfName("Good")).toBe(true);
        // expect(shallowwrapper.state().filteredData[0].first_name.toString()).toBe("Mo");
    });

   

   
}); 