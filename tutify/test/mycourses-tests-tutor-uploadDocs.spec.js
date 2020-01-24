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
        const match = { params: { searchTerm: "b0c16d9323dbf1438f595fc94ef219d5.jpg" } }
        const wrapper = mount(<MyCourses courses = {mockedTutor}></MyCourses>);
        const wrapper_shallow = shallow(<MyCourses courses = {mockedTutor}></MyCourses>);
        const student_class_wrapper = wrapper.find(MyCoursesClass);
        student_class_wrapper.setState({ data: json.data });


        /**
         * General Course Page
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
        expect(buttonInfo.props().children).toBe("Upload Document");
    
    });

}); 