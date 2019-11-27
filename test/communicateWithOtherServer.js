let testUserToken = "yjk12rp45ghz5a1yp8jyv";
let assert = require('chai').assert;

let testDataSetTokenResultId = "github15046218";
let getUserInformationByUserToken = require('../src/communicateWithOtherServer/getUserInfoByUserTOken');

describe("Communication with other server", function () {
    it('Get user Information by user token', function (done) {
        (async function() {
            let userInfo = await getUserInformationByUserToken(testUserToken);
            assert.strictEqual(userInfo.id, testDataSetTokenResultId,"Result ID does not match");
            done();
        })();
    });
});