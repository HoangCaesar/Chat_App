export interface Server {
    name: string;
    creator: string;
}

export interface ServerListResponse {
    status: string;
    servers: any;
}

export interface ServerResponse {
    status: string;
    server: any;
}