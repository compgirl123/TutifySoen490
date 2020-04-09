import React from "react";
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SignUp, { SignUp as SignUpClass } from "./../src/components/SignUp";
import SearchTutors, { SearchTutors as SearchTutorsClass } from "./../src/components/SearchTutors";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import Select from "@material-ui/core/Select";
import Checkbox from '@material-ui/core/Checkbox';
const bcrypt = require('bcryptjs')

var json = require("./testDb/accounts.json");

configure({ adapter: new Adapter() });
describe('The Sign Up Page ', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Should Perform a Simple (working) Sign Up Test', () => {
        // The values sent to the email and password input text fields.
        // This is a sample student SignUp
        const mocked_signup = {
            first_name : "Claudia", 
            last_name: "Feochari",
            program_of_study : "Software Engineering",
            email : "claudia@gmail.com",
            password: "test12345",
            cPassword : "test12345",
            education_level : "university",
            school: "concordia"
        }

        const wrapper = mount(<SignUp></SignUp>);
        const wrapper_shallow = shallow(<SignUp></SignUp>);
        const shallowwrapper = wrapper.find(SignUpClass);
        shallowwrapper.setState({ data: json.data });
        
        shallowwrapper.setState({ first_name: mocked_signup.first_name });
        const first_name = wrapper.find(TextField).at(0);
        const mocked_first_name = {target:{value:mocked_signup.first_name}}

        first_name.props().onChange(mocked_first_name);
        expect(/\d/.test(shallowwrapper.state().first_name)).not.toBe(true);

        expect(shallowwrapper.state().first_name).toBe(mocked_signup.first_name);

        shallowwrapper.setState({ last_name: mocked_signup.last_name });
        const last_name = wrapper.find(TextField).at(1);
        const mocked_last_name = {target:{value:mocked_signup.last_name}}
        last_name.props().onChange(mocked_last_name);

        expect(/\d/.test(shallowwrapper.state().last_name)).not.toBe(true);

        expect(shallowwrapper.state().last_name).toBe(mocked_signup.last_name);

        shallowwrapper.setState({ program_of_study: mocked_signup.program_of_study });
        const program_of_study = wrapper.find(TextField).at(2);
        const mocked_program_of_study = {target:{value:mocked_signup.program_of_study}}
        program_of_study.props().onChange(mocked_program_of_study);

        expect(shallowwrapper.state().program_of_study).toBe(mocked_signup.program_of_study);

        shallowwrapper.setState({ email: mocked_signup.email });
        const email = wrapper.find(TextField).at(3);
        const mocked_email = {target:{value:mocked_signup.email}}
        email.props().onChange(mocked_email);

        expect(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(shallowwrapper.state().email)).toBe(true);

        expect(shallowwrapper.state().email).toBe(mocked_signup.email);

        shallowwrapper.setState({ password: mocked_signup.password });
        const password = wrapper.find(TextField).at(4);
        const mocked_password = {target:{value:mocked_signup.password}}
        password.props().onChange(mocked_password);

        expect(/\d/.test(shallowwrapper.state().password)).toBe(true);

        expect(shallowwrapper.state().password).toBe(mocked_signup.password);

        shallowwrapper.setState({ cPassword: mocked_signup.cPassword });
        const cPassword = wrapper.find(TextField).at(5);
        const mocked_cPassword = {target:{value:mocked_signup.cPassword}}
        cPassword.props().onChange(mocked_cPassword);

        expect(/\d/.test(shallowwrapper.state().cPassword)).toBe(true);

        expect(shallowwrapper.state().cPassword ).toBe(mocked_signup.cPassword);

        expect(shallowwrapper.state().password).toBe(shallowwrapper.state().cPassword);

        shallowwrapper.setState({ education_level: mocked_signup.education_level });
        const education_level = wrapper.find(Select).at(0);
        const mocked_education_level = {target:{value:mocked_signup.education_level}}
        education_level.props().onChange(mocked_education_level);

        shallowwrapper.setState({ school: mocked_signup.school });
        const school = wrapper.find(TextField).at(1);
        const mocked_school = {target:{value:mocked_signup.school}}
        school.props().onChange(mocked_school);

        const checkbox = wrapper.find(Checkbox).at(0);
        const mocked_checkbox = {target:{checked:true}}
        checkbox.props().onChange(mocked_checkbox);

        const signup_button = wrapper.find(Button).at(0);
        var login_index = ((signup_button.props().children.type).toString()).indexOf("Login");

        expect(((signup_button.props().children.type).toString()).substring(login_index,14)).toBe("Login");
    
        signup_button.simulate('click');

    });
    
}); 