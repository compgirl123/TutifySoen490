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
		// var r = new Response();
		// r.body = a;
		// r.ok=true;
		// r.status=200;

		// var l = jasmine.createSpy('fetch').and.returnValue(Promise.resolve(r));
		// rogue.data="{id=0}";
		
       //instance.getDataFromDb('http://www.mocky.io/v2/5da3a19b2f000050008a07dd');
	     //expect(instance.state('data')).toBe('{response:true}')
    });
  });
});
// var fileSystem = require('getDataFromDb');

// // Importing a .js file in the src folder
// var contents = fileSystem.readFileSync('./../src/components/SearchResults/SearchResults.js', 'utf-8',function(err, data) {});
// var contentsModified = "var getDataFromDb = " + contents;
// eval(contentsModified);

// import SearchResults from "./../src/components/SearchResults/SearchResults.js";

// describe("Database tests", function(){
// 	it("getDataFromDb function", function(){
//         expect(SearchResults.call(getDataFromDb)).toBe("0")
// 	});
// });