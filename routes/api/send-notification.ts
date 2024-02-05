import { Handlers } from "$fresh/server.ts";

import webpush from "npm:web-push";

const kv = await Deno.openKv();

const vapidKeys = {
  publicKey:
    "BIi9GjSGel5aIVT658P8WxH-v7aZ-1efWJqHSHV5SKvpsYbhfQwUHSQxpZYwohXPaNz3KfTRRyNFRc0TJATzCxA",
  privateKey: "V4NCU20zObeshAX1Mk8QbOBjg_Fb4uor2JfJLhy6rPE",
};

//setting our previously generated VAPID keys
webpush.setVapidDetails(
  "mailto:myuserid@email.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend = "Hello!") => {
  webpush.sendNotification(subscription, dataToSend);
};

export const handler: Handlers = {
  async GET(_req) {
    const uuid = crypto.randomUUID();
    // Get the subscription from the database
    const subscription = await kv.get(["subscription", "ada"]);
    console.log(JSON.stringify(subscription.value));
    sendNotification(JSON.stringify(subscription.value), "HELLO WORLD!!!!");
    return new Response(JSON.stringify(uuid), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
