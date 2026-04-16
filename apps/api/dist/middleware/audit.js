"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogger = void 0;
const auditLogger = (req, res, next) => {
    const oathisReq = req;
    if (oathisReq.subjectId) {
        console.log(`[OATHIS] Audit Log: Subject ${oathisReq.subjectId} accessed ${req.method} ${req.path}`);
    }
    next();
};
exports.auditLogger = auditLogger;
