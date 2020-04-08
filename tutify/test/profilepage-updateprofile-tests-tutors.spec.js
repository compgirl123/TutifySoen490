import React from "react";
import InputBase from '@material-ui/core/InputBase';
import UserInfo, { UserInfo as UserInfoClass } from "../src/components/ProfilePage/UserInfo";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';

var json = require("./testDb/profiles.json");

configure({ adapter: new Adapter() });

describe('The Profile Page updating Profile Feature for Tutors.', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Testing the update courses for Tutors. Updating one of the values present in the Dialog Box (school of tutor)'
        , () => {
            const wrapper = mount(<UserInfo></UserInfo>);
            const wrapper_shallow = shallow(<UserInfo></UserInfo>);
            const tutor_class_wrapper = wrapper.find(UserInfoClass);
            tutor_class_wrapper.setState({ data: json.data });

            /**
             * Part 1 : Setting of the default profile page settings.
            */

            // Finding the Typography html document that contains the type of user on the page (Tutor or Student).
            const tutor_status_input = wrapper.find(Typography).at(1);

            // Checks if this Typography html document includes the word tutor to see if this is a tutor object
            var tutor = tutor_status_input.props().children.includes("Tutor");

            // Saving all of the profile data from the profile.json into a variable.
            var profile_array = tutor_class_wrapper.state().data;
            var tutor_selected = 0;

            // Select the first profile that appears as a tutor profile that will be used as a mocked event.
            // Save this tutor profile index information in a variable.
            for (var x = 0; x < profile_array.length; x++) {
                if (profile_array[x].__t == "tutor") {
                    tutor_selected = x;
                    break;
                }
            }

            // If the description of the type of user on the page is a tutor, then perform this if statement.
            if (tutor) {

                /* Setting the state of the wrapper in order to take the information from the school and set the wrapper 
                with the tutor's school */
                tutor_class_wrapper.setState({ school: profile_array[tutor_selected].school });
            }

            // Expecting a result that contains the appropriate school of the tutor.
            expect(tutor_class_wrapper.state().school).toBe(profile_array[tutor_selected].school);

            /**
             * Part 2: Setting values present on profile page and collecting that data and simulating an "update" 
            */

            // Edit Profile display information on the Tutor Profile Page.
            var edit_information_text_on_page = wrapper_shallow.dive().find(DialogTitle).props().children;
            var edit_information_description_on_page = wrapper_shallow.dive().find(DialogContentText).props().children;

            // Verify Tutor Profile information to see if the description in the Dialog Matches its Function 
            expect(edit_information_text_on_page).toBe("Edit Information");
            expect(edit_information_description_on_page).toBe("To edit your information, please change the desired value fields and click save.");

            // Get school name value and then assign it to a new value.
            var school_name_value = wrapper_shallow.dive().find(TextField).at(3);
            school_name_value.value = "Tutify Tutor Mo";

            // Assign the TextField Object a value for the new tutor school value.
            const school_changed = { target: { value: school_name_value.value } };

            // Sending the onChange event to the TextField element.
            school_name_value.props().onChange(school_changed);

            /* Setting the new updated state wrapper in order to take the new information from the school
               and set the wrapper with the tutor's new school */
            tutor_class_wrapper.setState({ updatedSchool: school_name_value.value });

            // Finding Update Button in order to update original state present on page with modified state. 
            var update_button = wrapper_shallow.dive().find(Button).at(1);

            // Update original state with new state on click of the update button.
            update_button.props().onClick(tutor_class_wrapper.state().school = tutor_class_wrapper.state().updatedSchool);

            // Verify if the original school state now equals the new state. Expect tests to pass.
            expect(tutor_class_wrapper.state().school).toBe(tutor_class_wrapper.state().updatedSchool);

        });

    it('Testing the update courses for Tutors. Updating two of the values present in the Dialog Box (first and last name)'
        , () => {
            // All the mounting and state setting
            const wrapper = mount(<UserInfo></UserInfo>);
            const wrapper_shallow = shallow(<UserInfo></UserInfo>);
            const tutor_class_wrapper = wrapper.find(UserInfoClass);
            tutor_class_wrapper.setState({ data: json.data });

            /**
             * Part 1 : Setting of the default profile page settings.
            */

            const tutor_status_input = wrapper.find(Typography).at(1);
            var tutor = tutor_status_input.props().children.includes("Tutor");
            var profile_array = tutor_class_wrapper.state().data;
            var tutor_selected = 0;

            for (var x = 0; x < profile_array.length; x++) {
                if (profile_array[x].__t == "tutor") {
                    tutor_selected = x;
                    break;
                }
            }

            if (tutor) {
                tutor_class_wrapper.setState({
                    first_name: profile_array[tutor_selected].first_name,
                    last_name: profile_array[tutor_selected].last_name
                });
            }

            expect(tutor_class_wrapper.state().first_name).toBe(profile_array[tutor_selected].first_name);

            expect(tutor_class_wrapper.state().last_name).toBe(profile_array[tutor_selected].last_name);

            /**
             * Part 2: Setting values present on profile page and collecting that data and simulating an "update" 
            */

            var edit_information_text_on_page = wrapper_shallow.dive().find(DialogTitle).props().children;
            var edit_information_description_on_page = wrapper_shallow.dive().find(DialogContentText).props().children;

            expect(edit_information_text_on_page).toBe("Edit Information");
            expect(edit_information_description_on_page).toBe("To edit your information, please change the desired value fields and click save.");

            var first_name_value = wrapper_shallow.dive().find(TextField).at(0);
            first_name_value.value = "Mo";

            const first_name_changed = { target: { value: first_name_value.value } }

            first_name_value.props().onChange(first_name_changed);

            tutor_class_wrapper.setState({ updatedFirstName: first_name_value.value });

            var last_name_value = wrapper_shallow.dive().find(TextField).at(1);
            last_name_value.value = "Al";

            const last_name_changed = { target: { value: last_name_value.value } }
            last_name_value.props().onChange(last_name_changed);

            tutor_class_wrapper.setState({ updatedLastName: last_name_value.value });

            var update_button = wrapper_shallow.dive().find(Button).at(1);

            update_button.props().onClick(tutor_class_wrapper.state().first_name = tutor_class_wrapper.state().updatedFirstName,
                tutor_class_wrapper.state().last_name = tutor_class_wrapper.state().updatedLastName);

            expect(tutor_class_wrapper.state().first_name.value).toBe(tutor_class_wrapper.state().updatedFirstName.value);

            expect(tutor_class_wrapper.state().last_name.value).toBe(tutor_class_wrapper.state().updatedLastName.value);

        });

    it('Testing the update courses for Tutors. Updating three of the values present in the Dialog Box (first, last name , program of study).'
        , () => {
            const wrapper = mount(<UserInfo></UserInfo>);
            const wrapper_shallow = shallow(<UserInfo></UserInfo>);
            const tutor_class_wrapper = wrapper.find(UserInfoClass);
            tutor_class_wrapper.setState({ data: json.data });

            /**
             * Part 1 : Setting of the default profile page settings.
            */

            const tutor_status_input = wrapper.find(Typography).at(1);
            var tutor = tutor_status_input.props().children.includes("Tutor");
            var profile_array = tutor_class_wrapper.state().data;
            var tutor_selected = 0;

            for (var x = 0; x < profile_array.length; x++) {
                if (profile_array[x].__t == "tutor") {
                    tutor_selected = x;
                    break;
                }
            }

            if (tutor) {
                tutor_class_wrapper.setState({
                    first_name: profile_array[tutor_selected].first_name,
                    last_name: profile_array[tutor_selected].last_name,
                    program_of_study: profile_array[tutor_selected].program_of_study
                });
            }

            expect(tutor_class_wrapper.state().first_name).toBe(profile_array[tutor_selected].first_name);

            expect(tutor_class_wrapper.state().last_name).toBe(profile_array[tutor_selected].last_name);

            expect(tutor_class_wrapper.state().program_of_study).toBe(profile_array[tutor_selected].program_of_study);

            /**
             * Part 2: Setting values present on profile page and collecting that data and simulating an "update" 
            */

            var edit_information_text_on_page = wrapper_shallow.dive().find(DialogTitle).props().children;
            var edit_information_description_on_page = wrapper_shallow.dive().find(DialogContentText).props().children;

            expect(edit_information_text_on_page).toBe("Edit Information");
            expect(edit_information_description_on_page).toBe("To edit your information, please change the desired value fields and click save.");

            var first_name_value = wrapper_shallow.dive().find(TextField).at(0);
            first_name_value.value = "Melanie";

            const first_name_changed = { target: { value: first_name_value.value } }
            first_name_value.props().onChange(first_name_changed);
            tutor_class_wrapper.setState({ updatedFirstName: first_name_value.value });

            var last_name_value = wrapper_shallow.dive().find(TextField).at(1);
            last_name_value.value = "Young";

            const last_name_changed = { target: { value: last_name_value.value } }
            last_name_value.props().onChange(last_name_changed);

            tutor_class_wrapper.setState({ updatedLastName: last_name_value.value });

            var program_name_value = wrapper_shallow.dive().find(TextField).at(1);
            program_name_value.value = "Business Administration";

            const program_name_changed = { target: { value: program_name_value.value } }
            program_name_value.props().onChange(program_name_changed);

            tutor_class_wrapper.setState({ updatedProgramOfStudy: program_name_value.value });

            var update_button = wrapper_shallow.dive().find(Button).at(1);
            update_button.props().onClick(tutor_class_wrapper.state().first_name = tutor_class_wrapper.state().updatedFirstName,
                tutor_class_wrapper.state().last_name = tutor_class_wrapper.state().updatedLastName,
                tutor_class_wrapper.state().program_of_study = tutor_class_wrapper.state().updatedProgramOfStudy);

            expect(tutor_class_wrapper.state().first_name.value).toBe(tutor_class_wrapper.state().updatedFirstName.value);

            expect(tutor_class_wrapper.state().last_name.value).toBe(tutor_class_wrapper.state().updatedLastName.value);

            expect(tutor_class_wrapper.state().program_of_study.value).toBe(tutor_class_wrapper.state().updatedProgramOfStudy.value);

        });

    it('Testing the update courses for Tutors. Updating all four of the values present in the Dialog Box (first, last name , program of study, school).', () => {
        // All the mounting and state setting
        const wrapper = mount(<UserInfo></UserInfo>);
        const wrapper_shallow = shallow(<UserInfo></UserInfo>);
        const tutor_class_wrapper = wrapper.find(UserInfoClass);
        tutor_class_wrapper.setState({ data: json.data });

        /**
         * Part 1 : Setting of the default profile page settings.
        */

        const tutor_status_input = wrapper.find(Typography).at(1);
        var tutor = tutor_status_input.props().children.includes("Tutor");
        var profile_array = tutor_class_wrapper.state().data;
        var tutor_selected = 0;

        for (var x = 0; x < profile_array.length; x++) {
            if (profile_array[x].__t == "tutor") {
                tutor_selected = x;
                break;
            }
        }

        if (tutor) {
            tutor_class_wrapper.setState({
                first_name: profile_array[tutor_selected].first_name,
                last_name: profile_array[tutor_selected].last_name,
                program_of_study: profile_array[tutor_selected].program_of_study,
                school: profile_array[tutor_selected].school
            });
        }

        expect(tutor_class_wrapper.state().first_name).toBe(profile_array[tutor_selected].first_name);

        expect(tutor_class_wrapper.state().last_name).toBe(profile_array[tutor_selected].last_name);

        expect(tutor_class_wrapper.state().program_of_study).toBe(profile_array[tutor_selected].program_of_study);

        expect(tutor_class_wrapper.state().school).toBe(profile_array[tutor_selected].school);

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

        tutor_class_wrapper.setState({ updatedFirstName: first_name_value.value });

        var last_name_value = wrapper_shallow.dive().find(TextField).at(1);
        last_name_value.value = "Smith";

        const last_name_changed = { target: { value: last_name_value.value } }
        last_name_value.props().onChange(last_name_changed);

        tutor_class_wrapper.setState({ updatedLastName: last_name_value.value });

        var program_name_value = wrapper_shallow.dive().find(TextField).at(1);
        program_name_value.value = "English Studies";

        const program_name_changed = { target: { value: program_name_value.value } }
        program_name_value.props().onChange(program_name_changed);

        tutor_class_wrapper.setState({ updatedProgramOfStudy: program_name_value.value });

        var school_name_value = wrapper_shallow.dive().find(TextField).at(1);
        school_name_value.value = "McGill";

        const school_name_changed = { target: { value: school_name_value.value } }
        school_name_value.props().onChange(school_name_changed);

        tutor_class_wrapper.setState({ updatedSchool: school_name_value.value });

        var update_button = wrapper_shallow.dive().find(Button).at(1);

        update_button.props().onClick(tutor_class_wrapper.state().first_name = tutor_class_wrapper.state().updatedFirstName,
            tutor_class_wrapper.state().last_name = tutor_class_wrapper.state().updatedLastName,
            tutor_class_wrapper.state().program_of_study = tutor_class_wrapper.state().updatedProgramOfStudy,
            tutor_class_wrapper.state().school = tutor_class_wrapper.state().updatedSchool);

        expect(tutor_class_wrapper.state().first_name.value).toBe(tutor_class_wrapper.state().updatedFirstName.value);

        expect(tutor_class_wrapper.state().last_name.value).toBe(tutor_class_wrapper.state().updatedLastName.value);

        expect(tutor_class_wrapper.state().program_of_study.value).toBe(tutor_class_wrapper.state().updatedProgramOfStudy.value);

        expect(tutor_class_wrapper.state().program_of_study.value).toBe(tutor_class_wrapper.state().updatedSchool.value);

    });

});  
