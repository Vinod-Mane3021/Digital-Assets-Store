import express from "express";
import { Keys } from "./constants/keys";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./utils/next-utils";
import next from "next";

const app = express();

const PORT = Keys.PORT;

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL}`);
      },
    },
  });

  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js started");

    app.listen(PORT, async () => {
      payload.logger.info(`Next.js App URL ${Keys.NEXT_PUBLIC_SERVER_URL}`)
    })
  })

};
