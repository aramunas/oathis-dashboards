"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1000,
    max: 5,
    keyGenerator: (req) => {
        const oathisReq = req;
        return oathisReq.subjectId || req.header('x-forwarded-for') || req.socket.remoteAddress || 'unknown';
    },
    message: 'Too many requests, please try again later.',
    validate: { trustProxy: false, xForwardedForHeader: false }
});
