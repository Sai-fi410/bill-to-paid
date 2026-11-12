export const maxDuration = 60;

export async function POST(req) {
  const { image, mime } = await req.json();
  const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";
  let r;
  for (let n = 0; n < 4; n++) {
    r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${n === 3 && process.env.GEMINI_FALLBACK ? process.env.GEMINI_FALLBACK : model}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
    body: JSON.stringify({
      contents: [{ parts: [
        { text: 'Extract the invoice line items from this bill image. Return JSON only: {"customer":string,"items":[{"name":string,"quantity":number,"price":number}]}. price is the unit price in USD. If the bill shows only line totals, divide the line total by the quantity to get the unit price. Ignore subtotal, tax, tip and total lines.' },
        { inlineData: { mimeType: mime, data: image } },
      ] }],
      generationConfig: { responseMimeType: "application/json" },
    }),
    });
    if (r.status !== 503 && r.status !== 429) break;
    await new Promise(s => setTimeout(s, 1500));
  }
  const j = await r.json();
  console.log("GEMINI", r.status, JSON.stringify(j).slice(0, 600));
  const text = j?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return Response.json({ error: j?.error?.message || "No response from model" }, { status: 502 });
    try {
    return Response.json(JSON.parse(text.replace(/```json|```/g, "").trim()));
  } catch {
    return Response.json({ error: "Bad model output: " + text.slice(0, 200) }, { status: 502 });
  }
}