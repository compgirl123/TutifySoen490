import React from "react";
import StudentList, { StudentList as StudentListClass } from "../src/components/TutorProfile/StudentList";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Title from "../src/components/TutorProfile/Title";
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';

configure({ adapter: new Adapter() });

describe('The Students List for Tutors view docs Page', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Testing the Student List for Tutors view doc page. Checking if all the required elements are present on this page', () => {
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
        
        // Setting parameter in url file to be undefined as this is only a simple view list of students.
        // This variable is for tutors viewing the student list and documents for each student.
        const match = { params: { file: undefined } }
        // All the mounting and state setting
        const wrapper = mount(<StudentList students = {mockedTutorStudentsList} match ={match} ></StudentList>);
        const wrapper_shallow = shallow(<StudentList students = {mockedTutorStudentsList} match ={match}></StudentList>);
        const student_class_wrapper = wrapper.find(StudentListClass);
        student_class_wrapper.setState({ students: mockedTutorStudentsList });

        /**
         * Checking the List of Students Page for Tutors and see if all elements are present  
        */

        // Finding the Typography component  that contains the Main Title Header Present on the Page.
        const list_of_students_page = wrapper_shallow.dive().find(Typography).at(0);
        // Make sure the header name on the tutor page is List of Students
        expect(list_of_students_page.props().children).toBe("List of Students");

        // Finding the Title component  that contains the Table Title Students
        const students_title_table = wrapper_shallow.dive().find(Title).at(0);
        // Make sure the header name for the student page page is Students
        expect(students_title_table.props().children).toBe("Students");

        
        // Finding the Table component 
        const table_component= wrapper_shallow.dive().find(Table).at(0);
        // Check if Table component exists
        expect(table_component.exists()).toBeTruthy();

        // Finding the TableRow component  (row of the table)
        const table_row_component = wrapper_shallow.dive().find(TableRow).at(0);
        // Check if TableRow component exists
        expect(table_row_component.exists()).toBeTruthy();


        /**
         * First Row (Table headers shown here)
        */

        // Finding the second TableRow Component present on page
        const tableTitles = wrapper.find(TableRow).at(0);

        // Make sure the name of the first Table cell column exists and has the value "First Name"
        expect(tableTitles.props().children[0].props.children).toBe("First Name");

        // Make sure the name of the second Table cell column exists and has the value "Last Name"
        expect(tableTitles.props().children[1].props.children).toBe("Last Name");

        // Make sure the name of the third Table cell column exists and has the value "Program"
        expect(tableTitles.props().children[2].props.children).toBe("Program");

        // Make sure the name of the third Table cell column exists and has the value "School"
        expect(tableTitles.props().children[3].props.children).toBe("School");

        // Make sure the name of the fourth Table cell column exists and has the value "Level of Education"
        expect(tableTitles.props().children[4].props.children).toBe("Level of Education");

        // Make sure the name of the fourth Table cell column exists and has the value "View Doc"
        expect(tableTitles.props().children[5].props.children).toBe("View Doc");


        /**
         * Second Row (actual 1st student of the tutor should be shown here)
        */

        // Finding the second TableRow Component present on page
        const studentInformationrow1 = wrapper.find(TableRow).at(1);

        // Making sure that the First name of student matches the name on page
        expect(studentInformationrow1.props().children[0].props.children).toBe("Claudia Francesca");

        // Making sure that the Last name of student matches the name on page
        expect(studentInformationrow1.props().children[1].props.children).toBe("Feochari");

        // Making sure that the Program of study of student matches the name on page
        expect(studentInformationrow1.props().children[2].props.children).toBe("Soen");

        // Making sure that the School of student matches the name on page
        expect(studentInformationrow1.props().children[3].props.children).toBe("concordia");

        // Making sure that the Education Level of student matches the name on page
        expect(studentInformationrow1.props().children[4].props.children).toBe("university");

        // Making sure that the Education Level of student matches the name on page
        expect(studentInformationrow1.props().children[5].props.children.props.children).toBe("View Documents");


        /**
         * Third Row (actual 2nd student of the tutor should be shown here)
        */

        // Finding the third TableRow Component present on page
        const studentInformationrow2 = wrapper.find(TableRow).at(2);

        // Making sure that the First name of student matches the name on page
        expect(studentInformationrow2.props().children[0].props.children).toBe("Pierre Arthur");

        // Making sure that the Last name of student matches the name on page
        expect(studentInformationrow2.props().children[1].props.children).toBe("Watine");

        // Making sure that the Program of study of student matches the name on page
        expect(studentInformationrow2.props().children[2].props.children).toBe("Soen");

        // Making sure that the School of student matches the name on page
        expect(studentInformationrow2.props().children[3].props.children).toBe("concordia");

        // Making sure that the Education Level of student matches the name on page
        expect(studentInformationrow2.props().children[4].props.children).toBe("university");

        // Making sure that the View Documents button matches the button on page.
        expect(studentInformationrow1.props().children[5].props.children.props.children).toBe("View Documents");

        // Checking if the Share Document is Present on the Page if more than 0 documents exist.
        const shareButton = wrapper.find(TableRow).at(3);
        expect(shareButton.props().children.props.children.props.children).toBe("Share Document");
    });
}); 
