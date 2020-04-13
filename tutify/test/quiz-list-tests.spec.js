import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ChooseCourseAndQuiz, { ChooseCourseAndQuiz as ChooseCourseAndQuizClass } from "../src/components/Quiz/ChooseCourseAndQuiz";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { Typography } from "@material-ui/core";


var json = require("./testDb/quiz-list.json");

configure({ adapter: new Adapter() });
describe('The quiz list page ', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('should display quizzes properly', () => {
        // The value sent in the input
        const mockedEvent = {
            params: { id: '5e2a278df179bdc10d28385e' }
        }
        const mockedOptions = ["COURSE1", "COURSE2", "COURSE3"]
        const mockedClass = {
            appBarSpacer: "APPBARSPACER",
            container: "CONTAINER",
            card: "CARD",
            media: "MEDIA",
            deleteIconButton: "DELETEICONBUTTON",
            deleteCourseButton: "DELETECOURSEBUTTON",
            formControl:"FORMCONTROL",
            addVideoButton:"ADDVIDEOBUTTON"
        }

        // All the mounting and state setting
        const wrapper = mount(<ChooseCourseAndQuiz classes={mockedClass} match={mockedEvent}></ChooseCourseAndQuiz>);
        const shallowwrapper = wrapper.find(ChooseCourseAndQuizClass);
        shallowwrapper.setState({
            quizzes: json.data,
            open:true,
            tutorFirstName: "Ronald",
          tutorLastName:"McDonald", 
            newValue:"NEWVALUE", 
            categoryOptions:mockedOptions,
            courseIndex:0,
            description:json.data.description
        });

        // Displays the quiz information properly
        expect(wrapper.find(Typography).at(0).text()).toBe("Tutify");
        expect(wrapper.find(Typography).at(1).text()).toBe("Tutify");
        expect(wrapper.find(Typography).at(2).text()).toBe("");
        expect(wrapper.find(Typography).at(3).text()).toBe("Ronald McDonald's Quizzes");
        expect(wrapper.find(Typography).at(4).text()).toBe("Test");

        

    });

}); 