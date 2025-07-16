import { IUser } from '@shared/interfaces';
export declare namespace AccountUserInfo {
    const topic = "account.user-info.query";
    class Request {
        id: string;
    }
    class Response {
        profile: Omit<IUser, 'passwordHash'>;
    }
}
