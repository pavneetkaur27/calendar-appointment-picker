const mongoose              = require('mongoose');
const request 				= require('request');
const bvalid                = require("bvalid");
const mongo                 = require('../../services').Mongo;
const to                    = require('../../services').Utility.to;
const moment                = require('moment-timezone');
const helper                = require('../../helper');
const utils					= require('../../utils');
const configs               = require('../../config/app').server;
const httpResponse          = helper.HttpResponse;
const constants             = helper.Constants;
const errorCodes            = helper.Errors;
const sendError 		    = httpResponse.sendError;
const sendSuccess			= httpResponse.sendSuccess;


//fetch appointment details
exports.getAppointmentDetails = async function(req,res,next){
   
    try{
        var appointment_ob = {};
        var appointment_q_str   = { act : true };
        var appointment_proj = {};
        var appointment_option = {};
        var months = moment.months();
        var meridian = ['AM',"PM"]
        var [err,appointements] = await to(mongo.Model('appointment').find(appointment_q_str, appointment_proj,appointment_option));
        if(err){
            return sendError(res,err,"server_error");    
        }
        if(appointements.length == 0){
            return sendSuccess(res, {
                appointments : appointment_ob
            });
        }


        var booked_appointements = [];

        for(let i = 0 ; i < appointements.length ;i++){
            let appointement = appointements[i];
            var date_index = appointement.date+ "-"+ months[appointement.month-1]+ "-"+ appointement.time+ "-"+ meridian[appointement.time_meridian-1];
            if(!appointment_ob[date_index]){
                appointment_ob[date_index] = {};
            }
            appointment_ob[date_index] = appointement;
            if(appointement.status == 2){
                booked_appointements.push(appointement.user_id);
            }
        }

        if(booked_appointements.length == 0 ){
            return sendSuccess(res ,{
                appointments : appointment_ob
            });
        }
        // console.log(JSON.stringify(booked_appointements));

        var user_q_str   = { _id : { $in : booked_appointements}  };
        var user_proj    = {};
        var user_option  = {};

        var [err,users] = await to(mongo.Model('user').find(user_q_str, user_proj,user_option));
        if(err){
            return sendError(res,err,"server_error");    
        }
        if(users.length == 0){
            return sendSuccess(res, {
                appointments : appointment_ob
            });
        }

        var users_by_id = {};
        
        for(let i = 0 ; i < users.length ;i++){
            console.log(users[i]._id);
            if(!users_by_id[users[i]._id]){
                users_by_id[users[i]._id] = {};
            }
            
            users_by_id[users[i]._id] = users[i].nm;
        }
        // console.log(users_by_id);
        
        for(let i = 0 ; i < appointements.length ;i++){
            let appointement = appointements[i];
            var date_index = appointement.date+ "-"+ months[appointement.month-1]+ "-"+ appointement.time+ "-"+ meridian[appointement.time_meridian-1];
            // if(!appointment_ob[date_index]){
            //     appointment_ob[date_index] = {};
            // }
            if(users_by_id[appointement.user_id]){
                appointment_ob[date_index].user_name = users_by_id[appointement.user_id];
            }        
        }
        return sendSuccess(res ,{
            appointments : appointment_ob
        });
    }catch(err){
        return sendError(res,err,"server_error");    
    }
}


//add new appointment
exports.addAppointmentDetail = async function (req,res,next) {
    req.checkBody('name',errorCodes.invalid_parameters[1]).notEmpty();
    req.checkBody('email',errorCodes.invalid_parameters[1]).notEmpty();
    req.checkBody('time',errorCodes.invalid_parameters[1]).notEmpty();
    req.checkBody('time_meridian',errorCodes.invalid_parameters[1]).notEmpty();
    req.checkBody('date',errorCodes.invalid_parameters[1]).notEmpty();
    req.checkBody('month',errorCodes.invalid_parameters[1]).notEmpty();

    if(req.validationErrors()){
       return sendError(res,req.validationErrors(),"invalid_parameters",constants.HTTP_STATUS.BAD_REQUEST);
    }

    try{
        var data = req.body;

        function invaliParms(msg,flag){
            msg = msg ? msg : 'invalid_parameters';
            if(flag){
                return sendError(res,msg,"invalid_parameters",constants.HTTP_STATUS.BAD_REQUEST,true);
            }
            return sendError(res,msg,msg,constants.HTTP_STATUS.BAD_REQUEST);
        } 

        // check whether the date is open or not to be scheduled
        var query_string = {
            date    : parseInt(data.date),
            time    : parseInt(data.time),
            month   : parseInt(data.month),
            time_meridian : parseInt(data.time_meridian),
            status  : 1,
            act : true
        }
 
        var [err,date_available] = await to(mongo.Model('appointment').findOne(query_string, {},{}));
        if(err){
            return sendError(res,err,"server_error"); 
        }
        if(!date_available){
            return sendError(res,"date_unavailable","date_unavailable"); 
        }
       
        if(!bvalid.isEmail(data.email)){
            return invaliParms("invalid_email");
        }
        if(!(bvalid.isString(data.name))){
            return invaliParms("invalid_parameters");
        }
        
        var user_obj = {
            nm  : data.name,
            eml : data.email,
            act : true
        }
        var [err0, resp0] = await to(mongo.Model('user').insert(user_obj));
        if(err0){
            return sendError(res,"server_error","server_error");
        }
        if(resp0){
            var appointment_update = {
                status  : 2,
                user_id : resp0._id
            }
            var [err, updated_appointment] = await to(mongo.Model('appointment').updateOne(query_string, { $set : appointment_update}));
            if(err){
                return sendError(res,err,"server_error"); 
            }
            console.log(updated_appointment);
            return sendSuccess(res,{}); 
        }else{
            return sendError(res,err,"server_error");    
        }
    }catch(err){
        return sendError(res,err,"server_error");    
    }
}
