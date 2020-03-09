// import a from "./support/testResponse.json";
// import Response from "./../node_modules/node-fetch";
import React from 'react';
import { shallow, configure } from 'enzyme';
import SearchResults from './../src/components/SearchResults/SearchResults';
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })



describe('LoadingIndicator', () => {
    
  describe('when isLoading is false', () => {
    it('should render children', async () => {
        const wrapper = shallow(<SearchResults />);
        const instance = wrapper.instance();
        console.log(wrapper.debug());
    });
  });
});
