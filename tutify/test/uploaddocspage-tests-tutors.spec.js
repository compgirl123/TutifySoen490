import React from "react";
import MyCourses, { MyCourses as MyCoursesClass } from "../src/components/CourseView/MyCourses";
import UploadDocuments, { UploadDocuments as UploadDocumentsClass } from "../src/components/Documents/UploadDocuments";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';

configure({ adapter: new Adapter() });
describe('The Tutors Courses Page', () => {
    let mount;
    beforeAll(() => {
        mount = createMount();
    });
    it('Testing the general tutor courses page. Checking if all of the required information for tutor course page exists on the page.', () => {
        // All the mounting and state setting
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
              uploadDate: '2020-01-23T23:09:01.286+00:00' ,
              recentUploadDate: '2020-01-23'
            }
          ]
        
        const wrapper = mount(<UploadDocuments files = {mockedTutorDocList} ></UploadDocuments>);
        const wrapper_shallow = shallow(<UploadDocuments files = {mockedTutorDocList}></UploadDocuments>);
        const student_class_wrapper = wrapper.find(UploadDocumentsClass);
        student_class_wrapper.setState({ files: mockedTutorDocList,
                                         recentUploadDate:mockedTutorDocList[0].recentUploadDate,
                                         recentFileName:mockedTutorDocList[0].name,
                                         recentFileLink:mockedTutorDocList[0].link});
        
        /**
         * General Course Page
        */
        // Finding the Typography component that contains the Main Title Header Present on the Page.
        const course_title = wrapper_shallow.dive().find(Typography).at(0);
        // Make sure the header name for the student page has the value My Enrolled Courses
        expect(course_title.props().children).toBe("Upload Documents");
        // Getting the Card that contains information about the course.
        const cardInfo = wrapper.find(Button).at(0);
        // Making sure that the Course name matches the mock student’s.
        expect(cardInfo.props().children.type.displayName).toBe("PublishIcon");
        // Finding the Table component 
        const table_component= wrapper_shallow.dive().find(Table).at(0);
        // Check if Table component exists
        expect(table_component.exists()).toBeTruthy();

        // Finding the TableRow component  (row of the table)
        const table_row_component = wrapper_shallow.dive().find(TableRow).at(0);
        // Check if TableRow component exists
        expect(table_row_component.exists()).toBeTruthy();

        // Finding the first TableRow Component present on page
        const titles = wrapper.find(TableRow).at(0);

        // Make sure the name of the first Table cell column exists and has the value "Date"
        expect(titles.props().children[0].props.children).toBe("Date");

        // Make sure the name of the first Table cell column exists and has the value "Name"
        expect(titles.props().children[1].props.children).toBe("Name");

        // Make sure the name of the first Table cell column exists and has the value "Download"
        expect(titles.props().children[2].props.children).toBe("Download File");

        // Finding the first TableRow Component present on page
        const studentInformationrow1 = wrapper.find(TableRow).at(1);
        // Make sure the name of the first Table cell column exists and has the value "Date"
        expect(studentInformationrow1.props().children[0].props.children).toBe(mockedTutorDocList[0].recentUploadDate);

        // Make sure the name of the first Table cell column exists and has the value "Name"
        expect(studentInformationrow1.props().children[1].props.children).toBe(mockedTutorDocList[0].name);
        // Make sure the name of the first Table cell column exists and has the value "GetAppIcon"
        expect(studentInformationrow1.props().children[2].props.children.props.children.type.displayName).toBe("GetAppIcon");

        // Finding the first TableRow Component present on page
        const seemore = wrapper_shallow.dive().find(Link).at(0);
        expect(seemore.props().href).toBe("/doclist");
        expect(seemore.props().children).toBe("See more");

    });
});