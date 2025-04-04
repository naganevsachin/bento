declare namespace NodeJS {
  interface ProcessEnv {
    VITE_END_POINT: string;
    VITE_PROJECT: string;
    VITE_DATABASE_ID: string;
    VITE_COLLECTION_ID_DISH: string;
    VITE_COLLECTION_ID_USER_DISH: string;
    VITE_COLLECTION_ID_SUBMIT_RECIPE: string;
    // Add more environment variables as needed
  }
}
