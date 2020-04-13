import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TrophiesView, { TrophiesView as TrophiesViewClass } from "../src/components/TrophiesView/TrophiesView";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";


var json = require("./testDb/badges.json");

configure({ adapter: new Adapter() });
describe('The trophy page ', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    it('should display the trophies properly', () => {
        // The value sent in the input

        const mockedEvent = {
            params: { id: '5e2a278df179bdc10d28385e' }
        }
        const mockedClass = {
            appBarSpacer:"APPBARSPACER",
            container:"CONTAINER",
            levelHeading:"LEVELHEADING",
            levelHeading2:"LEVELHEADING2",
            totalPoints: "TOTALPOINTS",
            buttonBadges: "BUTTONBADGES",
            CircularProgressbar: "CIRCULARPROGRESSBAR",
            badgeGrid:"BADGEGRID",
            badgeButton1:"BADGEBUTTON1",
            avatarBadge:"AVATARBADGE",
            badgeButtonDisabled:"BADGEBUTTONDISABLED",
            levelButton:"LEVELBUTTON",
            badgeButton2:"BADGEBUTTON2",
            badgeButtonDisabled2:"BADGEBUTTONDISABLED2",
            avatarDialogBox:"AVATARDIALOGBOX",
            dialogBoxBadgePoints:"DIALOGBOXBADGEPOINTS"
        }

        // All the mounting and state setting
        const wrapper = mount(<TrophiesView classes={mockedClass} match={mockedEvent}></TrophiesView>);
        const shallowwrapper = wrapper.find(TrophiesViewClass);
        // shallowwrapper.setState({ quizzes: json.data, datas: json.data.questions, open: false, total: 1 });
        shallowwrapper.setState({ level: "",
        open: false,
        totalPoints: "",
        levelPoints: "",
        badges1: [],
        dialogBoxFileName: "",
        dialogBoxfinalFile: "",
        dialogBoxBadgePoints: 100,
        dialogBoxDescription: "",
        badges2: [],
        badges: [],
        id: "",
        badge_id: "",
        discriminator: [],
        dialogBoxenable: 0 });

        // const button_component = wrapper.find(Button).at(0);
        // expect(button_component.exists()).toBeTruthy();
        // expect(wrapper.find('.P').text()).toBe("What hotel does Edward Calederon Work at");
        // expect(wrapper.find('.ANSWERSUL').text()).toBe("A Majestic MirageB Majestic EleganceC Majestic Elegance ClubD Majestic Colonial");

    });

    


}); 