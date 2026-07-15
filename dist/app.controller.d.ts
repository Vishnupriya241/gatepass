import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getGatepassSummary(): {
        summary: {
            approved: number;
            pending: number;
            rejected: number;
            profile: {
                name: string;
                role: string;
            };
        };
        requests: {
            id: number;
            applicantName: string;
            department: string;
            purpose: string;
            vehicleNo: string;
            contactNumber: string;
            status: string;
        }[];
    };
    createGatepassRequest(body: Record<string, string>): {
        status: string;
        applicantName: string;
        department: string;
        purpose: string;
        vehicleNo: string;
        contactNumber: string;
        id: any;
    };
}
