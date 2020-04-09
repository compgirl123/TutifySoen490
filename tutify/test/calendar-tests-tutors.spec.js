import React from "react";
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { shallow } from 'enzyme';
import NewCalendar,{ NewCalendar as NewCalendarClass } from "../src/components/ProfilePage/Tutor/Calendar";
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import TableCell from '@material-ui/core/TableCell';

var jsonEvents = require("./testDb/tutorevents.json");
var jsonProfiles = require("./testDb/enhanced-profile.json");

configure({ adapter: new Adapter() });

describe('The Calendar Widget on Tutor Profile Dashboard', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    // get tutor's event's and then query by that thru tutor array
    it('Adding and Viewing Current Upcoming Events for Tutor', () => {
        const wrapper = mount(<NewCalendar></NewCalendar>);
        const wrapper_shallow = shallow(<NewCalendar></NewCalendar>);
 
        const calendar_class_wrapper = wrapper.find(NewCalendarClass);
        calendar_class_wrapper.setState({ events: [jsonEvents.data[jsonEvents.data.length-1]] });

        const dates = [];

        const calendarTitle = wrapper.find(Typography).at(0);
        expect(calendarTitle.props().children).toBe("Calendar");

        const addEventButton = wrapper.find(Fab).at(0);
        expect(addEventButton.props().children[1]).toBe("Add Event");

        /**
         *  Events Decoded : Bascially Setting up events like they are done in Calendar.js in order to decode them
         *  from the raw data present in the sample .json db. 
        */

        for(var x=0;x<jsonEvents.data.length;x++){
            // Fixing Date Formats
            var d = (jsonEvents.data[x].date).substring(0,10);
            var d2 = d.replace(/\D/g, "");
            d2 = d2.substring(6) + "/" + d2.substring(4, 6) + "/" + d2.substring(0, 4);
            d2 = d2.toString();
            dates.push(d2);
            jsonEvents.data[x].date = d2;
        }

        /**
         * Setting one event from Event Array for Particular Tutor
         * Choosing a date at random, here the last element of array is taken
         * Assign all events present in database to events state array in Calendar.js
        */

        calendar_class_wrapper.setState({ id: jsonEvents.data[jsonEvents.data.length-1]._id });
        calendar_class_wrapper.setState({ dates: [dates[jsonEvents.data.length-1]]});
        calendar_class_wrapper.setState({ eventsDecoded: [jsonEvents.data[jsonEvents.data.length-1]] });
        calendar_class_wrapper.setState({ startTime: jsonEvents.data[jsonEvents.data.length-1].startTime });
        calendar_class_wrapper.setState({ endTime: jsonEvents.data[jsonEvents.data.length-1].endTime });
        calendar_class_wrapper.setState({ location: jsonEvents.data[jsonEvents.data.length-1].location });
        calendar_class_wrapper.setState({ description: jsonEvents.data[jsonEvents.data.length-1].description });

        const dateOfEvent = wrapper.find(TableCell).at(1);
        expect(dateOfEvent.props().children).toBe("13/12/2019");
        expect(dateOfEvent.props().children).toBe(jsonEvents.data[jsonEvents.data.length-1].date);

        const times = wrapper.find(TableCell).at(4);
        expect(times.props().children[0]).toBe('13:00');
        expect(times.props().children[0]).toBe(jsonEvents.data[jsonEvents.data.length-1].startTime);
        expect(times.props().children[2]).toBe('15:00');
        expect(times.props().children[2]).toBe(jsonEvents.data[jsonEvents.data.length-1].endTime);

        const descriptionLocation = wrapper.find(TableCell).at(5);
        expect(descriptionLocation.props().children[0]).toBe('French tutoring for Bilal');
        expect(descriptionLocation.props().children[0]).toBe(jsonEvents.data[jsonEvents.data.length-1].description);
        expect(descriptionLocation.props().children[2]).toBe('@ Concordia University');
        expect(descriptionLocation.props().children[2]).toBe(jsonEvents.data[jsonEvents.data.length-1].location);
 
    });

    it('Deleting Upcoming Events for Tutor', () => {
        /**
         * ADDING AN EVENT HERE (More details described in the 'Adding and Viewing Current Upcoming Events for Tutor' test)
        */
        const wrapper = mount(<NewCalendar></NewCalendar>);
        const wrapper_shallow = shallow(<NewCalendar></NewCalendar>);
 
        const calendar_class_wrapper = wrapper.find(NewCalendarClass);
        
        calendar_class_wrapper.setState({ events: [jsonEvents.data[jsonEvents.data.length-1]] });
        
        const dates = [];

        calendar_class_wrapper.setState({ id: jsonEvents.data[jsonEvents.data.length-1]._id });
        calendar_class_wrapper.setState({ dates: [dates[jsonEvents.data.length-1]]});
        calendar_class_wrapper.setState({ eventsDecoded: [jsonEvents.data[jsonEvents.data.length-1]] });
        calendar_class_wrapper.setState({ startTime: jsonEvents.data[jsonEvents.data.length-1].startTime });
        calendar_class_wrapper.setState({ endTime: jsonEvents.data[jsonEvents.data.length-1].endTime });
        calendar_class_wrapper.setState({ location: jsonEvents.data[jsonEvents.data.length-1].location });
        calendar_class_wrapper.setState({ description: jsonEvents.data[jsonEvents.data.length-1].description });
       
       /**
        * DELETING AN EVENT HERE
       */

       var tutorEvents = jsonProfiles.data[0].events;
       var exists = 0;
      
       for (var y=0;y<tutorEvents.length;y++){
         // if event exists under tutor name, then set exists flag to 1 (true) as event exists.
         if(tutorEvents[y].$oid == calendar_class_wrapper.state().id.$oid){
           exists = 1;
         }
       }
       // if event exists under tutor, execute the following.
       if(exists == 1){
          calendar_class_wrapper.setState({ tutor_id: jsonProfiles.data[0]._id });
          for (var y=0;y<calendar_class_wrapper.state().events.length;y++){
            /** 
             * If the state of a particular event from tutors collection
             * is equal to the state of already defined id from events collection , then execute this if statement.
            */
            if((calendar_class_wrapper.state().events)[y]._id.$oid == calendar_class_wrapper.state().id.$oid ){
                (calendar_class_wrapper.state().events)[y] = {};
                calendar_class_wrapper.state().events.splice(y,1);
                expect((calendar_class_wrapper.state().events)[y]).toBe(undefined);
            }
          }
        
       }
       
    });
}); 
