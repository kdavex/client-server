import { MongoClient } from "mongodb";
import path from "node:path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(import.meta.dirname, "../.env") });
export class MongodbInstane {
    static client = new MongoClient(process.env.DATABASE_URL);
    static dbInstance;
    async getDbInstance() {
        if (!MongodbInstane.dbInstance) {
            MongodbInstane.dbInstance = await (await MongodbInstane.client.connect()).db(process.env.DATABASE_NAME);
            console.log("Database Connected");
            // MongodbInstane.dbInstance = MongodbInstane.client.db("uniwood");
        }
        return MongodbInstane.dbInstance;
    }
}
