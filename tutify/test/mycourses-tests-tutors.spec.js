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
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

// importing the json object with the profile information
var json = require("./testDb/profiles.json");

configure({ adapter: new Adapter() });

describe('The Tutors Courses Page', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Testing the general tutor courses page. Checking if all of the required information for tutor course page exists on the page.', () => {
        // All the mounting and state setting
        const mockedTutor =  [
        {
              students: [
              {
                first_name: "Pierre Arthur",
                last_name: "Watine",
                program_of_study: "Soen",
                school: "concordia",
                education_level : "university"
              }
              ],
              course: {
                name: "COMP 472",
                description : "Automated reasoning. Search and heuristic search. Game‑playing."
              }
            }
        ]
        const wrapper = mount(<TutorCourses courses = {mockedTutor}></TutorCourses>);
        const wrapper_shallow = shallow(<TutorCourses courses = {mockedTutor}></TutorCourses>);
        const student_class_wrapper = wrapper.find(TutorCoursesClass);
        student_class_wrapper.setState({ data: json.data });
        student_class_wrapper.setState({ courses: mockedTutor });

        /**
         * General Tutor Course Page
        */

        // Finding the Typography component that contains the Main Title Header Present on the Page.
        const course_title = wrapper_shallow.dive().find(Typography).at(0);
        // Make sure the header name for the student page has the value Courses Currently Taught
        expect(course_title.props().children).toBe("Courses Currently Taught");

        // Getting the Card that contains information about the course.
        const cardInfo = wrapper.find(CardContent).at(0);

        // Making sure that the Course name matches the mock tutor's.
        expect(cardInfo.props().children[0].props.children).toBe("COMP 472");

        // Making sure that the Course Description matches the mock tutor's.
        expect(cardInfo.props().children[1].props.children).toBe("Automated reasoning. Search and heuristic search. Game‑playing.");

        // Getting the Card that contains action information about the next page.
        const cardActions = wrapper.find(CardActions).at(0);
  
        // Making sure that the First Action Present on the Page Matches what is expected to be shown.
        expect(cardActions.props().children[0].props.children).toBe("Upload Doc");

        // Making sure that the Second Action Present on the Page Matches what is expected to be shown.
        expect(cardActions.props().children[1].props.children).toBe("Upload Document");

        // Go to next page which contains information about a particular course the student is registered in.
        const tutor_course_view_shallowrapper = shallow(<TutorCourseView courses = {mockedTutor}></TutorCourseView>);
        const tutor_course_view_wrapper = mount(<TutorCourseView courses = {mockedTutor}></TutorCourseView>);

        // Finding the Typography component that contains the title for the Contact Information component.
        const students_title = tutor_course_view_shallowrapper.dive().find(Typography).at(0);
        // Make sure the specific tutor course page contains the header Students as it contains a table with students.
        expect(students_title.props().children).toBe("Students");

        // Finding the CourseStudents component that contains the information for the CourseStudents component.
        const course_students_tutor_component = tutor_course_view_shallowrapper.dive().find(CourseStudents).at(0);
        // Make sure the specific student course page contains the component <CourseStudents />
        expect(course_students_tutor_component.exists()).toBeTruthy();

        // Finding the Typography component that contains the information for the Typography component.
        const documents_uploaded = tutor_course_view_shallowrapper.dive().find(Typography).at(1);
        // Make sure the specific student course page contains tutor Documents Uploaded header on it.
        expect(documents_uploaded.props().children).toBe("Documents Uploaded");

        // Finding the UploadDoc component that contains the information for the UploadDoc component.
        const document_component = tutor_course_view_shallowrapper.dive().find(UploadDoc).at(0);
        // Make sure the specific student course page contains the component <UploadDoc/>
        expect(document_component.exists()).toBeTruthy();

        
    
    });

    it('Testing the specific tutor courses for Students. Checking if all of the required information for specfic student course page exists on the page.', () => {
        // All the mounting and state setting
        const mockedTutor =  [
        {
              students: [
              {
                first_name: "Pierre Arthur",
                last_name: "Watine",
                program_of_study: "Soen",
                school: "concordia",
                education_level : "university"
              }
              ],
              course: {
                name: "COMP 472",
                description : "Automated reasoning. Search and heuristic search. Game‑playing."
              }
            }
        ]
        const wrapper = mount(<TutorCourses courses = {mockedTutor}></TutorCourses>);
        const wrapper_shallow = shallow(<TutorCourses courses = {mockedTutor}></TutorCourses>);
        const student_class_wrapper = wrapper.find(TutorCoursesClass);
        student_class_wrapper.setState({ data: json.data });
        student_class_wrapper.setState({ courses: mockedTutor });

        /**
         * Specific Course Page
        */

        // Go to next page which contains information about a particular course the student is registered in.
        const tutor_course_view_shallowrapper = shallow(<TutorCourseView courses = {mockedTutor}></TutorCourseView>);
        const tutor_course_view_wrapper = mount(<TutorCourseView courses = {mockedTutor}></TutorCourseView>);

        // Finding the Typography component that contains the title for the Contact Information component.
        const students_title = tutor_course_view_shallowrapper.dive().find(Typography).at(0);
        // Make sure the specific tutor course page contains the header Students as it contains a table with students.
        expect(students_title.props().children).toBe("Students");

        // Finding the CourseStudents component that contains the information for the CourseStudents component.
        const course_students_tutor_component = tutor_course_view_shallowrapper.dive().find(CourseStudents).at(0);
        // Make sure the specific student course page contains the component <CourseStudents />
        expect(course_students_tutor_component.exists()).toBeTruthy();

        // Finding the Typography component that contains the information for the Typography component.
        const documents_uploaded = tutor_course_view_shallowrapper.dive().find(Typography).at(1);
        // Make sure the specific student course page contains tutor Documents Uploaded header on it.
        expect(documents_uploaded.props().children).toBe("Documents Uploaded");

        // Finding the UploadDoc component that contains the information for the UploadDoc component.
        const document_component = tutor_course_view_shallowrapper.dive().find(UploadDoc).at(0);
        // Make sure the specific student course page contains the component <UploadDoc/>
        expect(document_component.exists()).toBeTruthy();

        
    
    });
}); 
