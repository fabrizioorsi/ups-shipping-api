var Api = require("api-request-simple");
const api_endpoints = require('./domain_knowledge/api_endpoints.json');

var UPS_Api = function(config){
    // validate the config
    if(typeof config != "object") throw new Error("config is required");
    if(typeof config.username != "string") throw new Error("username is required")
    if(typeof config.password != "string") throw new Error("password is required")
    if(typeof config.access_key != "string") throw new Error("access_key is required")

    // define the api
    this.mode = (config.live === true)?"live" : "sandbox"; // default to sandbox
    this.api = new Api({default : api_endpoints.hosts[this.mode]}, {ssl:true, json:true}); //ssl:true sets https as the default

    // define the authentication object
    this.authentication = {
        "UPSSecurity" : {
            "UsernameToken": {
                "Username": config.username,
                "Password": config.password
            },
            "ServiceAccessToken": {
                "AccessLicenseNumber": config.access_key,
            }
        },
    };
}
UPS_Api.prototype = {
    /**
        makes it simple to make authenticated get requests to the UPS server
        @param route - e.g., "/Rate"
        @param request - e.g., {RateRequst : { ... }}
    */
    post : async function(route, request){
        /*
            define constants
        */
        var final_request_object = Object.assign({}, this.authentication, request); // combine the objects

        /*
            fill request
        */
        var response = await this.api.post("default", route, final_request_object);

        /*
            return response
        */
        return response;
    },
}

module.exports = UPS_Api;
