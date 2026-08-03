// Sdílené úložiště pro demo verzi PORT.
// GET  -> vrátí aktuální sdílený stav (nebo null, pokud ještě žádný není)
// POST -> uloží nový stav (přepíše celý objekt) a vrátí timestamp uložení
import { getStore } from "@netlify/blobs";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });

  const store = getStore({ name: "port-data", consistency: "strong" });

  if (req.method === "GET") {
    const data = await store.get("state", { type: "json" });
    return new Response(JSON.stringify(data || null), {
      headers: { "Content-Type": "application/json", ...CORS },
    });
  }

  if (req.method === "POST") {
    const body = await req.json();
    body.updatedAt = Date.now();
    await store.setJSON("state", body);
    return new Response(JSON.stringify({ ok: true, updatedAt: body.updatedAt }), {
      headers: { "Content-Type": "application/json", ...CORS },
    });
  }

  return new Response("Method not allowed", { status: 405, headers: CORS });
};
