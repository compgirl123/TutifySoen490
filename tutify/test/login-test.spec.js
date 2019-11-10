import React from "react";
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Login, { Login as LoginClass } from "./../src/components/Login";
import SearchTutors, { SearchTutors as SearchTutorsClass } from "./../src/components/SearchTutors";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
const bcrypt = require('bcryptjs')

var json = require("./testDb/accounts.json");

configure({ adapter: new Adapter() });
describe('The Login Page ', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('should perform a simple login action (passing test)', () => {
        // The values sent to the email and password input text fields.
        // This is a sample student login
        const mocked2 = {email : "francesca@gmail.com", password: "test1"}

        // All the mounting and state setting
        const wrapper = mount(<Login></Login>);
        const shallowwrapper = wrapper.find(LoginClass);
        shallowwrapper.setState({ data: json.data });
        console.log(shallowwrapper);

        // Getting the value for the email TextField as well as setting that value 
        const input = wrapper.find(TextField).at(0);
        console.log(input.props());
        console.log(input.props().id);
        console.log(document.getElementById(input.props().id).value);
        document.getElementById(input.props().id).setAttribute('value', mocked2.email);
        shallowwrapper.setState({ email: document.getElementById(input.props().id).value });

        // Getting the value for the password TextField as well as setting that value 
        const input1 = wrapper.find(TextField).at(1);
        console.log(input1.props().id);
        console.log(document.getElementById(input1.props().id).value);
        document.getElementById(input1.props().id).setAttribute('value', mocked2.password);
        console.log(document.getElementById(input1.props().id).value);
        shallowwrapper.setState({ password: document.getElementById(input1.props().id).value });
        
        // finding the sample data matched to the TextField Login button and seeing if it matches in our 
        // accounts.json file
        var accounts_array = shallowwrapper.state().data;
        var index = accounts_array.findIndex(x => x.email === mocked2.email);
        console.log(index);
        var test = accounts_array[index];
        console.log(test);

        // simulating a click for the login button
        wrapper.find('.loginSubmit').at(0).simulate('click');
        console.log(wrapper.find('.loginSubmit').at(0).props());

        // checking to see if the expected results make sense
        expect(shallowwrapper.state().email).toEqual('francesca@gmail.com');
        expect(shallowwrapper.state().password).toEqual('test1');

        var password = 'test1';
        var passwordHashed = "$2a$10$J4dMuBKah51tFHXPyt66cORe.erC47vcqcjXvjaTrTQmaEl25VDh2";
        
        // Sample comparison test between the password and hashed password  
        var index1 = accounts_array.findIndex(x => x.password === passwordHashed);
    });
    
   
}); 