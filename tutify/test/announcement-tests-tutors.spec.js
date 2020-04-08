import React from "react";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import TextField from '@material-ui/core/TextField';
import Announcements,{ Announcements as AnnouncementsClass } from "../src/components/TutorAnnouncements/Announcements";
import ShowCourses,{ ShowCourses as ShowCoursesClass } from "../src/components/TutorAnnouncements/ShowCourses";
import ShowStudents ,{ ShowStudents as ShowStudentsClass }from "../src/components/TutorAnnouncements/ShowStudents";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';

configure({ adapter: new Adapter() });

describe('The Student Dashboard Page', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Add To Do Item to List', () => {

        const announcement = 
        {
            _id: {
            $oid: "5e01689fbd1ef084d89dec5b"
            },
            title: "A1",
            text: "New announcement.",
            tutorImg: "https://i.imgur.com/kyh5A1e.jpg",
            tutorName: "Mohammed Alawami",
            tutorid: {
            $oid: "5dacd1cf1c9d440000aa0b1b"
            }
        }

        // All the mounting and state setting
        const wrapper = mount(<Announcements></Announcements>);
        const wrapper_shallow = shallow(<Announcements></Announcements>);

        const announcement_class_wrapper = wrapper.find(AnnouncementsClass);
        announcement_class_wrapper.setState({ aTitle: announcement.title });

        const announcementTitle = wrapper.find(TextField).at(0);
        expect(announcementTitle.props().value).toBe(announcement.title);
        announcement_class_wrapper.setState({ aText: announcement.text });
        
        const announcementText = wrapper.find(TextField).at(1);
        expect(announcementText.props().value).toBe(announcement.text);
        
        const sendToButton = wrapper.find(Menu).at(0);
        expect(sendToButton.props().children[0].props.children).toBe("All");
        expect(sendToButton.props().children[1].props.children).toBe("Course");
        expect(sendToButton.props().children[2].props.children).toBe("Student");

        const menuItem = wrapper.find(MenuItem).at(0);
        const courses = 
        [
            {
              students: [{first_name:"Pierre",last_name : "LeGallois"},{first_name:"William",last_name : "Watine"}
              ],
              course: {
                name : "COMP 472"
              }
            },
            {
               students: [{first_name:"Pina",last_name : "Brutezezze"},{first_name:"Miranda",last_name : "Singer"}],
               course: {
                name : "MATH 203"
               }
            }

        ]

        const students =
        [
            {
                first_name: "Pina",
                last_name: "Brutezezze",
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

        announcement_class_wrapper.setState({ isCoursesSelected: true,isStudentsSelected: false });

        const show_courses = wrapper.find(ShowCourses).at(0);
        const show_courses_wrapper = mount(<ShowCourses courses ={courses}></ShowCourses>);
        const show_courses_shallow_wrapper = shallow(<ShowCourses courses ={courses}></ShowCourses>);
        const course_class_show_courses_wrapper = wrapper.find(ShowCoursesClass);

        const list_element_announcements_1 = show_courses_wrapper.find(List).at(0);
        expect(list_element_announcements_1 .props().children[0].key).toBe("COMP 472");
        expect(list_element_announcements_1 .props().children[1].key).toBe("MATH 203");

        const show_courses_component = show_courses_wrapper.find(ShowCourses).at(0);
        expect(show_courses_component.exists()).toBeTruthy();

        const show_students_component = show_courses_wrapper.find(ShowStudents).at(0);
        expect(show_students_component.exists()).not.toBeTruthy();

        const announcement_class_wrapper2 = wrapper.find(AnnouncementsClass);
        announcement_class_wrapper2.setState({ isStudentsSelected: true,isCoursesSelected: false });

        const show_students = wrapper.find(ShowCourses).at(0);
        const show_students_wrapper = mount(<ShowStudents students ={students}></ShowStudents>);
        const show_students_shallow_wrapper = shallow(<ShowStudents students ={students}></ShowStudents>);
        const student_class_show_courses_wrapper = wrapper.find(ShowStudentsClass);

        const list_element_announcements_2 = show_students_wrapper.find(List).at(0);
        expect((list_element_announcements_2.props().children[0].key).split("-").pop()).toBe("Pina Brutezezze");
        expect((list_element_announcements_2.props().children[1].key).split("-").pop()).toBe("Pierre Arthur Watine");

        const show_students_component2 = show_students_wrapper.find(ShowStudents).at(0);

        const show_courses_component2 = show_courses_wrapper.find(ShowStudents).at(0);
        expect(show_students_component2.exists()).toBeTruthy();
        expect(show_courses_component2.exists()).not.toBeTruthy();
        expect(show_students_component2.exists()).toBeTruthy();

    });

    
}); 
