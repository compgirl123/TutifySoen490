import React from "react";
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Login, { Login as LoginClass } from "./../src/components/Login";
import SearchTutors, { SearchTutors as SearchTutorsClass } from "./../src/components/SearchTutors";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";


var json = require("./testDb/accounts.json");

configure({ adapter: new Adapter() });
describe('The Login Page ', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('should be filtering according to the input.', () => {
        // The value sent in the input
        //const mockedEvent = { target: { value: "test@gmail.com"} } 
        const mocked2 = {email : "francesca@gmail.com", password: "test1"}
        // All the mounting and state setting
        const wrapper = mount(<Login></Login>);
        const shallowwrapper = wrapper.find(LoginClass);
        shallowwrapper.setState({ data: json.data });
        console.log(shallowwrapper);
        //console.log(this.state.data);

        // Sending the onChange event
        const input = wrapper.find(TextField).at(0);
        console.log(input.props().id);
        console.log(document.getElementById(input.props().id).value);
        document.getElementById(input.props().id).setAttribute('value', mocked2.email);
        console.log(document.getElementById(input.props().id).value);
        shallowwrapper.setState({ email: document.getElementById(input.props().id).value });

        const input1 = wrapper.find(TextField).at(1);
        console.log(input1.props().id);
        console.log(document.getElementById(input1.props().id).value);
        document.getElementById(input1.props().id).setAttribute('value', mocked2.password);
        console.log(document.getElementById(input1.props().id).value);

        //input.props().onChange(mockedEvent);
        /*shallowwrapper.setState({ selectedIndex: 0 });*/

        // Expecting a filtered result
        /*expect(shallowwrapper.state().filteredData.length).toBe(2);
        expect(shallowwrapper.state().filteredData[0].first_name.toString()).toBe("Mo");*/
    });


   
}); 