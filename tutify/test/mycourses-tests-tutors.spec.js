import React from "react";
import TutorCourses, { TutorCourses as TutorCoursesClass } from "../src/components/TutorProfile/TutorCourses";
import TutorCourseView, { TutorCourseView as TutorCourseViewClass } from "../src/components/TutorCourseView/TutorCourseView";
import CourseStudents from "../src/components/TutorCourseView/CourseStudents";
import UploadDoc from "../src/components/TutorCourseView/UploadDoc";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';

// importing the json object with the profile information
var json = require("./testDb/profiles.json");

configure({ adapter: new Adapter() });

describe('The Tutors Courses Page', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Testing the Tutor Course Pages. Checking if all the required elements are present on this page', () => {
        // All the mounting and state setting
        const wrapper = mount(<TutorCourses></TutorCourses>);
        const wrapper_shallow = shallow(<TutorCourses></TutorCourses>);
        const student_class_wrapper = wrapper.find(TutorCoursesClass);
        student_class_wrapper.setState({ data: json.data });

        /**
         * Checking the two tutor courses page (general and specific course page) and see if all elements are present 
        */

         // Finding the Typography component that contains the Main Title Header Present on the Page.
        const course_title = wrapper_shallow.dive().find(Typography).at(0);
        // Make sure the header name for the student page has the value Courses Currently Taught
        expect(course_title.props().children).toBe("Courses Currently Taught");

        // Go to next page which contains information about a particular course the student is registered in.
        const tutor_course_view_wrapper = shallow(<TutorCourseView></TutorCourseView>);

        // Finding the Typography component that contains the title for the Contact Information component.
        const students_title = tutor_course_view_wrapper.dive().find(Typography).at(0);
        // Make sure the specific tutor course page contains the header Students as it contains a table with students.
        expect(students_title.props().children).toBe("Students");

        // Finding the CourseStudents component that contains the information for the CourseStudents component.
        const course_students_tutor_component = tutor_course_view_wrapper.dive().find(CourseStudents).at(0);
        // Make sure the specific student course page contains the component <CourseStudents />
        expect(course_students_tutor_component.exists()).toBeTruthy();

        // Finding the Typography component that contains the information for the Typography component.
        const documents_uploaded = tutor_course_view_wrapper.dive().find(Typography).at(1);
        // Make sure the specific student course page contains tutor Documents Uploaded header on it.
        expect(documents_uploaded.props().children).toBe("Documents Uploaded");

        // Finding the UploadDoc component that contains the information for the UploadDoc component.
        const document_component = tutor_course_view_wrapper.dive().find(UploadDoc).at(0);
        // Make sure the specific student course page contains the component <UploadDoc/>
        expect(document_component.exists()).toBeTruthy();
    
    });
}); 
