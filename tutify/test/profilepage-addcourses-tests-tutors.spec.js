import React from "react";
import TutorCoursesInfo, { TutorCoursesInfo as TutorCoursesInfoClass } from "../src/components/ProfilePage/Tutor/TutorCoursesInfo";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TableBody from '@material-ui/core/TableBody';
import CourseSelection, { CourseSelection as CourseSelectionClass } from "../src/components/ProfilePage/Tutor/CourseSelection";
import Select from "@material-ui/core/Select";

// importing the json object with the profile information
var json = require("./testDb/profiles.json");

configure({ adapter: new Adapter() });

describe('The Profile Page adding Courses Feature for Tutors.', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Testing the add courses for Tutors feature. Adding only one course.', (done) => {
        // All the mounting and state setting

        // Passing in a mock of a specific Tutor's subjects for profile page.
        const tutor_subjects_mock = 
        {
            "_id": {
                "$oid": "5e059af3ad6a2d8862c23244"
            },
            first_name: "Pooja",
            last_name: "Patel",
            school: "Elementary School",
            program_of_study: "French",
            subjects: [
            "French",
            "English"
            ]
        }
        
        const wrapper = mount(<TutorCoursesInfo subjects ={tutor_subjects_mock.subjects}></TutorCoursesInfo>);
        const wrapper_shallow = shallow(<TutorCoursesInfo subjects ={tutor_subjects_mock.subjects}></TutorCoursesInfo>);
        const tutor_class_wrapper = wrapper.find(TutorCoursesInfoClass);
        tutor_class_wrapper.setState({ data: json.data });
        tutor_class_wrapper.setState({ subjects: tutor_subjects_mock.subjects });
        tutor_class_wrapper.setState({ _id: tutor_subjects_mock._id });

        const tutor_courses_taught = wrapper.find(Box).at(0);
        expect(tutor_courses_taught.props().children).toBe("My Subjects");

        const tutor_courses_taught_table = wrapper.find(TableBody).at(0)
        expect(tutor_courses_taught_table.props().children[8][0].props.children[1].props.children).toBe("French");
        expect(tutor_courses_taught_table.props().children[8][1].props.children[1].props.children).toBe("English");

        const course_selection_component = wrapper.find(CourseSelection).at(0);
        expect(course_selection_component.exists()).toBeTruthy();

        const wrapper_course_selection = mount(<CourseSelection></CourseSelection>);
        const wrapper_shallow_course_selection = shallow(<CourseSelection></CourseSelection>);
       
        const course_selection_wrapper = wrapper_course_selection.find(CourseSelectionClass);
        course_selection_wrapper.setState({ subjects: tutor_subjects_mock.subjects });
        expect(course_selection_wrapper.state().subjects.length).toBe(2);
        
        const course_selection_select_component = wrapper.find(Select).at(0);
        course_selection_wrapper.setState({ selected: course_selection_select_component.props().children[0].props.value });

        const subjects_array = course_selection_wrapper.state().subjects;
        subjects_array.push(course_selection_select_component.props().children[0].props.value);

        course_selection_wrapper.setState({ subjects: subjects_array });
        course_selection_wrapper.setState({ courses: course_selection_wrapper.state.selected });

        const edit_courses_save = wrapper.find(Button).at(1);
        (tutor_class_wrapper.state().subjects).push('Italian');
        course_selection_wrapper.setState({ subjects: tutor_class_wrapper.state().subjects });
        
        // set a timeout since this is an async function.
        setTimeout( function(){
            edit_courses_save.props().onClick(course_selection_wrapper.setState({ subjects: tutor_class_wrapper.state().subjects})); 
        }, 1);

        setImmediate( () => { 
            expect(course_selection_wrapper.state().subjects);
            expect(course_selection_wrapper.state().subjects.length).toBe(4);
            done();
        })
    });

}); 
