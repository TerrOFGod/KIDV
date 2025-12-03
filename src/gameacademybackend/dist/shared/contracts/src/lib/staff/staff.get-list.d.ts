export declare namespace StaffGetList {
    const topic = "staff.get-list.query";
    class Request {
        position?: string;
        researchPosition?: string;
    }
    class Response {
        staff: Array<{
            _id?: string;
            name: string;
            positions: Array<{
                type: string;
                value: string;
            }>;
            educationLevel: string;
            researchPosition: string;
            photo?: string;
            bio?: string;
            stats?: Array<{
                label: string;
                value: number;
            }>;
            skills?: Array<{
                name: string;
                level: string;
                description?: string;
                subskills?: Array<{
                    name: string;
                    description?: string;
                }>;
            }>;
            achievements?: Array<{
                title: string;
                icon: string;
                description: string;
            }>;
            tags?: string[];
            contact?: Array<{
                title: string;
                value: string;
            }>;
        }>;
    }
}
