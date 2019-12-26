import React from "react";
import UserInfo, { UserInfo as UserInfoClass } from "../src/components/profilePage/UserInfo";
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

    it('Testing the update profile function for Students. Updating all five of the values present in the Dialog Box.', () => {

        /**
         * Setting of the default profile page settings.
         */

        // All the mounting and state setting for UserInfo Class
        const wrapper = mount(<UserInfo></UserInfo>);
        const mockCallBack = jest.fn();
        const wrapper4 = shallow(<UserInfo><Button onClick={mockCallBack}>Ok!</Button></UserInfo>);
        const shallowwrapper = wrapper.find(UserInfoClass);
        shallowwrapper.setState({ data: json.data });
        
         // Finding the Typography html document that contains the type of user on the page (Tutor or Student).
        const student_status_input = wrapper.find(Typography).at(1);
        console.log(student_status_input.props().children);

        // Checks if this Typography html document includes the word student to see if this is a student object
        var student = student_status_input.props().children.includes("Student");
        console.log(student);
        
        // Saving all of the profile data from the profile.json into a variable.
        var profile_array = shallowwrapper.state().data;
        var student_selected = 0;

        // Select the first profile that appears as a student profile that will be used as a mocked event.
        // Save this student profile index information in a variable.
        for(var x=0;x<profile_array.length;x++){
            if(profile_array[x].__t == "student"){
                student_selected = x;
                break;
            }
        }

        // The Student profile that is mocked. This is taken from the profiles.json file
        const mockedEvent = profile_array[student_selected];
    
        // if the description of the type of user on the page is a student, then perform this if statement.
       if(student){
            // Finding the Typography HTML document that contains the email of the student.
            const email_input = wrapper.find(Typography).at(2);
            console.log(email_input.props().children[0]);
            // Setting the email component on the page with the email of the student (setting initial variables)
            email_input.props().children = email_input.props().children[0] + profile_array[student_selected].email;
            console.log(email_input.props().children);
            /* Setting the state of the wrapper in order to take the information from the email and set the wrapper 
               with the student's email address */
            shallowwrapper.setState({ student_email: email_input.props().children });

            // Finding the Box HTML document that contains the first and last name of the student.
            const name_input = wrapper.find(Box).at(0);
            console.log(name_input.props().children);
            // Setting the full name component on the page with the full name of the student (setting initial variables)
            name_input.props().children = profile_array[student_selected].first_name + " " 
                                        + profile_array[student_selected].last_name;
            console.log(name_input.props().children);
            /* Setting the state of the wrapper in order to take the information from the email and set the wrapper 
               with the student's Full Name */
            shallowwrapper.setState({ full_name: name_input.props().children });

            // Finding the Typography HTML document that contains the program of study of the student.
            const program_input = wrapper.find(Typography).at(3);
            console.log(program_input.props().children);
            // Setting the full name component on the page with the full name of the student (setting initial variables)
            program_input.props().children = program_input.props().children[0] + profile_array[student_selected].program_of_study;
            console.log(program_input.props().children);
            /* Setting the state of the wrapper in order to take the information from the email and set the wrapper 
               with the student's Program of Study */
            shallowwrapper.setState({ program_of_study: program_input.props().children });

            // Finding the Typography HTML document that contains the school of the student.
            const school_input = wrapper.find(Typography).at(4);
            console.log(school_input.props().children);
            // Setting the full name component on the page with the full name of the student (setting initial variables)
            school_input.props().children = school_input.props().children[0] + profile_array[student_selected].school;
            console.log(school_input.props().children);
            /* Setting the state of the wrapper in order to take the information from the email and set the wrapper 
               with the student's school */
            shallowwrapper.setState({ school: school_input.props().children });

            // Finding the Typography HTML document that contains the education level of the student.
            const education_input = wrapper.find(Typography).at(5);
            console.log(education_input.props().children);
            // Setting the full name component on the page with the full name of the student (setting initial variables)
            education_input.props().children = education_input.props().children[0] + profile_array[student_selected].education_level;
            console.log(education_input.props().children);
            /* Setting the state of the wrapper in order to take the information from the email and set the wrapper 
               with the student's education */
            shallowwrapper.setState({ education: education_input.props().children });
        }
        // Expecting a result that contains the appropriate email of the student.
        expect(shallowwrapper.state().student_email).toBe("Email : "+profile_array[student_selected].email);
        // Expecting a result that contains the appropriate email of the student.
        expect(shallowwrapper.state().full_name).toBe(profile_array[student_selected].first_name + " " 
        + profile_array[student_selected].last_name); 
        // Expecting a result that contains the appropriate email of the student.
        expect(shallowwrapper.state().program_of_study).toBe("Program of Study: "+profile_array[student_selected].program_of_study);
        // Expecting a result that contains the appropriate email of the student.
        expect(shallowwrapper.state().school).toBe("School: "+profile_array[student_selected].school);
        // Expecting a result that contains the appropriate email of the student.
        expect(shallowwrapper.state().education).toBe("Education Level: "+profile_array[student_selected].education_level);

        /**
         * Setting values present on profile page and collecting that data and simulating an "update" 
        */

        var edit_information_text_on_page = wrapper4.dive().find(DialogTitle).props().children;
        console.log(edit_information_text_on_page);
        var edit_information_description_on_page = wrapper4.dive().find(DialogContentText).props().children;
        console.log(edit_information_description_on_page);
    
        var first_name_value = wrapper4.dive().find(TextField).at(0);
        shallowwrapper.state().student_email
        console.log(first_name_value);
        first_name_value.value = "Paul";
        console.log(first_name_value.value);
        console.log(first_name_value.props().id);
        
        var last_name_value = wrapper4.dive().find(TextField).at(1);
        console.log(last_name_value );
        last_name_value.value = "Smith";
        console.log(last_name_value);
        console.log(last_name_value .props().id);

        var program_name_value = wrapper4.dive().find(TextField).at(2);
        console.log(program_name_value);
        program_name_value.value = "Mechanical Engineering";
        const changed = { target: { value: program_name_value.value } } 
        
        // Sending the onChange event
        program_name_value.props().onChange(changed);
        shallowwrapper.setState({ updatedProgramOfStudy: program_name_value });
        console.log(shallowwrapper.state().updatedProgramOfStudy);
        console.log(program_name_value.props().id);
        console.log(shallowwrapper.state().program_of_study);

        var school_name_value = wrapper4.dive().find(TextField).at(3);
        console.log(school_name_value);
        school_name_value.value = "Concordia";
        console.log(school_name_value);
        console.log(school_name_value.props().id);

        var education_level_value = wrapper4.dive().find(TextField).at(4);
        console.log(education_level_value);
        education_level_value.value = "University";
        console.log(education_level_value);

        var update_button = wrapper4.dive().find(Button).at(1);
        console.log(update_button.props());
        update_button.props().onClick(shallowwrapper.state().program_of_study = shallowwrapper.state().updatedProgramOfStudy); 
        console.log(shallowwrapper.state().program_of_study);
        
        console.log(update_button.props());
        console.log(shallowwrapper.state().updatedProgramOfStudy);
        console.log(shallowwrapper.state().program_of_study);
        
        const input1 = wrapper.find(TextField).at(0);
        const first_name_update = wrapper.find(Dialog).at(0);
        console.log(wrapper4.dive().find(TextField).exists())
        console.log(wrapper4.dive().find(TextField).at(0).props())    
    });

    it('Testing the update profile function for Students. Updating one of the values present in the Dialog Box.', () => {
        
    });

    it('Testing the update courses for Tutors. Updating two of the values present in the Dialog Box.', () => {
        
    });

    it('Testing the update courses for Tutors. Updating three of the values present in the Dialog Box.', () => {
        
    });

    it('Testing the update courses for Tutors. Updating four of the values present in the Dialog Box.', () => {
        
    });




}); 
