import React from "react";
import ViewCourse, { ViewCourse as ViewCourseClass } from "../src/components/CourseView/ViewCourse";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TableRow from '@material-ui/core/TableRow';
import Title from "../src/components/TutorProfile/Title";

configure({ adapter: new Adapter() });

describe('The Tutors Courses Page', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Testing the specific view tutor courses. Checking if all of the required information for specfic tutor course page exists on the page.', () => {
        // All the mounting and state setting
        
        const mockedTutor =  [
            {
              _id: {
                "$oid": "5e02882c641f2eac8f2837b0"
              },
              course: {
                name: "COMP 472",
                description : "Automated reasoning. Search and heuristic search. Game‑playing.",
              },
              students: [
                {
                  first_name: "Pierre Arthur",
                  last_name: "Watine",
                  program_of_study: "Soen",
                  school: "concordia",
                  education_level : "university"
                }
              ],
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
              ],
              profileType: "tutor"
            }
          ]
         
        // Go to next page which contains information about a particular course the student is registered in.
        const wrapper_shallow_specific_course = shallow(<ViewCourse files={mockedTutor[0].files}></ViewCourse>);
        const wrapper_specific_course = mount(<ViewCourse files={mockedTutor[0].files}></ViewCourse>);
        const student_class_wrapper = wrapper_specific_course.find(ViewCourseClass);
        student_class_wrapper.setState({ files :mockedTutor[0].files,
                                         course_selected : mockedTutor[0].course.name,
                                         profileType: "tutor"})

        /**
         * Specific Course Page
        */
        
        // Finding the Grid component containing the Different classes student is registered for.
        const test = wrapper_shallow_specific_course.dive().find(Grid).at(0);
        // Seeing if the Grid components Exists (import grid)
        expect(test.exists()).toBeTruthy();

        // Finding the Typography component that contains the title for the Course Documents component.
        const course_title = wrapper_shallow_specific_course.dive().find(Typography).at(1);
        // Make sure the specific student course page contains tutor Course Documents header on it.
        expect(course_title.props().children).toBe("Course Documents");

        // Getting the Card that contains information about the course.
        const course_info =  wrapper_specific_course.find(Typography).at(3);
        // Make sure the specific student course page contains tutor Course Documents header and name on it.
        expect(course_info.props().children).toBe("COMP 472");

        // Getting the Card that contains information about the course.
        const more_course_info =  wrapper_specific_course.find(TableRow).at(0);
        // Make sure the specific student course page contains column "Title" in the Table
        expect(more_course_info.props().children[0].props.children).toBe("Title");
        // Make sure the specific student course page contains column "Date" in the Table
        expect(more_course_info.props().children[1].props.children).toBe("Date");
        // Make sure the specific student course page contains column "Download Documents" in the Table
        expect(more_course_info.props().children[2].props.children).toBe("Download Documents");
        // Make sure the specific student course page contains column "Select Documents to Delete" in the Table
        expect(more_course_info.props().children[3].props.children).toBe("Select Documents to Delete");

        // Finding the Table Row element containing the information of one row of a document shared to the class
        const course_document =  wrapper_specific_course.find(TableRow).at(1);

        // Expecting the document name to be equal to name in the course object
        expect(course_document.props().children[0].props.children).toBe(mockedTutor[0].files[0].name);
        // Expecting the document upload Date to be equal to upload Date in the course object
        expect(course_document.props().children[1].props.children).toBe(mockedTutor[0].files[0].uploadDate);
        // Expecting the download icon name to be equal to the "GetAppIcon" representing the download document icon symbol
        expect(course_document.props().children[2].props.children.props.children.type.displayName).toBe("GetAppIcon");
        // Expecting the checkbox element to be present on page and to have checkbox element in it. 
        expect(course_document.props().children[3].props.children.props["inputProps"]['aria-label']).toBe("uncontrolled-checkbox");
        // Expecting the name when checkbox is seleted to be equal to the encrypted file name
        expect(course_document.props().children[3].props.children.props.name).toBe(mockedTutor[0].files[0].encryptedname);

        // Finding last row of table that has the delete document button
        const delete_doc =  wrapper_specific_course.find(TableRow).at(2);
        // Expecting the Button at end of Page to have name "Delete Documents"
        expect(delete_doc.props().children.props.children.props.children).toBe("Delete Documents");
    
    });
}); 