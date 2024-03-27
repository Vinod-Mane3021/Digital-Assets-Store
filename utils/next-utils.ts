import { Keys } from "@/constants/keys";
import next from "next";

export const nextApp = next({
    dev: process.env.NODE_ENV != "production",
    port: Keys.PORT
})

/**
 * handler next.js logic
 * if we want to self host next.js app
 */
export const nextHandler = nextApp.getRequestHandler();