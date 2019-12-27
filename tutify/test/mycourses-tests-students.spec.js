import React from "react";
import MyCourses, { MyCourses as MyCoursesClass } from "../src/components/ProfilePage/MyCourses";
import ViewCourse, { ViewCourse as ViewCourseClass } from "../src/components/StudentCourseView/ViewCourse";
import ContactTutor from "../src/components/StudentCourseView/ContactTutor";
import Documents from "../src/components/StudentCourseView/Documents";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// importing the json object with the profile information
var json = require("./testDb/profiles.json");

configure({ adapter: new Adapter() });

describe('The Students Courses Page', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Testing the Student Course Pages. Checking if all the required elements are present on this page', () => {
        // All the mounting and state setting
        const wrapper = mount(<MyCourses></MyCourses>);
        const wrapper_shallow = shallow(<MyCourses></MyCourses>);
        const student_class_wrapper = wrapper.find(MyCoursesClass);
        student_class_wrapper.setState({ data: json.data });

        /**
         * Checking the two student courses page (general and specific course page) and see if all elements are present 
        */

        // Finding the Typography component that contains the Main Title Header Present on the Page.
        const course_title = wrapper_shallow.dive().find(Typography).at(0);
        // Make sure the header name for the student page has the value My Enrolled Courses
        expect(course_title.props().children).toBe("My Enrolled Courses");

        // Go to next page which contains information about a particular course the student is registered in.
        const wrapper_shallow_specific_course = shallow(<ViewCourse></ViewCourse>);

        // Finding the Grid component containing the Different classes the student is registered for.
        const test = wrapper_shallow_specific_course.dive().find(Grid).at(0);
        // Seeing if the Grid components Exists (import grid)
        expect(test.exists()).toBeTruthy();

        // Finding the Typography component that contains the title for the Contact Information component.
        const contact_tutor_title = wrapper_shallow_specific_course.dive().find(Typography).at(0);
        // Make sure the specific student course page contains tutor Contact Info header on it.
        expect(contact_tutor_title.props().children).toBe("Contact Info");

        // Finding the ContactTutor component that contains the information for the ContactTutor component.
        const contact_tutor_component = wrapper_shallow_specific_course.dive().find(ContactTutor).at(0);
        // Make sure the specific student course page contains the component <ContactTutor />
        expect(contact_tutor_component.exists()).toBeTruthy();

        // Finding the Typography component that contains the title for the Course Documents component.
        const course_title2 = wrapper_shallow_specific_course.dive().find(Typography).at(1);
        // Make sure the specific student course page contains tutor Course Documents header on it.
        expect(course_title2.props().children).toBe("Course Documents");
        // Finding the Documents component that contains the information for the Documents component.
        const document_component = wrapper_shallow_specific_course.dive().find(Documents).at(0);
        // Make sure the specific student course page contains the component <Documents/>
        expect(document_component.exists()).toBeTruthy();
    
    });
}); 