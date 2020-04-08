import React from "react";
import TutorInfo from "../src/components/ProfilePage/Tutor/TutorPublicProfile/TutorInfo";
import TutorDescription from "../src/components/ProfilePage/Tutor/TutorPublicProfile/TutorDescription";
import TutorCourses from "../src/components/ProfilePage/Tutor/TutorPublicProfile/TutorCourses";
import TutorSubjects from "../src/components/ProfilePage/Tutor/TutorPublicProfile/TutorSubjects";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import Typography from '@material-ui/core/Typography';
import { Box, Card, TableCell, TableRow, Table } from "@material-ui/core";

configure({ adapter: new Adapter() });

describe('The Tutor Public Profile Page', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('Testing the Tutor Public Profile Page. Checking if all of the required information for specfic tutor page exists on the page.', () => {

        const mockedTutor = [
            {
                "_id": {
                    "$oid": "5dacd1cf1c9d440000aa0b1b"
                },
                "students": [
                    {
                        "id": "2",
                        "$oid": "5dc8735ebb22af5ae4ca23e6"
                    }
                ],
                "first_name": "Mohammed",
                "last_name": "Alawami",
                "school": "MoTutoring",
                "email": "moalawami@gmail.com",
                "program_of_study": "Computer Engineering",
                "subjects": [
                    "Math",
                    "Physics",
                    "Chemistry",
                    "French"
                ],
                "picture": "https://i.imgur.com/kyh5A1e.jpg",
                "__t": "tutor",
                "account": {
                    "$oid": "5db4bc7c1c9d440000de44e5"
                },
                "id": {
                    "$numberInt": "2"
                },
                "description": "I'm an engineering student in Concordia University. I love science and teaching and would love to be a university professor in the future. I teach general chemistry, Algabra math and calculus, physics mechanics & electricity and magnetism, English as a second language, basic C++ programming, and high school and Lower levels sciences. Prices are for one on one sessions. My prices ranges by the experience I have for teaching each of the courses. For school tutoring, we can discuss the price depending on what kind of tutoring you are looking for (frequency, how many courses, how many students, location, etc)",
                "courses": [
                    {
                        "course": {
                            "$oid": "5dbaef561c9d440000c0ab0a",
                            "students": [],
                            "name": "COMP 472",
                            "description": "Automated reasoning. Search and heuristic search. Game‑playing.",
                        },
                    },
                ],
                "uploadedpicture": {
                    "imgName": "kyh5A1e.jpg",
                    "imgData": "1cd1f07c151c4d41b0763023410c147a.jpg"
                }
            },
        ]

        // Testing the content of TutorInfo component
        const tutor_info_wrapper = mount(<TutorInfo tutor={mockedTutor[0]} email={mockedTutor[0].email} profilePicture={mockedTutor[0].uploadedpicture} studentTutors={mockedTutor} studentId={mockedTutor[0].students[0].id}></TutorInfo>);
        const tutor_info_card = tutor_info_wrapper.find(Card).at(0);

        expect(tutor_info_card.find(Typography).at(0).find(Box).at(0).props().children).toBe("Mohammed Alawami");
        expect(tutor_info_card.find(Typography).at(1).props().children[1]).toBe("moalawami@gmail.com");
        expect(tutor_info_card.find(Typography).at(2).props().children[1]).toBe("Computer Engineering");
        expect(tutor_info_card.find(Typography).at(3).props().children[1]).toBe("MoTutoring");

        // Testing the content of TutorDescription component
        const tutor_description_wrapper = mount(<TutorDescription tutor={mockedTutor[0]}></TutorDescription>);
        const tutor_description_card = tutor_description_wrapper.find(Card).at(0);

        expect(tutor_description_card.find(Typography).at(0).find(Box).at(0).props().children).toBe("About me");
        expect(tutor_description_card.find(TableRow).at(0).find(Typography).at(0).props().children).toBe(mockedTutor[0].description);

        // Testing the content of TutorCourses component
        const tutor_courses_wrapper = mount(<TutorCourses courses={mockedTutor[0].courses}></TutorCourses>);
        const tutor_courses = tutor_courses_wrapper.find(Card).at(0);
       
        expect(tutor_courses.find(TableRow).at(0).find(TableCell).at(1).props().children).toBe("COMP 472");

        // Testing content of TutorSubjects component
        const tutor_subjects_wrapper = mount(<TutorSubjects subjects={mockedTutor[0].subjects}></TutorSubjects>);
        const tutor_subject = tutor_subjects_wrapper.find(Card).at(0);

        expect(tutor_subject.find(TableRow).at(0).find(TableCell).at(1).props().children).toBe("Math");
       
    });
}); 