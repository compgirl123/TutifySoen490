// import a from "./support/testResponse.json";
// // import Response from "./../node_modules/node-fetch";


// var tester = require('./../src/components/SearchResults/SearchResults');
// var rogue = new tester();

// describe('LoadingIndicator', () => {
//   describe('when isLoading is false', () => {
//     it('should render children', async () => {
// 		var r = new Response();
// 		r.body = a;
// 		r.ok=true;
// 		r.status=200;

// 		var l = jasmine.createSpy('fetch').and.returnValue(Promise.resolve(r));
// 		// rogue.data="{id=0}";
		
//        rogue.getDataFromDb(l);
// 	  expect(rogue.data).toBe('{id:0}')
//     });
//   });
// });
// // var fileSystem = require('getDataFromDb');

// // // Importing a .js file in the src folder
// // var contents = fileSystem.readFileSync('./../src/components/SearchResults/SearchResults.js', 'utf-8',function(err, data) {});
// // var contentsModified = "var getDataFromDb = " + contents;
// // eval(contentsModified);

// // import SearchResults from "./../src/components/SearchResults/SearchResults.js";

// // describe("Database tests", function(){
// // 	it("getDataFromDb function", function(){
// //         expect(SearchResults.call(getDataFromDb)).toBe("0")
// // 	});
// // });