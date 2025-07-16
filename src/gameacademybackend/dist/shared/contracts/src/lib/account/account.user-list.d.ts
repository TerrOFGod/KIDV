export declare namespace UserList {
    const topic = "users.list";
    type Request = {};
    type Response = {
        users: {
            email: string;
            displayName: string;
            role: string;
        }[];
    };
}
