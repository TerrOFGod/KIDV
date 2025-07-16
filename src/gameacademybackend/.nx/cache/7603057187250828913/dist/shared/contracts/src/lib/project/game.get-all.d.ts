export declare namespace GameGetAll {
    const topic = "game.get-all.query";
    class Request {
    }
    class Response {
        games: {
            gameId: string;
            title: string;
            url: string;
        }[];
    }
}
