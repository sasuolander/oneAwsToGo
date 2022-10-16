"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
describe('Check that Mocha works, dummy test!', () => {
    it('Should be 1===1', () => {
        (0, chai_1.expect)(1).to.equal(1);
    });
});
