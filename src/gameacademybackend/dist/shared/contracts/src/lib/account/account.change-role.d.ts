import { IUser, UserRole } from '@shared/interfaces';
export declare namespace AccountChangeRole {
    const topic = "account.change-role.command";
    class Request {
        email: string;
        newRole: UserRole;
    }
    class Response {
        profile: Omit<IUser, 'passwordHash'>;
    }
}
