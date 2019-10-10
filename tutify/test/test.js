var expect = require("chai").expect;
var assert = require("chai").assert;
describe('#sum()', function() {

    // add a test hook
    beforeEach(function() {
      // ...some logic before each test is run
    })
    
    // test a functionality
    it('should expect the correct result', function() {
      // add an assertion
      expect(1+1).to.equal(2);
    })
    it('should verify properties of given values', function() {
        // add an assertion
        assert.isArray([0,1], 'is an array');
      })
    
    // ...some more tests
    
  })