import { Handlers } from "$fresh/server.ts";
import { ulid } from "https://deno.land/x/ulid/mod.ts";
import { wipeKvStore } from "https://deno.land/x/kv_utils/mod.ts";

const kv = await Deno.openKv();

export const handler: Handlers = {
  GET(_req) {
    const uuid = crypto.randomUUID();
    return new Response(JSON.stringify(uuid), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async POST(req) {
    console.log("POST request received");

    // await wipeKvStore();

    // Store the subscription in the database
    const subscription = await req.json();
    await kv.set(["subscription", ulid()], subscription);

    console.log("Subscription saved to database", subscription);

    const entries = kv.list({ prefix: ["subscription"] });

    for await (const entry of entries) {
      console.log(entry.key);
      console.log(entry.value);
      console.log(entry.versionstamp);
    }

    return new Response(JSON.stringify({ json: subscription }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};

// const express = require('express')
// const cors = require('cors')
// const bodyParser = require('body-parser')const app = express()
// app.use(cors())
// app.use(bodyParser.json())const port = 4000app.get('/', (req, res) => res.send('Hello World!'))
// const dummyDb = { subscription: null } //dummy in memory storeconst saveToDatabase = async subscription => {
//   // Since this is a demo app, I am going to save this in a dummy in memory store. Do not do this in your apps.
//   // Here you should be writing your db logic to save it.
//   dummyDb.subscription = subscription
// }// The new /save-subscription endpoint
// app.post('/save-subscription', async (req, res) => {
//   const subscription = req.body
//   await saveToDatabase(subscription) //Method to save the subscription to Database
//   res.json({ message: 'success' })
// })app.listen(port, () => console.log(`Example app listening on port ${port}!`))
