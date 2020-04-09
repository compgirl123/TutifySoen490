import React from "react";
import UserInfo, { UserInfo as UserInfoClass } from "../src/components/ProfilePage/UserInfo";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';

// importing the json object with the profile information
var json = require("./testDb/profiles.json");

configure({ adapter: new Adapter() });

// Get a mocked student object and set all her information on the page. 
describe('The Profile Page updating Profile Feature', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Testing the update courses for Students. Updating one of the values present in the Dialog Box (education level of student)', () => {
        const wrapper = mount(<UserInfo></UserInfo>);
        const wrapper_shallow = shallow(<UserInfo></UserInfo>);
        const student_class_wrapper = wrapper.find(UserInfoClass);
        student_class_wrapper.setState({ data: json.data });

        /**
         * Part 1 : Setting of the default profile page settings.
        */

        const student_status_input = wrapper.find(Typography).at(1);
        var student = student_status_input.props().children.includes("Student");
        var profile_array = student_class_wrapper.state().data;
        var student_selected = 0;

        // Select the first profile that appears as a student profile that will be used as a mocked event.
        // Save this student profile index information in a variable.
        for (var x = 0; x < profile_array.length; x++) {
            if (profile_array[x].__t == "student") {
                student_selected = x;
                break;
            }
        }

        // If the description of the type of user on the page is a student, then perform this if statement.
        if (student) {
            student_class_wrapper.setState({ education_level: profile_array[student_selected].education_level });
        }

        /**
         * Part 2: Setting values present on profile page and collecting that data and simulating an "update" 
        */

        var edit_information_text_on_page = wrapper_shallow.dive().find(DialogTitle).props().children;
        var edit_information_description_on_page = wrapper_shallow.dive().find(DialogContentText).props().children;

        expect(edit_information_text_on_page).toBe("Edit Information");
        expect(edit_information_description_on_page).toBe("To edit your information, please change the desired value fields and click save.");

        var education_level_name_value = wrapper_shallow.dive().find(TextField).at(3);
        education_level_name_value.value = "College";

        const education_level_changed = { target: { value: education_level_name_value.value } };
        education_level_name_value.props().onChange(education_level_changed);

        /* Setting the new updated state wrapper in order to take the new information from the education_level
           and set the wrapper with the student's new education_level */
        student_class_wrapper.setState({ updatedEducationLevel: education_level_name_value.value });

        var update_button = wrapper_shallow.dive().find(Button).at(1);
        update_button.props().onClick(student_class_wrapper.state().education_level = student_class_wrapper.state().updatedEducationLevel);
        expect(student_class_wrapper.state().education_level).toBe(student_class_wrapper.state().updatedEducationLevel);
    });

    it('Testing the update courses for students. Updating two of the values present in the Dialog Box (First and Last Name).', () => {
        const wrapper = mount(<UserInfo></UserInfo>);
        const wrapper_shallow = shallow(<UserInfo></UserInfo>);
        const student_class_wrapper = wrapper.find(UserInfoClass);
        student_class_wrapper.setState({ data: json.data });

        /**
         * Part 1 : Setting of the default profile page settings.
        */

        const student_status_input = wrapper.find(Typography).at(1);
        var student = student_status_input.props().children.includes("Student");
        var profile_array = student_class_wrapper.state().data;
        var student_selected = 0;

        // Select the first profile that appears as a student profile that will be used as a mocked event.
        // Save this student profile index information in a variable.
        for (var x = 0; x < profile_array.length; x++) {
            if (profile_array[x].__t == "student") {
                student_selected = x;
                break;
            }
        }

        // If the description of the type of user on the page is a student, then perform this if statement.
        if (student) {
            student_class_wrapper.setState({ first_name: profile_array[student_selected].first_name, last_name: profile_array[student_selected].last_name });
        }

        /**
         * Part 2: Setting values present on profile page and collecting that data and simulating an "update" 
        */

        var edit_information_text_on_page = wrapper_shallow.dive().find(DialogTitle).props().children;
        var edit_information_description_on_page = wrapper_shallow.dive().find(DialogContentText).props().children;
        expect(edit_information_text_on_page).toBe("Edit Information");
        expect(edit_information_description_on_page).toBe("To edit your information, please change the desired value fields and click save.");

        var first_name_value = wrapper_shallow.dive().find(TextField).at(0);
        first_name_value.value = "Marisa";

        const first_name_changed = { target: { value: first_name_value.value } }
        first_name_value.props().onChange(first_name_changed);

        student_class_wrapper.setState({ updatedFirstName: first_name_value.value });

        var last_name_value = wrapper_shallow.dive().find(TextField).at(1);
        last_name_value.value = "Ceena";

        const last_name_changed = { target: { value: last_name_value.value } }
        last_name_value.props().onChange(last_name_changed);

        student_class_wrapper.setState({ updatedLastName: last_name_value.value });

        var update_button = wrapper_shallow.dive().find(Button).at(1);

        update_button.props().onClick(student_class_wrapper.state().first_name = student_class_wrapper.state().updatedFirstName,
            student_class_wrapper.state().last_name = student_class_wrapper.state().updatedLastName);


        expect(student_class_wrapper.state().first_name.value).toBe(student_class_wrapper.state().updatedFirstName.value);

        expect(student_class_wrapper.state().last_name.value).toBe(student_class_wrapper.state().updatedLastName.value);

    });

    it('Testing the update courses for students. Updating three of the values present in the Dialog Box (first, last name , program of study).', () => {
        const wrapper = mount(<UserInfo></UserInfo>);
        const wrapper_shallow = shallow(<UserInfo></UserInfo>);
        const student_class_wrapper = wrapper.find(UserInfoClass);
        student_class_wrapper.setState({ data: json.data });

        /**
         * Part 1 : Setting of the default profile page settings.
        */

        const student_status_input = wrapper.find(Typography).at(1);
        var student = student_status_input.props().children.includes("Student");
        var profile_array = student_class_wrapper.state().data;
        var student_selected = 0;

        // Select the first profile that appears as a student profile that will be used as a mocked event.
        // Save this student profile index information in a variable.
        for (var x = 0; x < profile_array.length; x++) {
            if (profile_array[x].__t == "student") {
                student_selected = x;
                break;
            }
        }

        // If the description of the type of user on the page is a student, then perform this if statement.
        if (student) {
            student_class_wrapper.setState({
                first_name: profile_array[student_selected].first_name,
                last_name: profile_array[student_selected].last_name,
                program_of_study: profile_array[student_selected].program_of_study
            });
        }

        /**
         * Part 2: Setting values present on profile page and collecting that data and simulating an "update" 
        */

        var edit_information_text_on_page = wrapper_shallow.dive().find(DialogTitle).props().children;
        var edit_information_description_on_page = wrapper_shallow.dive().find(DialogContentText).props().children;
        expect(edit_information_text_on_page).toBe("Edit Information");
        expect(edit_information_description_on_page).toBe("To edit your information, please change the desired value fields and click save.");

        var first_name_value = wrapper_shallow.dive().find(TextField).at(0);
        first_name_value.value = "Michelle";

        const first_name_changed = { target: { value: first_name_value.value } }
        first_name_value.props().onChange(first_name_changed);

        student_class_wrapper.setState({ updatedFirstName: first_name_value.value });

        var last_name_value = wrapper_shallow.dive().find(TextField).at(1);
        last_name_value.value = "Peterson";

        const last_name_changed = { target: { value: last_name_value.value } }
        last_name_value.props().onChange(last_name_changed);

        student_class_wrapper.setState({ updatedLastName: last_name_value.value });

        var program_name_value = wrapper_shallow.dive().find(TextField).at(1);
        program_name_value.value = "French Studies";

        const program_name_changed = { target: { value: program_name_value.value } }
        program_name_value.props().onChange(program_name_changed);

        student_class_wrapper.setState({ updatedProgramOfStudy: program_name_value.value });

        var update_button = wrapper_shallow.dive().find(Button).at(1);

        update_button.props().onClick(student_class_wrapper.state().first_name = student_class_wrapper.state().updatedFirstName,
            student_class_wrapper.state().last_name = student_class_wrapper.state().updatedLastName,
            student_class_wrapper.state().program_of_study = student_class_wrapper.state().updatedProgramOfStudy);

        expect(student_class_wrapper.state().first_name.value).toBe(student_class_wrapper.state().updatedFirstName.value);

        expect(student_class_wrapper.state().last_name.value).toBe(student_class_wrapper.state().updatedLastName.value);

        expect(student_class_wrapper.state().program_of_study.value).toBe(student_class_wrapper.state().updatedProgramOfStudy.value);

    });

    it('Testing the update courses for students. Updating four of the values present in the Dialog Box (first, last name , program of study, school).', () => {
        const wrapper = mount(<UserInfo></UserInfo>);
        const wrapper_shallow = shallow(<UserInfo></UserInfo>);
        const student_class_wrapper = wrapper.find(UserInfoClass);
        student_class_wrapper.setState({ data: json.data });

        /**
         * Part 1 : Setting of the default profile page settings.
        */

        const student_status_input = wrapper.find(Typography).at(1);
        var student = student_status_input.props().children.includes("Student");

        var profile_array = student_class_wrapper.state().data;
        var student_selected = 0;

        for (var x = 0; x < profile_array.length; x++) {
            if (profile_array[x].__t == "student") {
                student_selected = x;
                break;
            }
        }

        if (student) {
            student_class_wrapper.setState({
                first_name: profile_array[student_selected].first_name,
                last_name: profile_array[student_selected].last_name,
                program_of_study: profile_array[student_selected].program_of_study,
                school: profile_array[student_selected].school
            });
        }

        /**
         * Part 2: Setting values present on profile page and collecting that data and simulating an "update" 
        */

        var edit_information_text_on_page = wrapper_shallow.dive().find(DialogTitle).props().children;
        var edit_information_description_on_page = wrapper_shallow.dive().find(DialogContentText).props().children;

        expect(edit_information_text_on_page).toBe("Edit Information");
        expect(edit_information_description_on_page).toBe("To edit your information, please change the desired value fields and click save.");

        var first_name_value = wrapper_shallow.dive().find(TextField).at(0);
        first_name_value.value = "Zoe";

        const first_name_changed = { target: { value: first_name_value.value } }
        first_name_value.props().onChange(first_name_changed);

        student_class_wrapper.setState({ updatedFirstName: first_name_value.value });

        var last_name_value = wrapper_shallow.dive().find(TextField).at(1);
        last_name_value.value = "Smith";

        const last_name_changed = { target: { value: last_name_value.value } }
        last_name_value.props().onChange(last_name_changed);

        student_class_wrapper.setState({ updatedLastName: last_name_value.value });

        var program_name_value = wrapper_shallow.dive().find(TextField).at(1);
        program_name_value.value = "English Studies";

        const program_name_changed = { target: { value: program_name_value.value } }

        program_name_value.props().onChange(program_name_changed);

        student_class_wrapper.setState({ updatedProgramOfStudy: program_name_value.value });

        var school_name_value = wrapper_shallow.dive().find(TextField).at(1);
        school_name_value.value = "McGill";

        const school_name_changed = { target: { value: school_name_value.value } }

        school_name_value.props().onChange(school_name_changed);

        student_class_wrapper.setState({ updatedSchool: school_name_value.value });

        var update_button = wrapper_shallow.dive().find(Button).at(1);

        update_button.props().onClick(student_class_wrapper.state().first_name = student_class_wrapper.state().updatedFirstName,
            student_class_wrapper.state().last_name = student_class_wrapper.state().updatedLastName,
            student_class_wrapper.state().program_of_study = student_class_wrapper.state().updatedProgramOfStudy,
            student_class_wrapper.state().school = student_class_wrapper.state().updatedSchool);

        expect(student_class_wrapper.state().first_name.value).toBe(student_class_wrapper.state().updatedFirstName.value);

        expect(student_class_wrapper.state().last_name.value).toBe(student_class_wrapper.state().updatedLastName.value);

        expect(student_class_wrapper.state().program_of_study.value).toBe(student_class_wrapper.state().updatedProgramOfStudy.value);

        expect(student_class_wrapper.state().program_of_study.value).toBe(student_class_wrapper.state().updatedSchool.value);
    });

    it('Testing the update courses for students. Updating all five of the values present in the Dialog Box (first, last name , program of study, school, education_level).', () => {
        const wrapper = mount(<UserInfo></UserInfo>);
        const wrapper_shallow = shallow(<UserInfo></UserInfo>);
        const student_class_wrapper = wrapper.find(UserInfoClass);
        student_class_wrapper.setState({ data: json.data });

        /**
         * Part 1 : Setting of the default profile page settings.
        */

        const student_status_input = wrapper.find(Typography).at(1);
        var student = student_status_input.props().children.includes("Student");
        var profile_array = student_class_wrapper.state().data;
        var student_selected = 0;

        for (var x = 0; x < profile_array.length; x++) {
            if (profile_array[x].__t == "student") {
                student_selected = x;
                break;
            }
        }

        // If the description of the type of user on the page is a student, then perform this if statement.
        if (student) {
            student_class_wrapper.setState({
                first_name: profile_array[student_selected].first_name,
                last_name: profile_array[student_selected].last_name,
                program_of_study: profile_array[student_selected].program_of_study,
                school: profile_array[student_selected].school,
                education_level: profile_array[student_selected].education_level
            });
        }


        /**
         * Part 2: Setting values present on profile page and collecting that data and simulating an "update" 
        */

        var edit_information_text_on_page = wrapper_shallow.dive().find(DialogTitle).props().children;
        var edit_information_description_on_page = wrapper_shallow.dive().find(DialogContentText).props().children;

        expect(edit_information_text_on_page).toBe("Edit Information");
        expect(edit_information_description_on_page).toBe("To edit your information, please change the desired value fields and click save.");

        var first_name_value = wrapper_shallow.dive().find(TextField).at(0);
        first_name_value.value = "Francesca";

        const first_name_changed = { target: { value: first_name_value.value } }
        first_name_value.props().onChange(first_name_changed);

        student_class_wrapper.setState({ updatedFirstName: first_name_value.value });

        var last_name_value = wrapper_shallow.dive().find(TextField).at(1);
        last_name_value.value = "Jones";

        const last_name_changed = { target: { value: last_name_value.value } }

        last_name_value.props().onChange(last_name_changed);

        student_class_wrapper.setState({ updatedLastName: last_name_value.value });

        var program_name_value = wrapper_shallow.dive().find(TextField).at(1);
        program_name_value.value = "English Studies";

        const program_name_changed = { target: { value: program_name_value.value } }
        program_name_value.props().onChange(program_name_changed);

        student_class_wrapper.setState({ updatedProgramOfStudy: program_name_value.value });

        var school_name_value = wrapper_shallow.dive().find(TextField).at(1);
        school_name_value.value = "McGill";

        const school_name_changed = { target: { value: school_name_value.value } }

        school_name_value.props().onChange(school_name_changed);

        student_class_wrapper.setState({ updatedSchool: school_name_value.value });

        var education_level_name_value = wrapper_shallow.dive().find(TextField).at(3);
        education_level_name_value.value = "University";

        const education_level_changed = { target: { value: education_level_name_value.value } };

        education_level_name_value.props().onChange(education_level_changed);

        student_class_wrapper.setState({ updatedEducationLevel: education_level_name_value.value });

        var update_button = wrapper_shallow.dive().find(Button).at(1);

        update_button.props().onClick(student_class_wrapper.state().first_name = student_class_wrapper.state().updatedFirstName,
            student_class_wrapper.state().last_name = student_class_wrapper.state().updatedLastName,
            student_class_wrapper.state().program_of_study = student_class_wrapper.state().updatedProgramOfStudy,
            student_class_wrapper.state().school = student_class_wrapper.state().updatedSchool,
            student_class_wrapper.state().education_level = student_class_wrapper.state().updatedEducationLevel);

        expect(student_class_wrapper.state().first_name.value).toBe(student_class_wrapper.state().updatedFirstName.value);

        expect(student_class_wrapper.state().last_name.value).toBe(student_class_wrapper.state().updatedLastName.value);

        expect(student_class_wrapper.state().program_of_study.value).toBe(student_class_wrapper.state().updatedProgramOfStudy.value);

        expect(student_class_wrapper.state().program_of_study.value).toBe(student_class_wrapper.state().updatedSchool.value);

        expect(student_class_wrapper.state().education_level).toBe(student_class_wrapper.state().updatedEducationLevel);
    });

}); 
