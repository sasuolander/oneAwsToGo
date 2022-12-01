"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { DescribeTypeCommand } from '@aws-sdk/client-cloudformation';
const chai = require("chai");
const chai_1 = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const index_1 = require("../src/index");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    // Put here what you need before running any tests
}));
describe('Handle requests for /', () => {
    it('should respond with JSON file when "/" is requested', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield chai.request(index_1.app).get('/');
        (0, chai_1.expect)(response).to.have.status(200);
        (0, chai_1.expect)(response).to.be.json;
    }));
});
describe('Handle requests for /templates', () => {
    it('should respond with JSON file when "/templates" is requested', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield chai.request(index_1.app).get('/templates');
        (0, chai_1.expect)(response).to.have.status(200);
        (0, chai_1.expect)(response).to.be.json;
    }));
    it('should respond 201 with POST when "/templates" is requested', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield chai.request(index_1.app).post('/templates');
        (0, chai_1.expect)(response).to.have.status(201);
        (0, chai_1.expect)(response).to.be.json;
    }));
});

/* global after:readonly */
after(() => __awaiter(void 0, void 0, void 0, function* () {
    yield process.exit(1);
}));

