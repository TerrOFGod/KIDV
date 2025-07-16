import 'multer';
export declare namespace GameCreate {
    const topic = "game.create.command";
    class Request {
        title: string;
        description: string;
        gameBuffer: Buffer;
        models?: Express.Multer.File[];
    }
    class Response {
        gameId: string;
    }
}
