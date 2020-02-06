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

        // Finding the Box html component document on the page.
        const tutor_courses_taught = wrapper.find(Box).at(0);
        // Expecting the Main Title on Tutor Profile Page for the Courses Taught to be My Subjects
        expect(tutor_courses_taught.props().children).toBe("My Subjects");

        // Finding the Table containing all of the elements for subjects taught by tutors
        const tutor_courses_taught_table = wrapper.find(TableBody).at(0)
        // Expecting the 1st subject present on the Tutor Profile to be displayed
        expect(tutor_courses_taught_table.props().children[8][0].props.children[1].props.children).toBe("French");
        // Expecting the 2nd subject present on the Tutor Profile to be displayed
        expect(tutor_courses_taught_table.props().children[8][1].props.children[1].props.children).toBe("English");

        // Finding the CourseSelection html component document on the page. 
        // This contains the dropdown for the selection of additional courses available for tutors to teach.
        const course_selection_component = wrapper.find(CourseSelection).at(0);
        // Make sure the Tutor Courses Info Page contains the component <CourseSelection />
        expect(course_selection_component.exists()).toBeTruthy();

        // Going into CourseSelection Class in order to test the dropdown menu
        const wrapper_course_selection = mount(<CourseSelection></CourseSelection>);
        const wrapper_shallow_course_selection = shallow(<CourseSelection></CourseSelection>);
        const course_selection_wrapper = wrapper_course_selection.find(CourseSelectionClass);

        // Setting the state of subjects array.
        course_selection_wrapper.setState({ subjects: tutor_subjects_mock.subjects });
        // Expecting the number of subjects to equal to 2 before adding a new subject to tutor.
        expect(course_selection_wrapper.state().subjects.length).toBe(2);
        
        // This contains the dropdown for the selection of additional courses available for tutors to teach.
        const course_selection_select_component = wrapper.find(Select).at(0);
        // Selecting an option from dropdown menu.Set state of the selected subject to tutor value.
        course_selection_wrapper.setState({ selected: course_selection_select_component.props().children[0].props.value });

        // Saving subjects array into another variable in order to make code cleaner.
        const subjects_array = course_selection_wrapper.state().subjects;
        // Adding selected component to the subjects array.
        subjects_array.push(course_selection_select_component.props().children[0].props.value);
        
        // Setting the states of the subjects and courses. 
        course_selection_wrapper.setState({ subjects: subjects_array });
        course_selection_wrapper.setState({ courses: course_selection_wrapper.state.selected });

        // Finding the Button component document on the TutorCourses page.
        const edit_courses_save = wrapper.find(Button).at(0);
        // Adding the subject Italian to the subjects the Tutor Teaches
        (tutor_class_wrapper.state().subjects).push('Italian');
        // Setting state of subjects to have the new array values with the new subject included.
        course_selection_wrapper.setState({ subjects: tutor_class_wrapper.state().subjects });
        
        // set a timeout since this is an async function.
        setTimeout( function(){
            // Simulate a button click on the save course changes button
            edit_courses_save.props().onClick(course_selection_wrapper.setState({ subjects: tutor_class_wrapper.state().subjects})); 
        }, 1);

        // Verfiying if new changes have been applied after Button Click is simulated
        setImmediate( () => { 
            expect(course_selection_wrapper.state().subjects);
            expect(course_selection_wrapper.state().subjects.length).toBe(4);
            done();
        })
    });

}); 
