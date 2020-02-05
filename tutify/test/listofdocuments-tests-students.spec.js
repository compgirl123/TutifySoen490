import React from "react";
import Studentdocs, { Studentdocs as StudentdocsClass } from '../src/components/ProfilePage/Studentdocs';
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';


configure({ adapter: new Adapter() });

describe('The List of documents Students Page', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Testing the List of Documents for Students. Checking if all the required elements are present on this page', () => {

        const mockedStudentDocList =  [ 
            {
            _id:{
                "$oid": '5e02ac05d7f39e289d21b7c6'
            },
            files:[
                { 
                    tutorName : "Mo Alawami",
                    _doc:{
                        sharedToStudents: ['5e02ac05d7f39e289d21b7c6'],
                        sharedToCourses: ['5dbaef561c9d440000c0ab0a'],
                        _id: '5e2a278df179bdc10d28385e',
                        __v: 0,
                        admin: '5dacd1cf1c9d440000aa0b1b',
                        encryptedname: 'ab400fe316f2ff085b9dcc1f1f445f0f.pdf',
                        link: '/document/ab400fe316f2ff085b9dcc1f1f445f0f.pdf',
                        name: 'Control-Systems-and-Appli.pdf',
                        uploadDate: '2020-01-23T23:09:01.286+00:00' 
                    }
                    
                },
                { 
                    tutorName : "Pooja Patel",
                    _doc:{
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
                     
                }

            ]      
        }
      ]

        // Setting parameter in url studentid to be undefined as no variable is passed in for sharing that document.
        // This variable is for students viewing documents
        const match = { params: { studentid: undefined } }
        // All the mounting and state setting
        const wrapper = mount(<Studentdocs files = {mockedStudentDocList} match={match}></Studentdocs>);
        const wrapper_shallow = shallow(<Studentdocs files = {mockedStudentDocList} match={match}></Studentdocs>);
        const student_class_wrapper = wrapper.find(StudentdocsClass);
        student_class_wrapper.setState({ files: mockedStudentDocList[0].files });

        /**
         * Checking the Titles Present on the Page List of Documents Page for Students and see if all elements are present  
        */

        // Finding the Typography component  that contains the Main Title Header Present on the Page.
        const list_of_documents_students = wrapper_shallow.dive().find(Typography).at(0);
        // Make sure the header name on the tutor page is List of Documents
        expect(list_of_documents_students.props().children).toBe("List of Documents");

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
        const titles = wrapper.find(TableRow).at(0);

        // Make sure the name of the first Table cell column exists and has the value "Name"
        expect(titles.props().children[0].props.children).toBe("Name");

        // Make sure the name of the second Table cell column exists and has the value "Name"
        expect(titles.props().children[1].props.children).toBe("Tutor");

        // Make sure the name of the third Table cell column exists and has the value "Upload Date"
        expect(titles.props().children[2].props.children).toBe("Upload Date");

        // Make sure the name of the third Table cell column exists and has the value "Download"
        expect(titles.props().children[3].props.children).toBe("Download");


        /**
         * Second Row (actual 1st student of the tutor should be shown here)
        */

        // Finding the second TableRow Component present on page
        const firstfileListed = wrapper.find(TableRow).at(1);

        // Making sure that the document name matches the name on page
        expect(firstfileListed.props().children[0].props.children.props.children).toBe(mockedStudentDocList[0].files[0]._doc.name);

        // Making sure that the tutor name matches the name on page
        expect(firstfileListed.props().children[1].props.children).toBe(mockedStudentDocList[0].files[0].tutorName);

        // Making sure that the upload date matches the name on page
        expect(firstfileListed.props().children[2].props.children).toBe(mockedStudentDocList[0].files[0]._doc.uploadDate);

        // Making sure that the download button matches the type on page
        expect(firstfileListed.props().children[3].props.children.props.children.type.displayName).toBe("GetAppIcon");


        /**
         * Third Row (actual 2nd student of the tutor should be shown here)
        */

        // Finding the second TableRow Component present on page
        const secondfileListed = wrapper.find(TableRow).at(2);

        // Making sure that the document name matches the name on page
        expect(secondfileListed.props().children[0].props.children.props.children).toBe(mockedStudentDocList[0].files[1]._doc.name);

        // Making sure that the tutor name matches the name on page
        expect(secondfileListed.props().children[1].props.children).toBe(mockedStudentDocList[0].files[1].tutorName);

         // Making sure that the upload date matches the name on page
        expect(secondfileListed.props().children[2].props.children).toBe(mockedStudentDocList[0].files[1]._doc.uploadDate);

        // Making sure that the download button matches the type on page
        expect(secondfileListed.props().children[3].props.children.props.children.type.displayName).toBe("GetAppIcon");
        
    });
}); 
