import React from "react";
import StudentList, { StudentList as StudentListClass } from "../src/components/ProfilePage/Tutor/StudentList";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Title from "../src/components/ProfilePage/Title";
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';

configure({ adapter: new Adapter() });

describe('The Students List for Tutors share doc Page', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Testing the Student List for Tutors share doc page. Checking if all the required elements are present on this page', () => {
        const mockedTutorStudentsList =  [
            {
                first_name: "Claudia Francesca",
                last_name: "Feochari",
                program_of_study: "Soen",
                school: "concordia",
                education_level : "university"
            },
            {
                first_name: "Pierre Arthur",
                last_name: "Watine",
                program_of_study: "Soen",
                school: "concordia",
                education_level : "university"
            }
          ]

        // Setting parameter in url file to have the encrypted file name
        // This variable is for tutors sharing a file to the student list and documents for each student(s).
        const match = { params: { file: '0b4a82b9f708c18b5ee692e4d4e54817.jpg' } }
        const wrapper = mount(<StudentList students = {mockedTutorStudentsList} match ={match} ></StudentList>);
        const wrapper_shallow = shallow(<StudentList students = {mockedTutorStudentsList} match ={match}></StudentList>);
        const student_class_wrapper = wrapper.find(StudentListClass);
        student_class_wrapper.setState({ students: mockedTutorStudentsList });

        /**
         * Checking the List of Students Page for Tutors and see if all elements are present  
        */

        const students_title_table = wrapper_shallow.dive().find(Title).at(0);
        expect(students_title_table.props().children).toBe("Students");

        const table_component= wrapper_shallow.dive().find(Table).at(0);
        expect(table_component.exists()).toBeTruthy();

        const table_row_component = wrapper_shallow.dive().find(TableRow).at(0);
        expect(table_row_component.exists()).toBeTruthy();

        /**
         * First Row (Table headers shown here)
        */

        const titles = wrapper.find(TableRow).at(0);
        expect(titles.find(Typography).at(0).props().children).toBe("First Name");
        expect(titles.find(Typography).at(1).props().children).toBe("Last Name");
        expect(titles.find(Typography).at(2).props().children).toBe("Program");
        expect(titles.find(Typography).at(3).props().children).toBe("School");
        expect(titles.find(Typography).at(4).props().children).toBe("Level of Education");
        expect(titles.find(Typography).at(5).props().children).toBe("Select student");


        /**
         * Second Row (actual 1st student of the tutor should be shown here)
        */

        // Finding the second TableRow Component present on page
        const studentInformationrow1 = wrapper.find(TableRow).at(1);
        expect(studentInformationrow1.props().children[0].props.children).toBe("Claudia Francesca");
        expect(studentInformationrow1.props().children[1].props.children).toBe("Feochari");
        expect(studentInformationrow1.props().children[2].props.children).toBe("Soen");
        expect(studentInformationrow1.props().children[3].props.children).toBe("concordia");
        expect(studentInformationrow1.props().children[4].props.children).toBe("university");
        expect(studentInformationrow1.props().children[5].props.children.props.inputProps['aria-label']).toBe("uncontrolled-checkbox");


        /**
         * Third Row (actual 2nd student of the tutor should be shown here)
        */

        const studentInformationrow2 = wrapper.find(TableRow).at(2);
        expect(studentInformationrow2.props().children[0].props.children).toBe("Pierre Arthur");
        expect(studentInformationrow2.props().children[1].props.children).toBe("Watine");
        expect(studentInformationrow2.props().children[2].props.children).toBe("Soen");
        expect(studentInformationrow2.props().children[3].props.children).toBe("concordia");
        expect(studentInformationrow2.props().children[4].props.children).toBe("university");
        expect(studentInformationrow2.props().children[5].props.children.props.inputProps['aria-label']).toBe("uncontrolled-checkbox");

    });
}); 
