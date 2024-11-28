import { Client, Databases, Account } from "appwrite";
const apiEndPoint: string = import.meta.env.VITE_END_POINT as string;
const apiProject: string = import.meta.env.VITE_PROJECT as string;

const client: Client = new Client();

client.setEndpoint(apiEndPoint).setProject(apiProject);

export const account: Account = new Account(client);
export const database: Databases = new Databases(client);
export const databaseId: string = import.meta.env.VITE_DATABASE_ID as string;
export const collectionIdDishes: string = import.meta.env
  .VITE_COLLECTION_ID_DISH as string;
export const collectionIdUserDish: string = import.meta.env
  .VITE_COLLECTION_ID_USER_DISH as string;
export const collectionIdSubmitRecipe: string = import.meta.env
  .VITE_COLLECTION_ID_SUBMIT_RECIPE as string;
