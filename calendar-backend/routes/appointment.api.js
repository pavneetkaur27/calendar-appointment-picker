"use strict";
var express               = require('express');
var router                = express.Router();
var session               = require('express-session');
var bodyParser            = require('body-parser');
const controller          = require('../controller');
const orgController       = controller.maindata;
const mdlw                = require('../middleware/org.mdlw');

router.get('/',function(req, res, next) {
    res.send("user working");
});

//fetch appointements details
router.post('/gt_apt',orgController.maindata.getAppointmentDetails);

// add new appointment
router.post('/ad_user_apt',orgController.maindata.addAppointmentDetail);

module.exports = router;
