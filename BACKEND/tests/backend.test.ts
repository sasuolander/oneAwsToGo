//import { DescribeTypeCommand } from '@aws-sdk/client-cloudformation';
import chai = require('chai');
import { expect } from "chai";
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
import { app } from '../src/index';

beforeEach(async () => {
    // Put here what you need before running any tests

});

describe('Handle requests for /', () => { 
   it('should respond with JSON file when "/" is requested', async () => {
       const response = await chai.request(app).get('/');
       expect(response).to.have.status(200);
       expect(response).to.be.json;
   });
});
  
describe('Handle requests for /templates', () => { 
    it('should respond with JSON file when "/templates" is requested', async () => {
        const response = await chai.request(app).get('/templates');
        expect(response).to.have.status(200);
        expect(response).to.be.json;
    });
   

    it('should respond 201 with POST when "/templates" is requested', async () => {
        const response = await chai.request(app).post('/templates');
        expect(response).to.have.status(201);
        expect(response).to.be.json;
    });

});


after(async () => {
    process.exit(1);
});


