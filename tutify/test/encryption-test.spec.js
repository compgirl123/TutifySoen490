const testFunctions = require("../backend/controllers/user.controller");
const assert = require("chai").assert;
describe("Encryption tests: ", function(){
    var text = "B3$A1o$%a!";

    it("encrypt() and decrypt()", function(){
        var eText= testFunctions.encrypt(text);
        assert(eText !== text);

        assert(testFunctions.decrypt(eText)===text);
    });
});