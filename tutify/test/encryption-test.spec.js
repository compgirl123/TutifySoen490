const testFunctions = require("../backend/controllers/user.controller");

describe("Encryption tests: ", function(){
    var text = "B3$A1o$%a!";

    it("encrypt() and decrypt()", function(){
        var eText= testFunctions.encrypt(text);
        expect(eText).not.toBe(text);

        expect(testFunctions.decrypt(eText)).toBe(text);
    });
});