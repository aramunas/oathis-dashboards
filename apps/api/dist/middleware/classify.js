"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataClassifier = void 0;
const dataClassifier = (req, res, next) => {
    const oathisReq = req;
    oathisReq.classification = 'PHI';
    next();
};
exports.dataClassifier = dataClassifier;
