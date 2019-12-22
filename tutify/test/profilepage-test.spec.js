import React from "react";
import InputBase from '@material-ui/core/InputBase';
import UserInfo, { UserInfo as UserInfoClass } from "./../src/components/profilePage/UserInfo";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { shallow } from 'enzyme';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// importing the json object with the profile information
var json = require("./testDb/profiles.json");

configure({ adapter: new Adapter() });

// Get a mocked student object and set all her information on the page. 
describe('The Profile Page updating Profile Feature', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Testing the update profile function for Students', () => {

        /**
         * Setting of the default profile page settings.
         */

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

            // Finding the Box HTML document that contains the first and last name of the student.
            const name_input = wrapper.find(Box).at(0);
            console.log(name_input.props().children);
            // Setting the full name component on the page with the full name of the student (setting initial variables)
            name_input.props().children = profile_array[student_selected].first_name + " " 
                                        + profile_array[student_selected].last_name;
            console.log(name_input.props().children);

            // Finding the Typography HTML document that contains the program of study of the student.
            const program_input = wrapper.find(Typography).at(3);
            console.log(program_input.props().children);
            // Setting the full name component on the page with the full name of the student (setting initial variables)
            program_input.props().children = program_input.props().children[0] + profile_array[student_selected].program_of_study;
            console.log(program_input.props().children);

            // Finding the Typography HTML document that contains the school of the student.
            const school_input = wrapper.find(Typography).at(4);
            console.log(school_input.props().children);
            // Setting the full name component on the page with the full name of the student (setting initial variables)
            school_input.props().children = school_input.props().children[0] + profile_array[student_selected].school;
            console.log(school_input.props().children);

            // Finding the Typography HTML document that contains the education level of the student.
            const education_input = wrapper.find(Typography).at(5);
            console.log(education_input.props().children);
            // Setting the full name component on the page with the full name of the student (setting initial variables)
            education_input.props().children = education_input.props().children[0] + profile_array[student_selected].education_level;
            console.log(education_input.props().children);
        }
        
        // Expecting a result that contains the appropriate email of the student.
        expect(shallowwrapper.state().student_email).toBe("Email : "+profile_array[student_selected].email);
        // Expecting a result that contains the appropriate email of the student.
        expect(shallowwrapper.state().student_email).toBe("Email : "+profile_array[student_selected].email);
        // Expecting a result that contains the appropriate email of the student.
        expect(shallowwrapper.state().student_email).toBe("Email : "+profile_array[student_selected].email);
        // Expecting a result that contains the appropriate email of the student.
        expect(shallowwrapper.state().student_email).toBe("Email : "+profile_array[student_selected].email);
        // Expecting a result that contains the appropriate email of the student.
        expect(shallowwrapper.state().student_email).toBe("Email : "+profile_array[student_selected].email);
        // Expecting a result that contains the appropriate email of the student.
        expect(shallowwrapper.state().student_email).toBe("Email : "+profile_array[student_selected].email);


        /**
         * Setting values present on profile page and collecting that data and simulating an "update" 
         */

        const wrapper2 = mount(<UserInfo></UserInfo>);
        //const wrapper3 = wrapper.find(DialogContent).props().children;

        //console.log(wrapper3);
        console.log(wrapper2.find(Dialog).props().children[0].props.children);
        console.log(wrapper2.find(Dialog).props().children[1].props.children[0].props.children);
        console.log(wrapper2.find(Dialog).props().children[1].props.children[1].props.id);
        // set value of bottom
        console.log(wrapper2.find(Dialog).props().children[1].props.children[1].props.value);
        //console.log(document.getElementById('firstName').value);
        document.getElementById(wrapper2.find(Dialog).props().children[1].props.children[1].props.id).setAttribute('value', 'test');
        console.log(document.getElementById(wrapper2.find(Dialog).props().children[1].props.children[1].props.id).value);
        
        const input1 = wrapper2.find(TextField).at(0);
        console.log(input1.props());
        const first_name_update = wrapper.find(Dialog).at(0);
        console.log(first_name_update.props());
        console.log(document.getElementById('firstName'));
        //document.getElementById('firstName').setAttribute('value', 'testtt');
        //console.log(document.getElementById('firstName').value);
        
    });


}); 