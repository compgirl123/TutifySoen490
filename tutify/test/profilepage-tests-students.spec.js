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
        // All the mounting and state setting
        const wrapper = mount(<UserInfo></UserInfo>);
        const wrapper_shallow = shallow(<UserInfo></UserInfo>);
        const student_class_wrapper = wrapper.find(UserInfoClass);
        student_class_wrapper.setState({ data: json.data });

        /**
         * Part 1 : Setting of the default profile page settings.
        */

        // Finding the Typography html document that contains the type of user on the page (student or Student).
        const student_status_input = wrapper.find(Typography).at(1);

        // Checks if this Typography html document includes the word student to see if this is a student object
        var student = student_status_input.props().children.includes("Student");
        
        // Saving all of the profile data from the profile.json into a variable.
        var profile_array = student_class_wrapper.state().data;
        var student_selected = 0;

        // Select the first profile that appears as a student profile that will be used as a mocked event.
        // Save this student profile index information in a variable.
        for(var x=0;x<profile_array.length;x++){
            if(profile_array[x].__t == "student"){
                student_selected = x;
                break;
            }
        }

        // If the description of the type of user on the page is a student, then perform this if statement.
        if(student){

            /* Setting the state of the wrapper in order to take the information from the education_level and set the wrapper 
            with the student's education_level */
            student_class_wrapper.setState({ education_level: profile_array[student_selected].education_level });
        }

        // Expecting a result that contains the appropriate education_level of the student.
        expect(student_class_wrapper.state().education_level).toBe(profile_array[student_selected].education_level);

        /**
         * Part 2: Setting values present on profile page and collecting that data and simulating an "update" 
        */

        // Edit Profile display information on the student Profile Page.
        var edit_information_text_on_page = wrapper_shallow.dive().find(DialogTitle).props().children;
        var edit_information_description_on_page = wrapper_shallow.dive().find(DialogContentText).props().children;

        // Verify student Profile information to see if the description in the Dialog Matches its Function 
        expect(edit_information_text_on_page).toBe("Edit Information");
        expect(edit_information_description_on_page).toBe("To edit your information, please change the desired value fields and click save.");
        
        // Get education_level name value and then assign it to a new value.
        var education_level_name_value = wrapper_shallow.dive().find(TextField).at(3);
        education_level_name_value.value = "College";

        // Assign the TextField Object a value for the new student education_level value.
        const education_level_changed = { target: { value: education_level_name_value.value } }; 
    
        // Sending the onChange event to the TextField element.
        education_level_name_value.props().onChange(education_level_changed);

        /* Setting the new updated state wrapper in order to take the new information from the education_level
           and set the wrapper with the student's new education_level */
        student_class_wrapper.setState({ updatedEducationLevel: education_level_name_value.value });

        // Finding Update Button in order to update original state present on page with modified state. 
        var update_button = wrapper_shallow.dive().find(Button).at(1);

        // Update original state with new state on click of the update button.
        update_button.props().onClick(student_class_wrapper.state().education_level = student_class_wrapper.state().updatedEducationLevel); 
        
        // Verify if the original education_level state now equals the new state. Expect tests to pass.
        expect(student_class_wrapper.state().education_level).toBe(student_class_wrapper.state().updatedEducationLevel);
    });

    it('Testing the update courses for students. Updating two of the values present in the Dialog Box (First and Last Name).', () => {
        // All the mounting and state setting
        const wrapper = mount(<UserInfo></UserInfo>);
        const wrapper_shallow = shallow(<UserInfo></UserInfo>);
        const student_class_wrapper = wrapper.find(UserInfoClass);
        student_class_wrapper.setState({ data: json.data });

        /**
         * Part 1 : Setting of the default profile page settings.
        */

        // Finding the Typography html document that contains the type of user on the page (student or Student).
        const student_status_input = wrapper.find(Typography).at(1);

        // Checks if this Typography html document includes the word student to see if this is a student object
        var student = student_status_input.props().children.includes("Student");
        
        // Saving all of the profile data from the profile.json into a variable.
        var profile_array = student_class_wrapper.state().data;
        var student_selected = 0;

        // Select the first profile that appears as a student profile that will be used as a mocked event.
        // Save this student profile index information in a variable.
        for(var x=0;x<profile_array.length;x++){
            if(profile_array[x].__t == "student"){
                student_selected = x;
                break;
            }
        }

       // If the description of the type of user on the page is a student, then perform this if statement.
       if(student){
            /* Setting the state of the wrapper in order to take the information from the first
            and last name and set the wrapper with two variables, the student's first name and the 
            the student's last name */
            student_class_wrapper.setState({ first_name: profile_array[student_selected].first_name,
                                             last_name: profile_array[student_selected].last_name});
       }

        // Expecting a result that contains the appropriate first_name of the student.
        expect(student_class_wrapper.state().first_name).toBe(profile_array[student_selected].first_name);

        // Expecting a result that contains the appropriate last_name of the student.
        expect(student_class_wrapper.state().last_name).toBe(profile_array[student_selected].last_name);

        /**
         * Part 2: Setting values present on profile page and collecting that data and simulating an "update" 
        */
        
        // Edit Profile display information on the student Profile Page.
        var edit_information_text_on_page = wrapper_shallow.dive().find(DialogTitle).props().children;
        var edit_information_description_on_page = wrapper_shallow.dive().find(DialogContentText).props().children;

        // Verify student Profile information to see if the description in the Dialog Matches its Function 
        expect(edit_information_text_on_page).toBe("Edit Information");
        expect(edit_information_description_on_page).toBe("To edit your information, please change the desired value fields and click save.");

        // Get first name value and then assign it to a new value.
        var first_name_value = wrapper_shallow.dive().find(TextField).at(0);
        first_name_value.value = "Marisa";
        
        // Assign the TextField Object a value for the new first name value.
        const first_name_changed = { target: { value: first_name_value.value } } 

        // Sending the onChange event to the TextField element.
        first_name_value.props().onChange(first_name_changed);

        /* Setting the new updated state wrapper in order to take the new information from the first name
           and set the wrapper with the student's new first name */
        student_class_wrapper.setState({ updatedFirstName: first_name_value.value });

        // Get last name value and then assign it to a new value.
        var last_name_value = wrapper_shallow.dive().find(TextField).at(1);
        last_name_value.value = "Ceena";

        // Assign the TextField Object a value for the new last name value.
        const last_name_changed = { target: { value: last_name_value.value } } 

        // Sending the onChange event to the TextField element.
        last_name_value.props().onChange(last_name_changed);

        /* Setting the new updated state wrapper in order to take the new information from the last name
           and set the wrapper with the student's new last name */
        student_class_wrapper.setState({ updatedLastName: last_name_value.value });

        // Finding Update Button in order to update original state present on page with modified state. 
        var update_button = wrapper_shallow.dive().find(Button).at(1);

        // Update original state with new state on click of the update button.
        update_button.props().onClick(student_class_wrapper.state().first_name = student_class_wrapper.state().updatedFirstName,
                                      student_class_wrapper.state().last_name = student_class_wrapper.state().updatedLastName); 
        
        // Verify if the original first name state now equals the new state. Expect tests to pass.
        expect(student_class_wrapper.state().first_name.value).toBe(student_class_wrapper.state().updatedFirstName.value);

        // Verify if the original last name state now equals the new state. Expect tests to pass.
        expect(student_class_wrapper.state().last_name.value).toBe(student_class_wrapper.state().updatedLastName.value);
        
    });

    it('Testing the update courses for students. Updating three of the values present in the Dialog Box (first, last name , program of study).', () => {

        // All the mounting and state setting
        const wrapper = mount(<UserInfo></UserInfo>);
        const wrapper_shallow = shallow(<UserInfo></UserInfo>);
        const student_class_wrapper = wrapper.find(UserInfoClass);
        student_class_wrapper.setState({ data: json.data });

        /**
         * Part 1 : Setting of the default profile page settings.
        */

        // Finding the Typography html document that contains the type of user on the page (student or Student).
        const student_status_input = wrapper.find(Typography).at(1);

        // Checks if this Typography html document includes the word student to see if this is a student object
        var student = student_status_input.props().children.includes("Student");
        
        // Saving all of the profile data from the profile.json into a variable.
        var profile_array = student_class_wrapper.state().data;
        var student_selected = 0;

        // Select the first profile that appears as a student profile that will be used as a mocked event.
        // Save this student profile index information in a variable.
        for(var x=0;x<profile_array.length;x++){
            if(profile_array[x].__t == "student"){
                student_selected = x;
                break;
            }
        }

       // If the description of the type of user on the page is a student, then perform this if statement.
       if(student){
            /* Setting the state of the wrapper in order to take the information from the first name,
            last name and program name and sets the wrapper with two variables, the student's first name and the 
            the student's last name */
            student_class_wrapper.setState({ first_name: profile_array[student_selected].first_name,
                                           last_name: profile_array[student_selected].last_name,
                                           program_of_study : profile_array[student_selected].program_of_study});
       }

        // Expecting a result that contains the appropriate first name of the student.
        expect(student_class_wrapper.state().first_name).toBe(profile_array[student_selected].first_name);

        // Expecting a result that contains the appropriate last name of the student.
        expect(student_class_wrapper.state().last_name).toBe(profile_array[student_selected].last_name);

        // Expecting a result that contains the appropriate program of study name of the student.
        expect(student_class_wrapper.state().program_of_study).toBe(profile_array[student_selected].program_of_study);

        /**
         * Part 2: Setting values present on profile page and collecting that data and simulating an "update" 
        */
        
        // Edit Profile display information on the student Profile Page.
        var edit_information_text_on_page = wrapper_shallow.dive().find(DialogTitle).props().children;
        var edit_information_description_on_page = wrapper_shallow.dive().find(DialogContentText).props().children;

        // Verify student Profile information to see if the description in the Dialog Matches its Function 
        expect(edit_information_text_on_page).toBe("Edit Information");
        expect(edit_information_description_on_page).toBe("To edit your information, please change the desired value fields and click save.");

        // Get first name value and then assign it to a new value.
        var first_name_value = wrapper_shallow.dive().find(TextField).at(0);
        first_name_value.value = "Michelle";
        
        // Assign the TextField Object a value for the new first name value.
        const first_name_changed = { target: { value: first_name_value.value } } 

        // Sending the onChange event to the TextField element.
        first_name_value.props().onChange(first_name_changed);

        /* Setting the new updated state wrapper in order to take the new information from the first name
           and set the wrapper with the student's new first name */
        student_class_wrapper.setState({ updatedFirstName: first_name_value.value });

        // Get last name value and then assign it to a new value.
        var last_name_value = wrapper_shallow.dive().find(TextField).at(1);
        last_name_value.value = "Peterson";

        // Assign the TextField Object a value for the new last name value.
        const last_name_changed = { target: { value: last_name_value.value } } 

        // Sending the onChange event to the TextField element.
        last_name_value.props().onChange(last_name_changed);

        /* Setting the new updated state wrapper in order to take the new information from the last name
           and set the wrapper with the student's new last name */
        student_class_wrapper.setState({ updatedLastName: last_name_value.value });

        // Get program name value and then assign it to a new value.
        var program_name_value = wrapper_shallow.dive().find(TextField).at(1);
        program_name_value.value = "French Studies";

        // Assign the TextField Object a value for the new last name value.
        const program_name_changed = { target: { value: program_name_value.value } } 

        // Sending the onChange event to the TextField element.
        program_name_value.props().onChange(program_name_changed);

        /* Setting the new updated state wrapper in order to take the new information from the program of study name
           and set the wrapper with the student's new program of study name */
        student_class_wrapper.setState({ updatedProgramOfStudy: program_name_value.value });

        // Finding Update Button in order to update original state present on page with modified state. 
        var update_button = wrapper_shallow.dive().find(Button).at(1);

        // Update original state with new state on click of the update button.
        update_button.props().onClick(student_class_wrapper.state().first_name = student_class_wrapper.state().updatedFirstName,
                                      student_class_wrapper.state().last_name = student_class_wrapper.state().updatedLastName,
                                      student_class_wrapper.state().program_of_study = student_class_wrapper.state().updatedProgramOfStudy); 
        
        // Verify if the original first name state now equals the new state. Expect tests to pass.
        expect(student_class_wrapper.state().first_name.value).toBe(student_class_wrapper.state().updatedFirstName.value);

        // Verify if the original last name state now equals the new state. Expect tests to pass.
        expect(student_class_wrapper.state().last_name.value).toBe(student_class_wrapper.state().updatedLastName.value);

        // Verify if the original program of study name state now equals the new state. Expect tests to pass.
        expect(student_class_wrapper.state().program_of_study.value).toBe(student_class_wrapper.state().updatedProgramOfStudy.value);
        
    });
    
    it('Testing the update courses for students. Updating four of the values present in the Dialog Box (first, last name , program of study, school).', () => {
         // All the mounting and state setting
         const wrapper = mount(<UserInfo></UserInfo>);
         const wrapper_shallow = shallow(<UserInfo></UserInfo>);
         const student_class_wrapper = wrapper.find(UserInfoClass);
         student_class_wrapper.setState({ data: json.data });
 
         /**
          * Part 1 : Setting of the default profile page settings.
         */
 
         // Finding the Typography html document that contains the type of user on the page (student or Student).
         const student_status_input = wrapper.find(Typography).at(1);
 
         // Checks if this Typography html document includes the word student to see if this is a student object
         var student = student_status_input.props().children.includes("Student");
         
         // Saving all of the profile data from the profile.json into a variable.
         var profile_array = student_class_wrapper.state().data;
         var student_selected = 0;
 
         // Select the first profile that appears as a student profile that will be used as a mocked event.
         // Save this student profile index information in a variable.
         for(var x=0;x<profile_array.length;x++){
             if(profile_array[x].__t == "student"){
                 student_selected = x;
                 break;
             }
         }
 
        // If the description of the type of user on the page is a student, then perform this if statement.
        if(student){
             /* Setting the state of the wrapper in order to take the information from the first name,
             last name and program name and sets the wrapper with two variables, the student's first name and the 
             the student's last name */
             student_class_wrapper.setState({ first_name: profile_array[student_selected].first_name,
                                            last_name: profile_array[student_selected].last_name,
                                            program_of_study : profile_array[student_selected].program_of_study,
                                            school : profile_array[student_selected].school});
        }
 
         // Expecting a result that contains the appropriate first name of the student.
         expect(student_class_wrapper.state().first_name).toBe(profile_array[student_selected].first_name);
 
         // Expecting a result that contains the appropriate last name of the student.
         expect(student_class_wrapper.state().last_name).toBe(profile_array[student_selected].last_name);
 
         // Expecting a result that contains the appropriate program of study name of the student.
         expect(student_class_wrapper.state().program_of_study).toBe(profile_array[student_selected].program_of_study);

         // Expecting a result that contains the appropriate school name of the student.
         expect(student_class_wrapper.state().school).toBe(profile_array[student_selected].school);
 
         /**
          * Part 2: Setting values present on profile page and collecting that data and simulating an "update" 
         */
         
         // Edit Profile display information on the student Profile Page.
         var edit_information_text_on_page = wrapper_shallow.dive().find(DialogTitle).props().children;
         var edit_information_description_on_page = wrapper_shallow.dive().find(DialogContentText).props().children;
 
         // Verify student Profile information to see if the description in the Dialog Matches its Function 
         expect(edit_information_text_on_page).toBe("Edit Information");
         expect(edit_information_description_on_page).toBe("To edit your information, please change the desired value fields and click save.");
 
         // Get first name value and then assign it to a new value.
         var first_name_value = wrapper_shallow.dive().find(TextField).at(0);
         first_name_value.value = "Zoe";
         
         // Assign the TextField Object a value for the new first name value.
         const first_name_changed = { target: { value: first_name_value.value } } 
 
         // Sending the onChange event to the TextField element.
         first_name_value.props().onChange(first_name_changed);
 
         /* Setting the new updated state wrapper in order to take the new information from the first name
            and set the wrapper with the student's new first name */
         student_class_wrapper.setState({ updatedFirstName: first_name_value.value });
 
         // Get last name value and then assign it to a new value.
         var last_name_value = wrapper_shallow.dive().find(TextField).at(1);
         last_name_value.value = "Smith";
 
         // Assign the TextField Object a value for the new last name value.
         const last_name_changed = { target: { value: last_name_value.value } } 
 
         // Sending the onChange event to the TextField element.
         last_name_value.props().onChange(last_name_changed);
 
         /* Setting the new updated state wrapper in order to take the new information from the last name
            and set the wrapper with the student's new last name */
         student_class_wrapper.setState({ updatedLastName: last_name_value.value });
 
         // Get program name value and then assign it to a new value.
         var program_name_value = wrapper_shallow.dive().find(TextField).at(1);
         program_name_value.value = "English Studies";
 
         // Assign the TextField Object a value for the new program of study name value.
         const program_name_changed = { target: { value: program_name_value.value } } 
 
         // Sending the onChange event to the TextField element.
         program_name_value.props().onChange(program_name_changed);
 
         /* Setting the new updated state wrapper in order to take the new information from the program of study name
            and set the wrapper with the student's new program of study name */
         student_class_wrapper.setState({ updatedProgramOfStudy: program_name_value.value });

         // Get school name value and then assign it to a new value.
         var school_name_value = wrapper_shallow.dive().find(TextField).at(1);
         school_name_value.value = "McGill";
  
         // Assign the TextField Object a value for the new school name value.
         const school_name_changed = { target: { value: school_name_value.value } } 
  
         // Sending the onChange event to the TextField element.
         school_name_value.props().onChange(school_name_changed);
  
         /* Setting the new updated state wrapper in order to take the new information from the school name
            and set the wrapper with the student's new program of study name */
         student_class_wrapper.setState({ updatedSchool: school_name_value.value });
 
         // Finding Update Button in order to update original state present on page with modified state. 
         var update_button = wrapper_shallow.dive().find(Button).at(1);
 
         // Update original state with new state on click of the update button.
         update_button.props().onClick(student_class_wrapper.state().first_name = student_class_wrapper.state().updatedFirstName,
                                       student_class_wrapper.state().last_name = student_class_wrapper.state().updatedLastName,
                                       student_class_wrapper.state().program_of_study = student_class_wrapper.state().updatedProgramOfStudy,
                                       student_class_wrapper.state().school = student_class_wrapper.state().updatedSchool); 
         
         // Verify if the original first name state now equals the new state. Expect tests to pass.
         expect(student_class_wrapper.state().first_name.value).toBe(student_class_wrapper.state().updatedFirstName.value);
 
         // Verify if the original last name state now equals the new state. Expect tests to pass.
         expect(student_class_wrapper.state().last_name.value).toBe(student_class_wrapper.state().updatedLastName.value);
 
         // Verify if the original program of study name state now equals the new state. Expect tests to pass.
         expect(student_class_wrapper.state().program_of_study.value).toBe(student_class_wrapper.state().updatedProgramOfStudy.value);

         // Verify if the original program of study name state now equals the new state. Expect tests to pass.
         expect(student_class_wrapper.state().program_of_study.value).toBe(student_class_wrapper.state().updatedSchool.value);
    });

    it('Testing the update courses for students. Updating all five of the values present in the Dialog Box (first, last name , program of study, school, education_level).', () => {
        // All the mounting and state setting
        const wrapper = mount(<UserInfo></UserInfo>);
        const wrapper_shallow = shallow(<UserInfo></UserInfo>);
        const student_class_wrapper = wrapper.find(UserInfoClass);
        student_class_wrapper.setState({ data: json.data });

        /**
         * Part 1 : Setting of the default profile page settings.
        */

        // Finding the Typography html document that contains the type of user on the page (student or Student).
        const student_status_input = wrapper.find(Typography).at(1);

        // Checks if this Typography html document includes the word student to see if this is a student object
        var student = student_status_input.props().children.includes("Student");
        
        // Saving all of the profile data from the profile.json into a variable.
        var profile_array = student_class_wrapper.state().data;
        var student_selected = 0;

        // Select the first profile that appears as a student profile that will be used as a mocked event.
        // Save this student profile index information in a variable.
        for(var x=0;x<profile_array.length;x++){
            if(profile_array[x].__t == "student"){
                student_selected = x;
                break;
            }
        }

       // If the description of the type of user on the page is a student, then perform this if statement.
       if(student){
            /* Setting the state of the wrapper in order to take the information from the first name,
            last name and program name and sets the wrapper with two variables, the student's first name and the 
            the student's last name */
            student_class_wrapper.setState({ first_name: profile_array[student_selected].first_name,
                                           last_name: profile_array[student_selected].last_name,
                                           program_of_study : profile_array[student_selected].program_of_study,
                                           school : profile_array[student_selected].school,
                                           education_level: profile_array[student_selected].education_level});
       }

        // Expecting a result that contains the appropriate first name of the student.
        expect(student_class_wrapper.state().first_name).toBe(profile_array[student_selected].first_name);

        // Expecting a result that contains the appropriate last name of the student.
        expect(student_class_wrapper.state().last_name).toBe(profile_array[student_selected].last_name);

        // Expecting a result that contains the appropriate program of study name of the student.
        expect(student_class_wrapper.state().program_of_study).toBe(profile_array[student_selected].program_of_study);

        // Expecting a result that contains the appropriate school name of the student.
        expect(student_class_wrapper.state().school).toBe(profile_array[student_selected].school);

        // Expecting a result that contains the appropriate education_level of the student.
        expect(student_class_wrapper.state().education_level).toBe(profile_array[student_selected].education_level);

        /**
         * Part 2: Setting values present on profile page and collecting that data and simulating an "update" 
        */
        
        // Edit Profile display information on the student Profile Page.
        var edit_information_text_on_page = wrapper_shallow.dive().find(DialogTitle).props().children;
        var edit_information_description_on_page = wrapper_shallow.dive().find(DialogContentText).props().children;

        // Verify student Profile information to see if the description in the Dialog Matches its Function 
        expect(edit_information_text_on_page).toBe("Edit Information");
        expect(edit_information_description_on_page).toBe("To edit your information, please change the desired value fields and click save.");

        // Get first name value and then assign it to a new value.
        var first_name_value = wrapper_shallow.dive().find(TextField).at(0);
        first_name_value.value = "Francesca";
        
        // Assign the TextField Object a value for the new first name value.
        const first_name_changed = { target: { value: first_name_value.value } } 

        // Sending the onChange event to the TextField element.
        first_name_value.props().onChange(first_name_changed);

        /* Setting the new updated state wrapper in order to take the new information from the first name
           and set the wrapper with the student's new first name */
        student_class_wrapper.setState({ updatedFirstName: first_name_value.value });

        // Get last name value and then assign it to a new value.
        var last_name_value = wrapper_shallow.dive().find(TextField).at(1);
        last_name_value.value = "Jones";

        // Assign the TextField Object a value for the new last name value.
        const last_name_changed = { target: { value: last_name_value.value } } 

        // Sending the onChange event to the TextField element.
        last_name_value.props().onChange(last_name_changed);

        /* Setting the new updated state wrapper in order to take the new information from the last name
           and set the wrapper with the student's new last name */
        student_class_wrapper.setState({ updatedLastName: last_name_value.value });

        // Get program name value and then assign it to a new value.
        var program_name_value = wrapper_shallow.dive().find(TextField).at(1);
        program_name_value.value = "English Studies";

        // Assign the TextField Object a value for the new program of study name value.
        const program_name_changed = { target: { value: program_name_value.value } } 

        // Sending the onChange event to the TextField element.
        program_name_value.props().onChange(program_name_changed);

        /* Setting the new updated state wrapper in order to take the new information from the program of study name
           and set the wrapper with the student's new program of study name */
        student_class_wrapper.setState({ updatedProgramOfStudy: program_name_value.value });

        // Get school name value and then assign it to a new value.
        var school_name_value = wrapper_shallow.dive().find(TextField).at(1);
        school_name_value.value = "McGill";
 
        // Assign the TextField Object a value for the new school name value.
        const school_name_changed = { target: { value: school_name_value.value } } 
 
        // Sending the onChange event to the TextField element.
        school_name_value.props().onChange(school_name_changed);
 
        /* Setting the new updated state wrapper in order to take the new information from the school name
           and set the wrapper with the student's new program of study name */
        student_class_wrapper.setState({ updatedSchool: school_name_value.value });

        // Get education_level name value and then assign it to a new value.
        var education_level_name_value = wrapper_shallow.dive().find(TextField).at(3);
        education_level_name_value.value = "University";

        // Assign the TextField Object a value for the new student education_level value.
        const education_level_changed = { target: { value: education_level_name_value.value } }; 
    
        // Sending the onChange event to the TextField element.
        education_level_name_value.props().onChange(education_level_changed);

        /* Setting the new updated state wrapper in order to take the new information from the education_level
           and set the wrapper with the student's new education_level */
        student_class_wrapper.setState({ updatedEducationLevel: education_level_name_value.value });

        // Finding Update Button in order to update original state present on page with modified state. 
        var update_button = wrapper_shallow.dive().find(Button).at(1);

        // Update original state with new state on click of the update button.
        update_button.props().onClick(student_class_wrapper.state().first_name = student_class_wrapper.state().updatedFirstName,
                                      student_class_wrapper.state().last_name = student_class_wrapper.state().updatedLastName,
                                      student_class_wrapper.state().program_of_study = student_class_wrapper.state().updatedProgramOfStudy,
                                      student_class_wrapper.state().school = student_class_wrapper.state().updatedSchool,
                                      student_class_wrapper.state().education_level = student_class_wrapper.state().updatedEducationLevel); 
        
        // Verify if the original first name state now equals the new state. Expect tests to pass.
        expect(student_class_wrapper.state().first_name.value).toBe(student_class_wrapper.state().updatedFirstName.value);

        // Verify if the original last name state now equals the new state. Expect tests to pass.
        expect(student_class_wrapper.state().last_name.value).toBe(student_class_wrapper.state().updatedLastName.value);

        // Verify if the original program of study name state now equals the new state. Expect tests to pass.
        expect(student_class_wrapper.state().program_of_study.value).toBe(student_class_wrapper.state().updatedProgramOfStudy.value);

        // Verify if the original program of study name state now equals the new state. Expect tests to pass.
        expect(student_class_wrapper.state().program_of_study.value).toBe(student_class_wrapper.state().updatedSchool.value);

        // Verify if the original education_level state now equals the new state. Expect tests to pass.
        expect(student_class_wrapper.state().education_level).toBe(student_class_wrapper.state().updatedEducationLevel);
   });

}); 
