import React from "react";
import MyCourses, { MyCourses as MyCoursesClass } from "../src/components/CourseView/MyCourses";
//import TutorCourseView, { TutorCourseView as TutorCourseViewClass } from "../src/components/TutorCourseView/TutorCourseView";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
/*import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';*/

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
        const wrapper = mount(<MyCourses courses = {mockedTutor}></MyCourses>);
        const wrapper_shallow = shallow(<MyCourses courses = {mockedTutor}></MyCourses>);
        const student_class_wrapper = wrapper.find(MyCoursesClass);
        student_class_wrapper.setState({ data: json.data });
    
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
        const wrapper = mount(<MyCourses courses = {mockedTutor}></MyCourses>);
        const wrapper_shallow = shallow(<MyCourses courses = {mockedTutor}></MyCourses>);
        const student_class_wrapper = wrapper.find(MyCoursesClass);
        student_class_wrapper.setState({ data: json.data });
        
    });
}); 