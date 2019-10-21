import React from "react";
import SearchResults from "./../src/components/SearchResults/SearchResults";
const assert = require("chai").assert;

const enzyme = require("enzyme");
var Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

// chai.use(chaiEnzyme())

describe('LoadingIndicator', () => {
    
  describe('when isLoading is false', () => {
    it('should render children', async () => {
        const wrapper = enzyme.shallow(<SearchResults/>);
        const instance = wrapper.instance();
        console.log(wrapper.debug());
		// var r = new Response();
		// r.body = a;
		// r.ok=true;
		// r.status=200;
instance.getDataFromDb(' http://www.mocky.io/v2/5da3a19b2f000050008a07dd');
		// var l = jasmine.createSpy('fetch').and.returnValue(Promise.resolve(r));
		// rogue.data="{id=0}";
		assert.strictEqual(instance.state('data'), '{response:true}');
       
	  expect(instance.state('data')).toBe('{response:true}')
    });
  });
});