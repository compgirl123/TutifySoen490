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
        // The values sent to the email and password input text fields
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
        //console.log(document.getElementById(input.props().id).value);
        shallowwrapper.setState({ email: document.getElementById(input.props().id).value });

        const input1 = wrapper.find(TextField).at(1);
        console.log(input1.props().id);
        console.log(document.getElementById(input1.props().id).value);
        document.getElementById(input1.props().id).setAttribute('value', mocked2.password);
        console.log(document.getElementById(input1.props().id).value);
        shallowwrapper.setState({ password: document.getElementById(input1.props().id).value });

        //expect(shallowwrapper.state().email.length).toBe(2);
        var accounts_array = shallowwrapper.state().data;
        var index = accounts_array.findIndex(x => x.email === mocked2.email);
        console.log(index);
        var test = accounts_array[index];
        console.log(test);
        //console.log(accounts_array.length);

        /*const wrapper1 = mount(<Login/>);
        const shallowwrapper = wrapper1.find(LoginClass);*/

        wrapper.find('.loginSubmit').at(0).simulate('click');
        console.log(wrapper.find('.loginSubmit').at(0).props());
        //console.log(wrapper.state)
        expect(shallowwrapper.state().email).toEqual('francesca@gmail.com');
        expect(shallowwrapper.state().password).toEqual('test1');
        var password = 'test1';
        var passwordHashed = "$2a$10$J4dMuBKah51tFHXPyt66cORe.erC47vcqcjXvjaTrTQmaEl25VDh2";

        var index1 = accounts_array.findIndex(x => x.password === passwordHashed);
        var test = accounts_array[index1];
            //expect(shallowwrapper.state().password).toEqual(test.password);
        /*bcrypt.compare(password, passwordHashed, (err, isMatch) => {
          if(isMatch){
            /*var index1 = accounts_array.findIndex(x => x.password === passwordHashed);
            var test = accounts_array[index1];
            
            //expect(shallowwrapper.state().password).toEqual(test.password);
            //expect("$2a$10$J4dMuBKah51tFHXPyt66cORe.erC47vcqcjXvjaTrTQmaEl25VDh2").toEqual("$2a$10$J4dMuBKah51tFHXPyt66cORe.erC47vcqcjXvjaTrTQmaEl25VDh2");
            //throw new Error('I have failed you, Anakin');
            const shallowwrapper = wrapper.find(LoginClass);
            var hi = shallowwrapper.setState({ haha:'ladygage' });
            return hi
           
          }
        });*/
        //shallowwrapper.setState({ haha:'ladygage' });
        console.log(shallowwrapper.state().haha);
        /*var a = accounts_array.indexOf(mocked2.email);
        console.log(a);*/

        //console.log(shallowwrapper.state().data[0].email.toString());
        //expect(shallowwrapper.state().data[0].first_name.toString()).toBe("Mo");

        //input.props().onChange(mockedEvent);
        /*shallowwrapper.setState({ selectedIndex: 0 });*/

        // Expecting a filtered result
        /*expect(shallowwrapper.state().filteredData.length).toBe(2);
        expect(shallowwrapper.state().filteredData[0].first_name.toString()).toBe("Mo");*/
    });
    it('should perform a simple login action (pdassing test)', async () => {
        fetch = jest.fn(() => Promise.resolve());
        const passwordMatches = await bcrypt.compare('test1', "$2a$10$J4dMuBKah51tFHXPyt66cORe.erC47vcqcjXvjaTrTQmaEl25VDh2");
        //expect(passwordMatches).toEqual(true);
    });
   
}); 