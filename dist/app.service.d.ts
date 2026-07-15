export declare class AppService {
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
    createGatepassRequest(data: {
        applicantName: string;
        department: string;
        purpose: string;
        vehicleNo: string;
        contactNumber: string;
    }): {
        status: string;
        applicantName: string;
        department: string;
        purpose: string;
        vehicleNo: string;
        contactNumber: string;
        id: any;
    };
}
