import { Handlers } from "$fresh/server.ts";
const kv = await Deno.openKv();

export const handler: Handlers = {
  GET(_req) {
    const uuid = crypto.randomUUID();
    return new Response(JSON.stringify(uuid), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async POST(req, _ctx) {
    const user = (await req.json());
    const userKey = ["user", user.id];
    const ok = await kv.atomic().set(userKey, user).commit();
    if (!ok) throw new Error("Something went wrong.");
    return new Response(JSON.stringify(user));
  },
};

// export const handler: Handlers<User | null> = {
//   async POST(req, _ctx) {
//     const user = (await req.json()) as User;
//     const userKey = ["user", user.id];
//     const ok = await kv.atomic().set(userKey, user).commit();
//     if (!ok) throw new Error("Something went wrong.");
//     return new Response(JSON.stringify(user));
//   },
// };