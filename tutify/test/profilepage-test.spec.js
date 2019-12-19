import React from "react";
import InputBase from '@material-ui/core/InputBase';
import UserInfo, { UserInfo as UserInfoClass } from "./../src/components/profilePage/UserInfo";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// importing the json object with the profile information
var json = require("./testDb/profiles.json");

configure({ adapter: new Adapter() });

// Get a mocked student object and set all her information on the page. 
describe('The Profile Page updating Profile Feature', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Setting the default values on Profile Page for Students and updating these values too', () => {
        // All the mounting and state setting for UserInfo Class
        const wrapper = mount(<UserInfo></UserInfo>);
        const shallowwrapper = wrapper.find(UserInfoClass);
        shallowwrapper.setState({ data: json.data });
        
        // Finding the Typography html document that contains whether the object is a student or not.
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
        console.log(student_selected);

        // The Student profile that is mocked. This is taken from the profiles.json file
        const mockedEvent = profile_array[student_selected];
        console.log(mockedEvent.email);
    
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
            // Finding the Typography HTML document that contains the first and last name of the student.
            const name_input = wrapper.find(Box).at(0);
            console.log(name_input.props().children);
            // Setting the full name component on the page with the full name of the student (setting initial variables)
            name_input.props().children = profile_array[student_selected].first_name + " " 
                                        + profile_array[student_selected].last_name;
            console.log(name_input.props().children);
        }
        
        // Expecting a result that contains the appropriate email of the student.
        expect(shallowwrapper.state().student_email).toBe("Email : "+profile_array[student_selected].email);
        
    });

}); 