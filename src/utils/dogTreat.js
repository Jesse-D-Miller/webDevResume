export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const params = new URLSearchParams({
    token: process.env.PUSHOVER_APP_TOKEN,
    user: process.env.PUSHOVER_USER_KEY,
    message: "Give Finnegan a treat!",
    title: "Dog Treat Reminder",
  });

  const resp = await fetch("https://api.pushover.net/1/messages.json", {
    method: "POST",
    body: params,
  });

  if (!resp.ok) return res.status(500).json({ ok: false });
  return res.status(200).json({ ok: true });
}