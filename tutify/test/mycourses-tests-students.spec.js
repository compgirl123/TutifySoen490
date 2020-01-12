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
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';

// importing the json object with the profile information
var json = require("./testDb/profiles.json");

configure({ adapter: new Adapter() });

describe('The Students Courses Page', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Testing the general student courses for Students. Checking if all of the required information for student course page exists on the page.', () => {
        // All the mounting and state setting
        const mockedStudent =  [
            {
              _id: {
                "$oid": "5e02882c641f2eac8f2837b0"
              },
              course: {
                name: "COMP 472",
                description : "Automated reasoning. Search and heuristic search. Game‑playing.",
              },
              tutor: {
                first_name: "Mohammed",
                last_name : "Alawami"
              }
            }
          ]
        const wrapper_shallow = shallow(<MyCourses courses = {mockedStudent}></MyCourses>);
        const wrapper = mount(<MyCourses courses = {mockedStudent}></MyCourses>);
        const student_class_wrapper = wrapper.find(MyCoursesClass);
        student_class_wrapper.setState({ data: json.data });
        student_class_wrapper.setState({ courses: mockedStudent });

        /**
         * General Student Course Page
        */
        
        // Finding the Typography component that contains the Main Title Header Present on the Page.
        const course_title = wrapper_shallow.dive().find(Typography).at(0);
        // Make sure the header name for the student page has the value My Enrolled Courses
        expect(course_title.props().children).toBe("My Enrolled Courses");

        // Getting the Card that contains information about the course.
        const cardInfo = wrapper.find(CardContent).at(0);

        // Making sure that the Course name matches the mock student's.
        expect(cardInfo.props().children[0].props.children).toBe("COMP 472");

        // Making sure that the Tutor's full name matches the mock student's.
        expect(cardInfo.props().children[1].props.children).toBe("Mohammed Alawami");

        // Making sure that the Course Description matches the mock student's.
        expect(cardInfo.props().children[2].props.children).toBe("Automated reasoning. Search and heuristic search. Game‑playing.");

        // Getting the Card that contains information about the course.
        const buttonInfo = wrapper.find(Button).at(0);

        // Making sure that the Button matches the mock student's.
        expect(buttonInfo.props().children).toBe("View Course");
    
    });

    it('Testing the specific student courses for Students. Checking if all of the required information for specfic student course page exists on the page.', () => {
        // All the mounting and state setting
        
        const mockedStudent =  [
            {
              _id: {
                "$oid": "5e02882c641f2eac8f2837b0"
              },
              course: {
                name: "COMP 472",
                description : "Automated reasoning. Search and heuristic search. Game‑playing.",
              },
              tutor: {
                first_name: "Mohammed",
                last_name : "Alawami"
              }
            }
          ]
        // Go to next page which contains information about a particular course the student is registered in.
        const wrapper_shallow_specific_course = shallow(<ViewCourse courses = {mockedStudent}></ViewCourse>);
        const wrapper_specific_course = mount(<ViewCourse courses = {mockedStudent}></ViewCourse>);
        const student_class_wrapper = wrapper_specific_course.find(ViewCourseClass);
        student_class_wrapper.setState({ data: json.data });
        student_class_wrapper.setState({ courses: mockedStudent });

        /**
         * Specific Course Page
        */
        
        // Finding the Grid component containing the Different classes student is registered for.
        const test = wrapper_shallow_specific_course.dive().find(Grid).at(0);
        // Seeing if the Grid components Exists (import grid)
        expect(test.exists()).toBeTruthy();

        // Finding the Typography component that contains the title for the Contact Information component.
        //const contact_tutor_title = wrapper_shallow_specific_course.dive().find(Typography).at(0);
        // Make sure the specific student course page contains tutor Contact Info header on it.
        //expect(contact_tutor_title.props().children).toBe("Contact Info");

        // Finding the ContactTutor component that contains the information for the ContactTutor component.
        //const contact_tutor_component = wrapper_shallow_specific_course.dive().find(ContactTutor).at(0);
        // Make sure the specific student course page contains the component <ContactTutor />
        //expect(contact_tutor_component.exists()).toBeTruthy();

        // Finding the Typography component that contains the title for the Course Documents component.
        const course_title2 = wrapper_shallow_specific_course.dive().find(Typography).at(1);
        // Make sure the specific student course page contains tutor Course Documents header on it.
        expect(course_title2.props().children).toBe("Course Documents");
        // Finding the Documents component that contains the information for the Documents component.
        //const document_component = wrapper_shallow_specific_course.dive().find(Documents).at(0);
        // Make sure the specific student course page contains the component <Documents/>
        //expect(document_component.exists()).toBeTruthy();

        // Getting the Card that contains information about the course.
        const courseName = wrapper_specific_course.find(Container).at(0);

        // Making sure that the Course name matches the mock student's.
        //expect(courseName.props().children[0].props.children.props.children[0][0].props.children).toBe("COMP 472");
    
    });
}); 