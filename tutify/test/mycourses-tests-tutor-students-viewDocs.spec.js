import React from "react";
import MyCourses, { MyCourses as MyCoursesClass } from "../src/components/CourseView/MyCourses";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";

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

        // Setting parameter in url file to be undefined as this is only a simple view list of students.
        // This variable is for tutors viewing the course list.
        const match = { params: { file: undefined } }
        const wrapper_shallow = shallow(<MyCourses courses = {mockedStudent}  match={match}></MyCourses>);
        const wrapper = mount(<MyCourses courses = {mockedStudent} match={match}></MyCourses>);
        const student_class_wrapper = wrapper.find(MyCoursesClass);
        student_class_wrapper.setState({ data: json.data });
        student_class_wrapper.setState({ courses: mockedStudent });

        /**
         * General Student Course Page
        */
        const cardInfo = wrapper.find(CardContent).at(0);
        expect(cardInfo.props().children[0].props.children[0]).toBe("COMP 472");
        expect(cardInfo.props().children[1].props.children).toBe("Automated reasoning. Search and heuristic search. Game‑playing.");
        const buttonInfo = wrapper.find(Button).at(0);
        expect(buttonInfo.props().children).toBe("View Documents");
    
    });
}); 