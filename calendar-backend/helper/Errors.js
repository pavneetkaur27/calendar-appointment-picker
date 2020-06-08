"use strict";
var errors = {
	"invalid_parameters" 										: [100, "Invalid Parameters"],
	"server_error"		 										: [500, "Something went wrong"],
	"no_server_response"										: [2300,"No response from server"],
	"invalid_email"												: [101, "Invalid Email Id"],
	"date_unavailable"											: [800, "Date not available to book"],
	"invalid_url"												: [400,"Invalid url"],
	"invalid_permission"										: [400,"Invalid permisson"],
	"invalid_permission_status"									: [400,"Invalid permisson status"],
	"unauthorised"												: [401,"You are not authorised"],
	"mongo_error"												: [500,"Mongo error !"],
	"unable_to_update"										    : [500,"Unable to update please try after some time"],
	"invalid_action"											: [400,"The action you are going to perform is invalid or expired"],
	
};

module.exports = errors; 