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
        
        // Setting state of Title of notification 
        announcement_class_wrapper.setState({ aTitle: announcement.title });

        // Finding TextField Element for announcement title.
        const announcementTitle = wrapper.find(TextField).at(0);
        // Expect announcement title on page to equal title value passed in. 
        expect(announcementTitle.props().value).toBe(announcement.title);

        // Setting state of text field of notification. 
        announcement_class_wrapper.setState({ aText: announcement.text });

        // Finding TextField Element for announcement text.
        const announcementText = wrapper.find(TextField).at(1);
        // Expect announcement text on page to equal text value passed in. 
        expect(announcementText.props().value).toBe(announcement.text);
        
        // Finding Menu Element for announcement text.
        const sendToButton = wrapper.find(Menu).at(0);
        // Expect dropdown menu from Send To... button to show All as a first element.
        expect(sendToButton.props().children[0].props.children).toBe("All");
        // Expect dropdown menu from Send To... button to show Course as a second element.
        expect(sendToButton.props().children[1].props.children).toBe("Course");
        // Expect dropdown menu from Send To... button to show Student as a third element.
        expect(sendToButton.props().children[2].props.children).toBe("Student");

        // Finding MenuItem Element for announcement text.
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

        // Setting state of is course selected in drop down to be true.
        announcement_class_wrapper.setState({ isCoursesSelected: true,isStudentsSelected: false });

        // Finding ShowCourses Element for page that should contain it now.
        const show_courses = wrapper.find(ShowCourses).at(0);
        const show_courses_wrapper = mount(<ShowCourses courses ={courses}></ShowCourses>);
        const show_courses_shallow_wrapper = shallow(<ShowCourses courses ={courses}></ShowCourses>);
        const course_class_show_courses_wrapper = wrapper.find(ShowCoursesClass);

        // Finding List Element on page that should contain announcements there.
        const list_element_announcements_1 = show_courses_wrapper.find(List).at(0);

        // Expect dropdown menu option Course from Send To... to have a course with the value COMP 472 as a list option.
        expect(list_element_announcements_1 .props().children[0].key).toBe("COMP 472");
        // Expect dropdown menu option Course from Send To... to have a course with the value MATH 203 as a list option.
        expect(list_element_announcements_1 .props().children[1].key).toBe("MATH 203");

        // Finding the ShowCourses component containing the Different classes student is registered for.
        const show_courses_component = show_courses_wrapper.find(ShowCourses).at(0);
        // Expect the ShowCourses component Exists. It should exist as the Course Option is selected.
        expect(show_courses_component.exists()).toBeTruthy();

        // Finding the ShowStudents component containing the Different students registered with a particular tutor.
        const show_students_component = show_courses_wrapper.find(ShowStudents).at(0);
        // Expect the ShowStudents component does not Exist. It should not exist as the Students Option is not selected.
        expect(show_students_component.exists()).not.toBeTruthy();

        // Setting state of is student selected in drop down to be true.
        const announcement_class_wrapper2 = wrapper.find(AnnouncementsClass);
        announcement_class_wrapper2.setState({ isStudentsSelected: true,isCoursesSelected: false });

        // Finding Show Students Element for page that should contain it now.
        const show_students = wrapper.find(ShowCourses).at(0);
        const show_students_wrapper = mount(<ShowStudents students ={students}></ShowStudents>);
        const show_students_shallow_wrapper = shallow(<ShowStudents students ={students}></ShowStudents>);
        const student_class_show_courses_wrapper = wrapper.find(ShowStudentsClass);

        // Finding List Element on page that should contain announcements there.
        const list_element_announcements_2 = show_students_wrapper.find(List).at(0);
        
        // Expect dropdown menu option Student from Send To... to have a name with the value Pina Brutezezze
        expect((list_element_announcements_2.props().children[0].key).split("-").pop()).toBe("Pina Brutezezze");
        // Expect dropdown menu option Student from Send To... to have a course with the value Pierre Arthur Watine
        expect((list_element_announcements_2.props().children[1].key).split("-").pop()).toBe("Pierre Arthur Watine");

        // Finding the ShowStudents component containing the Different students registered with a particular tutor.
        const show_students_component2 = show_students_wrapper.find(ShowStudents).at(0);
        // Finding the ShowCourses component containing the Different classes student is registered for.
        const show_courses_component2 = show_courses_wrapper.find(ShowStudents).at(0);
 
        // Expect the ShowStudents component Exists. It should exist as the Course Option is selected.
        expect(show_students_component2.exists()).toBeTruthy();
        // Expect the ShowCourses component Exists. It should exist as the Course Option is selected.
        expect(show_courses_component2.exists()).not.toBeTruthy();
        // Expect the ShowCourses component does not Exist. It should not exist as the Students Option is not selected.
        expect(show_students_component2.exists()).toBeTruthy();

    });

    
}); 
