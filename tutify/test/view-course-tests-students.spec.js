import React from "react";
import ViewCourse, { ViewCourse as ViewCourseClass } from "../src/components/CourseView/ViewCourse";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TableRow from '@material-ui/core/TableRow';

configure({ adapter: new Adapter() });

describe('The Students View Docs', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Testing the specific view student courses. Checking if all of the required information exists on the page.', () => {
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
              },
              files:
              [ 
                { uploadedDocs: [],
                    sharedToStudents: [Array],
                  sharedToCourses: [Array],
                  _id: '5e28c316259be07f5a788b09',
                  __v: 0,
                  admin: '5dacd1cf1c9d440000aa0b1b',
                  encryptedname: 'b0c16d9323dbf1438f595fc94ef219d5.jpg',
                  link: '/document/b0c16d9323dbf1438f595fc94ef219d5.jpg',
                  name: 'galaxyBackground.jpg',
                  uploadDate: '2020-01-22T21:48:06.561Z' 
                } 
              ]
            }
          ]
         
        // Go to next page which contains information about a particular course the student is registered in.
        const wrapper_shallow_specific_course = shallow(<ViewCourse files={mockedStudent[0].files}></ViewCourse>);
        const wrapper_specific_course = mount(<ViewCourse files={mockedStudent[0].files}></ViewCourse>);
        const student_class_wrapper = wrapper_specific_course.find(ViewCourseClass);
        student_class_wrapper.setState({ files :mockedStudent[0].files,
                                         course_selected : mockedStudent[0].course.name,
                                         profileType: "student"})

        /**
         * Specific Course Page
        */
        
        // Finding the Grid component containing the Different classes student is registered for.
        const course_grid = wrapper_shallow_specific_course.dive().find(Grid).at(0);
        // Seeing if the Grid components Exists (import grid)
        expect(course_grid.exists()).toBeTruthy();

        // Getting the table information about the course documents.
        const table_content =  wrapper_specific_course.find(TableRow).at(0);
        // Getting the title of the course documents.
        expect(table_content.find(Typography).at(0).props().children).toBe("Title");
        // Getting the extension name of the course documents.
        expect(table_content.find(Typography).at(1).props().children).toBe("Extension");
        // Getting the date of the course documents.
        expect(table_content.find(Typography).at(2).props().children).toBe("Date");
        // Getting the "download" title the course documents.
        expect(table_content.find(Typography).at(3).props().children).toBe("Download Documents");

        // Finding the Table Row element containing the information of one row of a document shared to the class
        const course_document =  wrapper_specific_course.find(TableRow).at(1);

        // Expecting the document name to be equal to name in the course object
        expect(course_document.props().children[0].props.children).toBe((mockedStudent[0].files[0].name).split(".")[0]);
        // Expecting the extension name to be equal to extension name in the course object
        expect(course_document.props().children[1].props.children).toBe((mockedStudent[0].files[0].name).split(".")[1]);
        // Expecting the document upload Date to be equal to upload Date in the course object
        expect((course_document.props().children[2].props.children).split(" ")[0]).toBe((mockedStudent[0].files[0].uploadDate).split("T")[0]);
        // Expecting the download icon name to be equal to the "GetAppIcon" representing the download document icon symbol
        expect(course_document.props().children[3].props.children.props.children.type.displayName).toBe("GetAppIcon");

    });
}); 
