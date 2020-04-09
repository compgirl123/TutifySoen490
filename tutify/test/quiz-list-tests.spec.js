import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ChooseCourseAndQuiz, { ChooseCourseAndQuiz as ChooseCourseAndQuizClass } from "../src/components/Quiz/ChooseCourseAndQuiz";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";


var json = require("./testDb/quiz-list.json");

configure({ adapter: new Adapter() });
describe('The quiz page ', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('should display the questions properly', () => {
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
        shallowwrapper.setState({ quizzes: json.data, open:true, newValue:"NEWVALUE", categoryOptions:mockedOptions});


        // // Finding the Button component 
        // const button_component = wrapper.find(Button).at(0);
        // // Check if the "add quiz" button exists
        // expect(button_component.exists()).toBeTruthy();

        // // Displays the question properly
        // expect(wrapper.find('.P').text()).toBe("What hotel does Edward Calederon Work at");

        // // Displays the answers properly
        // expect(wrapper.find('.ANSWERSUL').text()).toBe("A Majestic MirageB Majestic EleganceC Majestic Elegance ClubD Majestic Colonial");

    });

    it('should pop-up a dialog box when the state boolean changes', () => {
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
        shallowwrapper.setState({ quizzes: json.data, open:true, newValue:"NEWVALUE", categoryOptions:mockedOptions});


    
    });



}); 