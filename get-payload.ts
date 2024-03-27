import dotenv from "dotenv";
import path from "path";
import type { InitOptions } from "payload/config";
import { Keys } from "./constants/keys";
import payload from "payload";

dotenv.config({
  path: path.resolve(__dirname, "./.env"),
});

// to get client use caching
let cached = (global as any).payload;

// if we don't have cached version fo cms
if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}

// get us access to db and where we handle authentication
export const getPayloadClient = async ({ initOptions }: Args = {}) => {
    if(!Keys.PAYLOAD_SECRET) {
        throw new Error("PAYLOAD_SECRET is missing");
    }

    if(cached.client) {
        return cached.client
    }
    
    if(!cached.promise) {
        cached.promise = payload.init({
            secret: Keys.PAYLOAD_SECRET,
            local: initOptions?.express ? false : true,
            ...(initOptions || {})
        });
    }

    try {
        cached.client = await cached.promise
    } catch (e: unknown) {
        cached.promise = null;
        throw e;
    }

    return cached.client;
};
