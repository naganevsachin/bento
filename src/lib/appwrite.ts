import { Client, Databases, Account } from "appwrite";
const apiEndPoint: string = import.meta.env.VITE_END_POINT as string;
const apiProject: string = import.meta.env.VITE_PROJECT as string;


const client: Client = new Client();

client
    .setEndpoint(apiEndPoint)
    .setProject(apiProject);

export const account: Account = new Account(client);
export const database: Databases = new Databases(client);