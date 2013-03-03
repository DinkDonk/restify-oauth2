"use strict";

var restify = require("restify");

function setUnauthorizedHeaders(res, options) {
    res.header("WWW-Authenticate", "Bearer realm=\"" + options.wwwAuthenticateRealm + "\"");
    res.header("Link", "<" + options.tokenEndpoint + ">; rel=\"oauth2-token\"");
}

exports.sendWithUnauthorizedHeaders = function (error, res, next, options) {
    if (error.statusCode === 401) {
        setUnauthorizedHeaders(res, options);
    }

    next(error);
};

exports.tokenRequired = function (res, next, options, message) {
    if (message === undefined) {
        message = "Bearer token required. Follow the oauth2-token link to get one!";
    }

    exports.sendWithUnauthorizedHeaders(new restify.UnauthorizedError(message), res, next, options);
};

exports.tokenInvalid = function (res, next, options, message) {
    if (message === undefined) {
        message = "Bearer token invalid. Follow the oauth2-token link to get a valid one!";
    }

    exports.sendWithUnauthorizedHeaders(new restify.UnauthorizedError(message), res, next, options);
};
