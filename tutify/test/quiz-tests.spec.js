import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Questions, { Questions as QuestionsClass } from "../src/components/Quiz/Questions";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";


var json = require("./testDb/quiz.json");

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
        const mockedClass = {
            main: "MAIN",
            p: "P",
            answersUl: "ANSWERSUL",
            submit: "SUBMIT",
            wrapper: "WRAPPER",
            fancyBtn: "FANCYBTN",
            formControl: "FORMCONTROL"
        }

        // All the mounting and state setting
        const wrapper = mount(<Questions classes={mockedClass} match={mockedEvent}></Questions>);
        const shallowwrapper = wrapper.find(QuestionsClass);
        shallowwrapper.setState({ quizzes: json.data, datas: json.data.questions, open: false, total: 1 });
        shallowwrapper.setState({ accountType: "tutor" });

        const button_component = wrapper.find(Button).at(0);
        expect(button_component.exists()).toBeTruthy();
        expect(wrapper.find('.P').text()).toBe("What hotel does Edward Calederon Work at");
        expect(wrapper.find('.ANSWERSUL').text()).toBe("A Majestic MirageB Majestic EleganceC Majestic Elegance ClubD Majestic Colonial");

    });

    it('should pop-up a dialog box when the state boolean changes', () => {
        // The value sent in the input

        const mockedEvent = {
            params: { id: '5e2a278df179bdc10d28385e' }
        }
        const mockedClass = {
            main: "MAIN",
            p: "P",
            answersUl: "ANSWERSUL",
            submit: "SUBMIT",
            wrapper: "WRAPPER",
            fancyBtn: "FANCYBTN",
            formControl: "FORMCONTROL"
        }

        // Just a placeholder to make travis work
        expect(true).toBe(true);

        // All the mounting and state setting
        const wrapper = mount(<Questions classes={mockedClass} match={mockedEvent}></Questions>);
        const shallowwrapper = wrapper.find(QuestionsClass);
        shallowwrapper.setState({ quizzes: json.data, datas: json.data.questions, open: false, total: 1 });
        shallowwrapper.setState({ accountType: "tutor" });

        expect(wrapper.find(Dialog).prop('open')).toBeFalsy();

        shallowwrapper.setState({ open: true });

        expect(wrapper.find(Dialog).prop('open')).toBeTruthy();
    });



}); 