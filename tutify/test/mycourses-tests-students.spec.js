import React from "react";
import MyCourses, { MyCourses as MyCoursesClass } from "../src/components/CourseView/MyCourses";
import ViewCourse, { ViewCourse as ViewCourseClass } from "../src/components/CourseView/ViewCourse";
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
          // return to
        const match = { params: { searchTerm: 'foo' } }
        const wrapper_shallow = shallow(<MyCourses courses = {mockedStudent} match={match}></MyCourses>);
        const wrapper = mount(<MyCourses courses = {mockedStudent} match={match}></MyCourses>);
        const student_class_wrapper = wrapper.find(MyCoursesClass);
        student_class_wrapper.setState({ data: json.data });
        student_class_wrapper.setState({ courses: mockedStudent });

        /**
         * General Student Course Page
        */
        
        // Finding the Typography component that contains the Main Title Header Present on the Page.
        const course_title = wrapper_shallow.dive().find(Typography).at(0);
        // Make sure the header name for the student page has the value My Enrolled Courses
        expect(course_title.props().children).toBe("My Courses");

        // Getting the Card that contains information about the course.
        const cardInfo = wrapper.find(CardContent).at(0);

        // Making sure that the Course name matches the mock student's.
        expect(cardInfo.props().children[0].props.children).toBe("COMP 472");

        // Making sure that the Course Description matches the mock student's.
        expect(cardInfo.props().children[1].props.children).toBe("Automated reasoning. Search and heuristic search. Game‑playing.");

        // Getting the Card that contains information about the course.
        const buttonInfo = wrapper.find(Button).at(0);

        // Making sure that the Button matches the mock student's.
        expect(buttonInfo.props().children).toBe("View Documents");
    
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

        // Finding the Typography component that contains the title for the Course Documents component.
        const course_title2 = wrapper_shallow_specific_course.dive().find(Typography).at(1);
        // Make sure the specific student course page contains tutor Course Documents header on it.
        expect(course_title2.props().children).toBe("Course Documents");

        // Getting the Card that contains information about the course.
        const courseName = wrapper_specific_course.find(Container).at(0);
    
    });
}); 