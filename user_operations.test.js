 var mocha = require('mocha');
 var assert = require('assert');
 var sinon=require('sinon');
 var tools= require("./../db");
 var User = require('./../src/resources/users_operations');
 var _ = require('underscore')
 var expect= require("chai").expect;
 var arr = new Array();
 var idForOperation ;

  describe('perform user crud operations', function () {
      it('should create an user with provided details', function (done) {
        let req = sinon.spy();
        let res = sinon.spy();
            res = { json : sinon.spy() }
            req = {
              "body":{
                "firstName":"thulasi",
                "lastName":"kv",
                "emailId":"thulasi@gmail.com",
                "loginId":"126",
                "dob": new Date()
              }
            }
        User.createUserDetails(req, res).then(function(createdUserData){
          assert(createdUserData.firstName, req.body.firstName);
          assert(createdUserData.lastName, req.body.lastName);
          assert(createdUserData.emailId, req.body.emailId);
          assert(createdUserData.loginId, req.body.loginId);
         //idForOperation=createdUserData._id;
         // console.log('createUserDetails',idForOperation);
          console.log('createUserDetails',createdUserData);
          idForOperation = createdUserData._id
          //save this id for next test cases : createdUserData._id

          done();
        })
        
      });

      it('should check one user details with provided Id', function (done) {
        let req = sinon.spy();
        let res = sinon.spy();
            res = { json : sinon.spy(), send: sinon.spy()}
            req = {
              "params":{
                
                "id": idForOperation
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
            res={json:sinon.spy(), send: sinon.spy()}
        User.getAllUserDetails(req,res).then(function(getAllUserData){
  

          // //console.log('....', getAllUserData);
          // arr.getAllUserDetails>1;

          // //console.log('...', getAllUserData);
          // if(arr.length>1){
          //   console.log('getAllUserDetails',getAllUserData);
          //   expect(arr[0].firstName).to.be.a('string');
          //   expect(arr[0].lasttName).to.be.a('string');
          //   //expect(arr[0].loginId).to.be.a('string');
          //         console.log();
                   // }
      console.log('getAllUserDetails....', getAllUserData);
          done();
        })        
      });

      it('should Update user details with provided data', function (done) {
        let req = sinon.spy();
        let res = sinon.spy();
            //res = { json : sinon.spy() }
            res = { send : sinon.spy(), json: sinon.spy() }
            req = {
              "params":{
                "id": idForOperation
              },
              "body":{
                "firstName":"priya",
                "lastName":"kv",
                "emailId":"abc@gmail.com",
                "loginId":"123",
                "dob": new Date()
              }
              
            }
            User.updateUserDetails(req, res).then(function(updateUserData){
           assert(updateUserData.firstName, req.body.firstName);
           assert(updateUserData.lastName, req.body.lastName);
           assert(updateUserData.emailId, req.body.emailId);
           assert(updateUserData.loginId, req.body.loginId);
        //User.updateUserDetails(req,res).then(function(updateUserData){
           console.log('updateUserDetails....',updateUserData);
         done();
        })
      });
    
        it('should delete user details with provided data', function (done) {
         let req = sinon.spy();
         let res = sinon.spy();
             res = { json : sinon.spy(),send:sinon.spy() };
             req = {
               "params":{
                 "id": idForOperation
               }
             }
         User.removeUserDetails(req,res).then(function(removeUserData){
           console.log('removeUserDetails', removeUserData);
           done();
        })
    });
});

