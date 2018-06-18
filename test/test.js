 var mocha = require('mocha');
 var assert = require('assert');
 var sinon=require('sinon');
 var tools= require("./../db");
 var User = require('./../src/resources/users_operations');
 var _ = require('underscore')
 var expect= require("chai").expect;

  describe('perform user crud operations', function () {
      it('should create an user with provided details', function (done) {
        let req = sinon.spy();
        let res = sinon.spy();
            res = { json : sinon.spy() }
            req = {
              "body":{
                "firstName":"charan",
                "lastName":"kv",
                "emailId":"charan@gmail.com",
                "loginId":"124",
                "dob": new Date()
              }
            }
        User.createUserDetails(req, res).then(function(createdUserData){
          assert(createdUserData.firstName, req.body.firstName);
          assert(createdUserData.lastName, req.body.lastName);
          assert(createdUserData.emailId, req.body.emailId);
          assert(createdUserData.loginId, req.body.loginId);

          //save this id for next test cases : createdUserData._id

          done();
        })
        
      });
      it('should check user details with provided emailId', function (done) {
        let req = sinon.spy();
        let res = sinon.spy();
            res = { json : sinon.spy() }
            req = {
              "params":{
                
                "emailId":"charan@gmail.com"
              }
            }
        User.getOneUserDetails(req,res).then(function(getOneUserData){
          console.log('getOneUserDetails', getOneUserData);
          done();
        })
      });
      it('should check all user details', function(done){
        let req=sinon.spy();
        let res=sinon.spy();
            res={json:sinon.spy()}
        User.getAllUserDetails(req,res).then(function(getAllUserData){
          console.log('getAllUserDetails....', getAllUserData);
          done();
        })        
      });
       it('should Update user details with provided emailId', function (done) {
        let req = sinon.spy();
        let res = sinon.spy();
            res = { json : sinon.spy() }
            req = {
                "body":{
                "firstName":"priya",
                "lastName":"av",
                "emailId":"qbd@gmail.com",
                "loginId":"123",
                "dob": new Date()
              }
              
            }
          //   User.updateUserDetails(req, res).then(function(updateUserData){
          // assert(updateUserData.firstName, req.body.firstName);
          // assert(updateUserData.lastName, req.body.lastName);
          // assert(updateUserData.emailId, req.body.emailId);
          // assert(updateUserData.loginId, req.body.loginId);
        User.updateUserDetails(req,res).then(function(updateUserData){
           console.log('updateUserDetails....',updateUserData);
         done();
        })
      });
    
        it('should delete user details with provided emailId', function (done) {
         let req = sinon.spy();
         let res = sinon.spy();
             res = { json : sinon.spy() }
             req = {
               "params":{
                 "emailId":"qbd@gmail.com"
               }
             }
         User.removeUserDetails(req,res).then(function(deleteUserData){
           console.log('removeUserDetails', deleteUserData);
           done();
        })
    });
});