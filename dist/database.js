"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const Database = require("better-sqlite3");
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const dbPath = path_1.default.join(os_1.default.homedir(), "Documents", "vishnudb.db");
const db = new Database(dbPath);
console.log("✅ Connected successfully");
console.log("Database path:", dbPath);
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log("Tables:", tables);
exports.database = db;
//# sourceMappingURL=database.js.map