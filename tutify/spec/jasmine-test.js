// var fileSystem = require('fs');

// // Importing a .js file in the src folder
// var contents = fileSystem.readFileSync('./src/signUpPageLogic.js', 'utf-8',function(err, data) {});
// var contentsModified = "var fn = " + contents;

// // taking the string content from contentsModified and converting it into a function
// eval(contentsModified);
// fn();
// console.log(fn());

// // simple test function that is locally contained within the jasmine-test.js file.
// describe("A suite", function() {
//   it("contains spec with an expectation", function() {
//     expect(fn()).toBe(true);
//   });
// });

// // Simple test function that is contained outside of the directory and in the src/signUpPageLogic.js directory.
// // This function simply tests if the addition of 2+2 is equal to 4.
// // In the future, we will be adding functions that test the functionality of the Sign Up Page within this group of functions.
// describe("Tests for Sign Up Page", function(){
// 	it("addition function", function(){
// 		expect(fn()).toBe(true);
// 	});
// });