import { shallow , mount } from 'enzyme';
import React from "react";
import PropTypes from 'prop-types';
import { SearchResults}  from "../src/components/SearchResults/SearchResults";
const assert = require("chai").assert;
const enzyme = require("enzyme");
var Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });
describe( 'Rendering posts in app', () => {
    it( 'Shows the posts', () => {
        const component = mount(
              <SearchResults />
        );
        console.log(component);
        component.setState({posts: 'test'});
       // expect(component.find('.post-list-wrapper').length).toEqual(2);
    });
  });