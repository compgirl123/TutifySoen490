import React from "react";
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
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

    it('should enable the unlock button if has enough points', () => {
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
        shallowwrapper.setState({ level: "",
        open: false,
        totalPoints: 101,
        levelPoints: 101,
        badges1: [json.data[0]],
        dialogBoxFileName: "",
        dialogBoxfinalFile: "",
        dialogBoxBadgePoints: 100,
        dialogBoxDescription: "testDescription",
        badges2: [json.data[1]],
        badges: json.data,
        id: "",
        badge_id: "",
        discriminator: [],
        dialogBoxenable: 0 });

        const button_component = wrapper.find(".BADGEBUTTON1");
        expect(button_component.at(0).exists()).toBeTruthy();
        expect(button_component.at(0).html()).toBe("<button class=\"MuiButtonBase-root MuiButton-root MuiButton-outlined TrophiesView-badgeButton1-651 BADGEBUTTON1\" tabindex=\"0\" type=\"button\"><span class=\"MuiButton-label\"><div class=\"MuiAvatar-root MuiAvatar-rounded TrophiesView-avatarBadge-662 AVATARBADGE\"><img src=\"test.jpg\" class=\"MuiAvatar-img\"></div></span></button>");
       

    });

    it('should disable the unlock button if not enough points', () => {
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
        shallowwrapper.setState({ level: "",
        open: false,
        totalPoints: 29,
        levelPoints: 29,
        badges1: [json.data[0]],
        dialogBoxFileName: "",
        dialogBoxfinalFile: "",
        dialogBoxBadgePoints: 100,
        dialogBoxDescription: "testDescription",
        badges2: [json.data[1]],
        badges: json.data,
        id: "",
        badge_id: "",
        discriminator: [],
        dialogBoxenable: 0 });

        const button_component = wrapper.find(".BADGEBUTTONDISABLED2");
        expect(button_component.at(0).exists()).toBeTruthy();
        expect(button_component.at(1).html()).toBe("<button class=\"MuiButtonBase-root MuiButton-root MuiButton-outlined TrophiesView-badgeButtonDisabled2-738 BADGEBUTTONDISABLED2\" tabindex=\"0\" type=\"button\"><span class=\"MuiButton-label\"><div class=\"MuiAvatar-root MuiAvatar-rounded TrophiesView-avatarBadge-746 AVATARBADGE\"><img src=\"test.jpg\" class=\"MuiAvatar-img\"></div></span></button>");
       

    });


   

    


}); 