var expect = require("chai").expect;
var request = require("supertest");
var app = require("../todoapp.js");

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      expect([1,2,3].indexOf(5)).to.equal(-1);
      expect([1,2,3].indexOf(0)).to.equal(-1);
    });
  });
});

describe('GET /', function(){
    it('respond with html', function(done){
        request(app)
        .get('/')
        .set('Accept', 'text/html')
        .expect('Content-Type', /html/)
        .expect(200, done);
    });
});

describe('GET /todos', function(){
    it('respond with json', function(done){
        request(app)
        .get('/todos')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});

