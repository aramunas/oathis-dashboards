"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidator = void 0;
const schemaValidator = (req, res, next) => {
    // Demo validation, just pass through for now
    if (req.method === 'POST' && !req.body) {
        res.status(400).json({ error: 'Body required' });
        return;
    }
    next();
};
exports.schemaValidator = schemaValidator;
