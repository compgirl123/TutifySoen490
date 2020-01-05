import React from "react";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import TextField from '@material-ui/core/TextField';
import NewCalendar,{ NewCalendar as NewCalendarClass } from "../src/components/TutorProfile/Calendar";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

// importing the json object with the calendar events information
var json = require("./testDb/tutorevents.json");

configure({ adapter: new Adapter() });

describe('The Calendar Widget on Tutor Profile Dashboard', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    // get tutor's event's and then query by that thru tutor array

    it('Adding and Viewing Current Upcoming Events for Tutor', () => {
        // All the mounting and state setting
        const wrapper = mount(<NewCalendar></NewCalendar>);
        const wrapper_shallow = shallow(<NewCalendar></NewCalendar>);
 
        const calendar_class_wrapper = wrapper.find(NewCalendarClass);
        
        // Setting state of 4th element of array date.
        calendar_class_wrapper.setState({ data: json.data[4] });

        const dates = [];

        // Finding Typography Element for Calendar title.
        const calendarTitle = wrapper.find(Typography).at(0);
        // Expect Calendar title on page to equal title value passed in. 
        expect(calendarTitle.props().children).toBe("Calendar");

        // Finding Fab (Floating Action Button) Element for Add Event on Calendar Widget.
        const addEventButton = wrapper.find(Fab).at(0);
        // Expect Calendar title on page to equal title value passed in. 
        expect(addEventButton.props().children[1]).toBe("Add Event");

        /**
         *  Events Decoded : Bascially Setting up events like they are done in Calendar.js in order to decode them
         *  from the raw data present in the sample .json db. 
        */

        for(var x=0;x<json.data.length;x++){
            // Fixing Date Formats
            var d = (json.data[x].date).substring(0,10);
            var d2 = d.replace(/\D/g, "");
            d2 = d2.substring(6) + "/" + d2.substring(4, 6) + "/" + d2.substring(0, 4);
            d2 = d2.toString();
            dates.push(d2);
            json.data[x].date = d2;
        }

        /**
         * Setting one event from Event Array for Particular Tutor
         * Choosing a date at random, here the "4" element of array is taken
         * Assign all events present in database to events state array in Calendar.js
        */

        calendar_class_wrapper.setState({ dates: [dates[4]] });
        calendar_class_wrapper.setState({ eventsDecoded: [json.data[4]] });
        calendar_class_wrapper.setState({ startTime: json.data[4].startTime });
        calendar_class_wrapper.setState({ endTime: json.data[4].endTime });
        calendar_class_wrapper.setState({ location: json.data[4].location });
        calendar_class_wrapper.setState({ description: json.data[4].description });

        // Finding TableCell Element for Calendar date.
        const dateOfEvent = wrapper.find(TableCell).at(1);
        // Expect Calendar date on page to equal date string passed in. 
        expect(dateOfEvent.props().children).toBe("13/12/2019");
        // Expect Calendar date on page to equal date string from tutorevents.json. 
        expect(dateOfEvent.props().children).toBe(json.data[4].date);

        // Finding TableCell Element for Calendar startTime and endTime.
        const times = wrapper.find(TableCell).at(4);
        // Expect Calendar start time on page to equal start time value passed in. 
        expect(times.props().children[0]).toBe('13:00');
        // Expect Calendar start time on page to equal start time from tutorevents.json. 
        expect(times.props().children[0]).toBe(json.data[4].startTime);

        // Expect Calendar end time on page to equal start time value passed in. 
        expect(times.props().children[2]).toBe('15:00');
        // Expect Calendar end time on page to equal start time from tutorevents.json. 
        expect(times.props().children[2]).toBe(json.data[4].endTime);

        // Finding TableCell Element for Calendar description and location.
        const descriptionLocation = wrapper.find(TableCell).at(5);
        // Expect Calendar description on page to equal description value passed in. 
        expect(descriptionLocation.props().children[0]).toBe('French tutoring for Bilal');
        // Expect Calendar description on page to equal description from tutorevents.json.
        expect(descriptionLocation.props().children[0]).toBe(json.data[4].description);

        // Expect Calendar location on page to equal location value passed in. 
        expect(descriptionLocation.props().children[2]).toBe('Concordia University');
        // Expect Calendar location on page to equal location from tutorevents.json.
        expect(descriptionLocation.props().children[2]).toBe(json.data[4].location);
 
    });

    it('Deleting Upcoming Events for Tutor', () => {
        // Deletes events, finds current event displayed, takes it and deletes it (resets the events to null)
        // All the mounting and state setting
        // TO DO

        /**
         * ADDING AN EVENT HERE (More details described in the 'Adding and Viewing Current Upcoming Events for Tutor' test)
        */
        const wrapper = mount(<NewCalendar></NewCalendar>);
        const wrapper_shallow = shallow(<NewCalendar></NewCalendar>);
        const calendar_class_wrapper = wrapper.find(NewCalendarClass);
        
        calendar_class_wrapper.setState({ data: json.data[4] });
        const dates = [];

        const calendarTitle = wrapper.find(Typography).at(0);
        expect(calendarTitle.props().children).toBe("Calendar");

        const addEventButton = wrapper.find(Fab).at(0);
        expect(addEventButton.props().children[1]).toBe("Add Event");

        for(var x=0;x<json.data.length;x++){
            var d = (json.data[x].date).substring(0,10);
            var d2 = d.replace(/\D/g, "");
            d2 = d2.substring(6) + "/" + d2.substring(4, 6) + "/" + d2.substring(0, 4);
            d2 = d2.toString();
            dates.push(d2);
            json.data[x].date = d2;
        }

        calendar_class_wrapper.setState({ dates: [dates[4]] });
        calendar_class_wrapper.setState({ eventsDecoded: [json.data[4]] });
        calendar_class_wrapper.setState({ startTime: json.data[4].startTime });
        calendar_class_wrapper.setState({ endTime: json.data[4].endTime });
        calendar_class_wrapper.setState({ location: json.data[4].location });
        calendar_class_wrapper.setState({ description: json.data[4].description });

        /**
         * DELETING AN EVENT HERE
        */
        
        // finding event to delete by id.
    });

    
}); 
