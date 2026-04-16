"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oathisStack = exports.heartbeatVerifier = exports.federationRouter = exports.policyBinder = exports.resolveSubject = exports.clerkJWTVerify = void 0;
const express_1 = require("@clerk/express");
const classify_1 = require("./classify");
const validate_1 = require("./validate");
const audit_1 = require("./audit");
const rate_limit_1 = require("./rate-limit");
exports.clerkJWTVerify = [
    (0, express_1.clerkMiddleware)(),
    (0, express_1.requireAuth)()
];
const resolveSubject = (req, res, next) => {
    const auth = req.auth;
    const subjectId = auth?.userId || auth?.subject;
    if (!subjectId) {
        res.status(401).json({ error: 'Unauthorized: Missing user ID' });
        return;
    }
    req.subjectId = subjectId;
    next();
};
exports.resolveSubject = resolveSubject;
const policyBinder = (req, res, next) => {
    console.log("[OATHIS] PP-1 slot: not yet implemented");
    next();
};
exports.policyBinder = policyBinder;
const federationRouter = (req, res, next) => {
    console.log("[OATHIS] PP-4 slot: not yet implemented");
    next();
};
exports.federationRouter = federationRouter;
const heartbeatVerifier = (req, res, next) => {
    console.log("[OATHIS] PP-5 slot: not yet implemented");
    next();
};
exports.heartbeatVerifier = heartbeatVerifier;
exports.oathisStack = [
    ...exports.clerkJWTVerify,
    exports.resolveSubject,
    rate_limit_1.rateLimiter,
    classify_1.dataClassifier,
    validate_1.schemaValidator,
    audit_1.auditLogger,
    exports.policyBinder,
    exports.federationRouter,
    exports.heartbeatVerifier,
];
