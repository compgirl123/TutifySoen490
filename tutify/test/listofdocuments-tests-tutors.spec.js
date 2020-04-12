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
              admin: '5dacd1cf1c9d440000aa0b1b',
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
              admin: '5dacd1cf1c9d440000aa0b1b',
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
        student_class_wrapper.setState({ files: mockedTutorDocList , profileType: "tutor"});

        /**
         * Checking the List of Students Page for Tutors and see if all elements are present  
        */

        const students_title_table = wrapper_shallow.dive().find(Title).at(0);
        expect(students_title_table.props().children).toBe("My Uploaded Documents ");

        const table_component= wrapper_shallow.dive().find(Table).at(0);
        expect(table_component.exists()).toBeTruthy();

        const table_row_component = wrapper_shallow.dive().find(TableRow).at(0);
        expect(table_row_component.exists()).toBeTruthy();


        /**
         * First Row (Table headers shown here)
        */

        const row = wrapper.find(TableRow).at(0);
        expect(row.find(Typography).at(0).props().children).toBe("Name");
        expect(row.find(Typography).at(1).props().children).toBe("Extension");
        expect(row.find(Typography).at(2).props().children).toBe("Uploaded on");
        expect(((row.props().children[3].type).toString()).substring(0,23)).toBe("function SharingOptions");
        expect(row.props().children[3].props.status).toBe("tutor");
        expect(row.props().children[3].props.buttons).toBe(false);
        expect(row.find(Typography).at(4).props().children).toBe("Share to Specific Student");
        expect(row.find(Typography).at(5).props().children).toBe("Download");
        expect(row.find(Typography).at(6).props().children).toBe("Select File(s) to Delete");

        /**
         * Second Row (actual 1st student of the tutor should be shown here)
        */

        const studentInformationrow1 = wrapper.find(TableRow).at(1);
        expect(studentInformationrow1.props().children[0].props.children.props.children).toBe((mockedTutorDocList[0].name).split(".")[0]);
        expect(studentInformationrow1.props().children[1].props.children).toBe("pdf");
        expect(studentInformationrow1.props().children[2].props.children).toBe("2020-01-23 at 23:09");
        expect(studentInformationrow1.props().children[3].props.status).toBe("tutor");
        expect(studentInformationrow1.props().children[3].props.buttons).toBe(true);
        expect(studentInformationrow1.props().children[3].props.encryptedname).toBe(mockedTutorDocList[0].encrypted_file_name);
        expect(studentInformationrow1.props().children[3].props.fileId).toBe(mockedTutorDocList[0]._id);
        expect(studentInformationrow1.props().children[4].props.children.props.type).toBe("button");
        expect(studentInformationrow1.props().children[4].props.children.props.id).toBe(mockedTutorDocList[0]._id);
        expect(studentInformationrow1.props().children[4].props.children.props.children.type.displayName).toBe('GetAppIcon');
        expect(studentInformationrow1.props().children[5].props.children.props.name).toBe(mockedTutorDocList[0].encryptedname);
        expect(studentInformationrow1.props().children[5].props.children.props.inputProps['aria-label']).toBe('uncontrolled-checkbox');

        /**
         * Third Row (actual 2nd student of the tutor should be shown here)
        */

        const studentInformationrow2 = wrapper.find(TableRow).at(2);
        expect(studentInformationrow2.props().children[0].props.children.props.children).toBe((mockedTutorDocList[1].name).split(".")[0]);
        expect(studentInformationrow2.props().children[1].props.children).toBe("jpg");
        expect(studentInformationrow2.props().children[2].props.children).toBe("2020-01-23 at 23:01");
        expect(studentInformationrow2.props().children[3].props.status).toBe("tutor");
        expect(studentInformationrow2.props().children[3].props.buttons).toBe(true);
        expect(studentInformationrow2.props().children[3].props.encryptedname).toBe(mockedTutorDocList[1].encrypted_file_name);
        expect(studentInformationrow2.props().children[3].props.fileId).toBe(mockedTutorDocList[1]._id);
        expect(studentInformationrow2.props().children[4].props.children.props.type).toBe("button");
        expect(studentInformationrow2.props().children[4].props.children.props.id).toBe(mockedTutorDocList[1]._id);
        expect(studentInformationrow2.props().children[4].props.children.props.children.type.displayName).toBe('GetAppIcon');
        expect(studentInformationrow2.props().children[5].props.children.props.name).toBe(mockedTutorDocList[1].encryptedname);
        expect(studentInformationrow2.props().children[5].props.children.props.inputProps['aria-label']).toBe('uncontrolled-checkbox');
    });
}); 
