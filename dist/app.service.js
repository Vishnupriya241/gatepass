"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("./database");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    getGatepassSummary() {
        const fallbackRequests = [
            {
                id: 1,
                applicantName: 'Asha Rao',
                department: 'Operations',
                purpose: 'Vendor visit',
                vehicleNo: 'KA-01-2345',
                contactNumber: '9876543210',
                status: 'Approved',
            },
            {
                id: 2,
                applicantName: 'Ravi Kumar',
                department: 'Security',
                purpose: 'Delivery pickup',
                vehicleNo: 'KA-05-9876',
                contactNumber: '9123456780',
                status: 'Pending',
            },
        ];
        const fallback = {
            summary: {
                approved: fallbackRequests.filter((request) => request.status === 'Approved').length,
                pending: fallbackRequests.filter((request) => request.status === 'Pending').length,
                rejected: fallbackRequests.filter((request) => request.status === 'Rejected').length,
                profile: {
                    name: 'Guest User',
                    role: 'Viewer',
                },
            },
            requests: fallbackRequests,
        };
        try {
            const tables = database_1.database
                .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name IN ('users', 'gatepass_request')")
                .all();
            const hasUsersTable = tables.some((table) => table.name === 'users');
            const hasGatepassTable = tables.some((table) => table.name === 'gatepass_request');
            if (!hasUsersTable || !hasGatepassTable) {
                return fallback;
            }
            const userRow = database_1.database.prepare('SELECT name, role FROM users ORDER BY id DESC LIMIT 1').get();
            const approvedCount = database_1.database.prepare('SELECT COUNT(*) as count FROM gatepass_request WHERE status = ?').get('approved');
            const pendingCount = database_1.database.prepare('SELECT COUNT(*) as count FROM gatepass_request WHERE status = ?').get('pending');
            const rejectedCount = database_1.database.prepare('SELECT COUNT(*) as count FROM gatepass_request WHERE status = ?').get('rejected');
            const requests = database_1.database
                .prepare('SELECT id, applicant_name as applicantName, department, purpose, vehicle_no as vehicleNo, contact_number as contactNumber, status FROM gatepass_request ORDER BY id DESC')
                .all();
            if (!requests.length) {
                return fallback;
            }
            return {
                summary: {
                    approved: approvedCount?.count ?? 0,
                    pending: pendingCount?.count ?? 0,
                    rejected: rejectedCount?.count ?? 0,
                    profile: {
                        name: userRow?.name ?? 'Guest User',
                        role: userRow?.role ?? 'Viewer',
                    },
                },
                requests,
            };
        }
        catch {
            return fallback;
        }
    }
    createGatepassRequest(data) {
        const insert = database_1.database.prepare(`
      INSERT INTO gatepass_request (
        applicant_name,
        department,
        purpose,
        vehicle_no,
        contact_number,
        status
      ) VALUES (?, ?, ?, ?, ?, ?)
    `);
        const result = insert.run(data.applicantName, data.department, data.purpose, data.vehicleNo, data.contactNumber, 'Pending');
        return {
            id: result.lastInsertRowid,
            ...data,
            status: 'Pending',
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map