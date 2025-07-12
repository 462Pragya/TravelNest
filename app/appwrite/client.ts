import { Account, Client, Databases, Storage } from 'appwrite';
export const appwriteConfig = {
    endpoint: import.meta.env.VITE_APPWRITE_API_ENDPOINT,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    apiKey: import.meta.env.VITE_APPWRITE_API_KEY,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    tripsCollectionId: import.meta.env.VITE_APPWRITE_TRIPS_COLLECTION_ID
}

const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setLocale('en') // optional
    .setSession('cookie'); // ✅ Add this line for session-based auth

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);



export { client, account, database, storage };