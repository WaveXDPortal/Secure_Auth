/*Copyright (c) 2022-2023 wavemaker.com All Rights Reserved.This software is the confidential and proprietary information of wavemaker.com You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the source code license agreement you entered into with wavemaker.com*/
package com.wavemaker.secureauth.callservice;

import jakarta.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;


import com.wavemaker.runtime.security.SecurityService;
import com.wavemaker.runtime.service.annotations.ExposeToClient;
import com.wavemaker.runtime.service.annotations.HideFromClient;
import javax.net.ssl.SSLContext;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Value;
import com.secureauth.exceptions.ApiRequestException;
import com.secureauth.utils.BaseService;
import com.secureauth.utils.StandardResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.core.type.TypeReference;  
 

//import com.wavemaker.secureauth.callservice.model.*;

/**
 * This is a singleton class with all its public methods exposed as REST APIs via generated controller class.
 * To avoid exposing an API for a particular public method, annotate it with @HideFromClient.
 *
 * Method names will play a major role in defining the Http Method for the generated APIs. For example, a method name
 * that starts with delete/remove, will make the API exposed as Http Method "DELETE".
 *
 * Method Parameters of type primitives (including java.lang.String) will be exposed as Query Parameters &
 * Complex Types/Objects will become part of the Request body in the generated API.
 *
 * NOTE: We do not recommend using method overloading on client exposed methods.
 */
@ExposeToClient
public class CallService extends BaseService{

    private static final Logger logger = LoggerFactory.getLogger(CallService.class);

    @Autowired
    private SecurityService securityService;

    /**
     * This is sample java operation that accepts an input from the caller and responds with "Hello".
     *
     * SecurityService that is Autowired will provide access to the security context of the caller. It has methods like isAuthenticated(),
     * getUserName() and getUserId() etc which returns the information based on the caller context.
     *
     * Methods in this class can declare HttpServletRequest, HttpServletResponse as input parameters to access the
     * caller's request/response objects respectively. These parameters will be injected when request is made (during API invocation).
     */
    public String sampleJavaOperation(String name, HttpServletRequest request) {
        logger.debug("Starting sample operation with request url " + request.getRequestURL().toString());
        
        String result = null;
        if (securityService.isAuthenticated()) {
            result = "Hello " + name + ", You are logged in as "+  securityService.getLoggedInUser().getUserName();
        } else {
            result = "Hello " + name + ", You are not authenticated yet!";
        }
        logger.debug("Returning {}", result);
        return result;
    }
    public ResponseEntity<StandardResponse> callVerifyMethod(JsonNode jsonNode,HttpServletRequest request){
        logger.info("callVerifyMethod  method started"+request.getRequestURL().toString());
//         {
// 	"api_uri":"https://nac-mountebankapi.wavemakeronline.com/verify",
// 	"api_host":"number-verification.nokia.rapidapi.com",
//  "api_key":"bd84b964f1msh0c3b3fb3e781d61p1c78c2jsnb366b5862354"
// 	"api_header":{
//  "Content-type":"application/json"
// 	"authorization":"test",
// 	"X-Correlator":"test",
// 	"X-RapidAPI-Key":"bd84b964f1msh0c3b3fb3e781d61p1c78c2jsnb366b5862354",
// 	"X-RapidAPI-Host":"number-verification.nokia.rapidapi.com"
// 	},
// 	"request_body":{
//           "phoneNumber": "1234567890",
//           "hashedPhoneNumber": "U2FsdGVkX1+4lld4A/RIOU55UHsAU6IGZSBbPmH6Gig="
//         },
//     request_params:{

//     },
//     "method_type":"POST",
//     "step_title":"Number Verification",
//     "step_Icon_Progress":"wi wi-person",
//     "step_Icon_done":"wi wi-person"
// }
        String api_URI=jsonNode.get("api_uri").asText();
        logger.info("uri"+api_URI);
        String api_HOST=jsonNode.get("api_host").asText();
        logger.info("api_HOST"+api_HOST);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode apiheaderjson=jsonNode.get("api_header");
        logger.info("apiheaderjson"+apiheaderjson);
        String apiKey=jsonNode.get("api_key").asText();
        
        Map<String,String> headerMap = mapper.convertValue(apiheaderjson, new TypeReference<Map<String,String>>(){});
        JsonNode requestJson=jsonNode.get("request_body");
        String methodType=jsonNode.get("method_type").asText();
         try{
            SSLContext sslContext = createSSL();
            HttpClient httpClientSSL = createHttpClient(sslContext);
            
            JsonNode apiresponceNode= callApi(api_URI, api_HOST,httpClientSSL, methodType,apiKey, headerMap,requestJson);
            String step_title=jsonNode.get("step_name").asText();
            String verificationKey="";
            switch(step_title) {
                case "Number Verification":
                    verificationKey="devicePhoneNumberVerified";
                    break;
                case "SIM SWAP Verification":
                     verificationKey="swapped";
                    break;
                case "Device Location Verification":
                    verificationKey="verificationResult";
                    break;
               
            }
            String apiresponceNoderesult=apiresponceNode.get(verificationKey).asText();
            if(apiresponceNoderesult.equalsIgnoreCase("true")){

                return ResponseEntity.ok(new StandardResponse("success", " verified", apiresponceNode));
            }
            else{
                throw new Exception("error occured");
            }
           // return ResponseEntity.ok(new StandardResponse("success", " verified", apiresponceNode));
            
        } catch (Exception e) {
            return handleException(e);
        }
    }
    
    private ResponseEntity<StandardResponse> handleException(Exception e) {
        logger.error("Error occurred: {}", e.getMessage());
        if (e instanceof ApiRequestException) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new StandardResponse("error", e.getMessage(), null));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new StandardResponse("error", "Unexpected error occurred", null));
    }

}
