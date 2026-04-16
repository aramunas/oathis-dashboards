"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyClerk = void 0;
const express_1 = require("@clerk/express");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../../../.env.shared') });
}
dotenv_1.default.config();
// Export the middleware stack for Clerk
// Note: Requires CLERK_SECRET_KEY or CLERK_PUBLISHABLE_KEY to be set in environment
exports.verifyClerk = [
    (0, express_1.clerkMiddleware)(),
    (0, express_1.requireAuth)()
];
