import React from "react";
import DocList, { DocList as DocListClass } from "../src/components/ProfilePage/Tutor/DocList";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Title from "../src/components/ProfilePage/Title";
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';

configure({ adapter: new Adapter() });

describe('The List of documents Tutors Page', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Testing the List of Documents for Tutors. Checking if all the required elements are present on this page', () => {
        const mockedTutorDocList =  [ 
            { 
              sharedToStudents: ['5e02ac05d7f39e289d21b7c6'],
              sharedToCourses: ['5dbaef561c9d440000c0ab0a'],
              _id: '5e2a278df179bdc10d28385e',
              __v: 0,
              adminTutor: '5dacd1cf1c9d440000aa0b1b',
              encryptedname: 'ab400fe316f2ff085b9dcc1f1f445f0f.pdf',
              link: '/document/ab400fe316f2ff085b9dcc1f1f445f0f.pdf',
              name: 'Control-Systems-and-Appli.pdf',
              uploadDate: '2020-01-23T23:09:01.286+00:00' 
            },
            { 
              sharedToStudents: ['5e02ac05d7f39e289d21b7c6'],
              sharedToCourses: [],
              _id: '5e2a25b0576eee0eedff1381',
              __v: 0,
              adminTutor: '5dacd1cf1c9d440000aa0b1b',
              encryptedname: '0b4a82b9f708c18b5ee692e4d4e54817.jpg',
              link: '/document/0b4a82b9f708c18b5ee692e4d4e54817.jpg',
              name: '398694_2999044569230_5339.jpg',
              uploadDate: '2020-01-23T23:01:04.915+00:00' 
            }
          ]

        // All the mounting and state setting
        const wrapper = mount(<DocList students = {mockedTutorDocList}></DocList>);
        const wrapper_shallow = shallow(<DocList students = {mockedTutorDocList}></DocList>);
        const student_class_wrapper = wrapper.find(DocListClass);
        student_class_wrapper.setState({ files: mockedTutorDocList });

        /**
         * Checking the List of Students Page for Tutors and see if all elements are present  
        */

        // Finding the Typography component that contains the Main Title Header Present on the Page.
        const list_of_students_page = wrapper_shallow.dive().find(Typography).at(0);
        // Make sure the header name on the tutor page is List of Documents
        expect(list_of_students_page.props().children).toBe("List of Documents");

        // Finding the Title component  that contains the Table Title Students
        const students_title_table = wrapper_shallow.dive().find(Title).at(0);
        // Make sure the header name for the student page page is Students
        expect(students_title_table.props().children).toBe("Uploaded Documents ");

        
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

        // Finding the first TableRow Component present on page
        const titles = wrapper.find(TableRow).at(0);

        // Make sure the name of the first Table cell column exists and has the value "Name"
        expect(titles.props().children[0].props.children).toBe("Name");

        // Make sure the name of the second Table cell column exists and has the value "Extension"
        expect(titles.props().children[1].props.children).toBe("Extension");

        // Make sure the name of the third Table cell column exists and has the value "Uploaded on"
        expect(titles.props().children[2].props.children).toBe("Uploaded on");

        // Make sure the name of the third Table cell column exists and has the value "Share to Specific Course"
        // The reason why they are seperated as the names are saved in an array and the middle element ([1])
        // contains information seperating the first words "Share to " from "Specific Course" with a new line
        expect(titles.props().children[3].props.children[0]).toBe("Share to ");
        expect(titles.props().children[3].props.children[2]).toBe("Specific Course");

        // Make sure the name of the fourth Table cell column exists and has the value "Share to Specific Student"
        // The reason why they are seperated as the names are saved in an array and the middle element ([1])
        // contains information seperating the first words "Share to " from "Specific Course" with a new line
        expect(titles.props().children[4].props.children[0]).toBe("Share to ");
        expect(titles.props().children[4].props.children[2]).toBe("Specific Student");

        // Make sure the name of the fifth Table cell column exists and has the value "Download"
        expect(titles.props().children[5].props.children).toBe("Download");

        // Make sure the name of the sixth Table cell column exists and has the value "Select File(s) to Delete"
        expect(titles.props().children[6].props.children).toBe("Select File(s) to Delete");


        /**
         * Second Row (actual 1st student of the tutor should be shown here)
        */

        // Finding the second TableRow Component present on page
        const studentInformationrow1 = wrapper.find(TableRow).at(1);

        // Making sure that the name of file matches the name on page
        expect(studentInformationrow1.props().children[0].props.children.props.children).toBe(mockedTutorDocList[0].name);

        // Making sure that the extension type of files matches the type on page
        expect(studentInformationrow1.props().children[1].props.children).toBe("pdf");

        // Making sure that the date and time of upload of the file matches the date and time on page
        expect(studentInformationrow1.props().children[2].props.children).toBe("2020-01-2 at 23:09");

        // Making sure that the Share to Course Button of file is present and the id it contains matches the id of the file
        expect(studentInformationrow1.props().children[3].props.children.props.id).toBe(mockedTutorDocList[0]._id);
        expect(studentInformationrow1.props().children[3].props.children.props.children.type.displayName).toBe("MenuBookIcon");

        // Making sure that the Share to Students Button of file is present and the id it contains matches the id of the file
        expect(studentInformationrow1.props().children[4].props.children.props.id).toBe(mockedTutorDocList[0]._id);
        expect(studentInformationrow1.props().children[4].props.children.props.children.type.displayName).toBe("GroupAddIcon");

        // Making sure that the Download Button of file is present and the id it contains matches the id of the file
        expect(studentInformationrow1.props().children[5].props.children.props.id).toBe(mockedTutorDocList[0]._id);
        expect(studentInformationrow1.props().children[5].props.children.props.children.type.displayName).toBe("GetAppIcon");

        // Making sure that the Checkbox for file selection is present and the encryptedname it contains matches the encryptedname of the file
        expect(studentInformationrow1.props().children[6].props.children.props.name).toBe(mockedTutorDocList[0].encryptedname);
        expect(studentInformationrow1.props().children[6].props.children.props.inputProps["aria-label"]).toBe("uncontrolled-checkbox");

        /**
         * Third Row (actual 2nd student of the tutor should be shown here)
        */

        // Finding the third TableRow Component present on page
        const studentInformationrow2 = wrapper.find(TableRow).at(2);

        // Making sure that the name of file matches the name on page
        expect(studentInformationrow2.props().children[0].props.children.props.children).toBe(mockedTutorDocList[1].name);

        // Making sure that the extension type of files matches the type on page
        expect(studentInformationrow2.props().children[1].props.children).toBe("jpg");

        // Making sure that the time of upload of the file matches the time on page
        expect(studentInformationrow2.props().children[2].props.children).toBe("2020-01-2 at 23:01");

        // Making sure that the Share to Course Button of file is present and the id it contains matches the id of the file
        expect(studentInformationrow2.props().children[3].props.children.props.id).toBe(mockedTutorDocList[1]._id);
        expect(studentInformationrow2.props().children[3].props.children.props.children.type.displayName).toBe("MenuBookIcon");

        // Making sure that the Share to Students Button of file is present and the id it contains matches the id of the file
        expect(studentInformationrow2.props().children[4].props.children.props.id).toBe(mockedTutorDocList[1]._id);
        expect(studentInformationrow2.props().children[4].props.children.props.children.type.displayName).toBe("GroupAddIcon");

        // Making sure that the Download Button of file is present and the id it contains matches the id of the file
        expect(studentInformationrow2.props().children[5].props.children.props.id).toBe(mockedTutorDocList[1]._id);
        expect(studentInformationrow2.props().children[5].props.children.props.children.type.displayName).toBe("GetAppIcon");

        // Making sure that the Checkbox for file selection is present and the encryptedname it contains matches the encryptedname of the file
        expect(studentInformationrow2.props().children[6].props.children.props.name).toBe(mockedTutorDocList[1].encryptedname);
        expect(studentInformationrow2.props().children[6].props.children.props.inputProps["aria-label"]).toBe("uncontrolled-checkbox");

        // Checking if the Delete Button is Present on the Page if more than 0 documents exist.
        const deleteButton = wrapper.find(TableRow).at(3);
        expect(deleteButton.props().children[1].props.children.props.children).toBe("Delete Documents");
        
    });
}); 
