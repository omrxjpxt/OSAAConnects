import { NextRequest, NextResponse } from "next/server";

// Rate limiting store (in production use Redis/Upstash)
const ipHits = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 60_000; // 1 minute
  const max = 5;

  const record = ipHits.get(ip);
  if (!record || now > record.reset) {
    ipHits.set(ip, { count: 1, reset: now + window });
    return true;
  }
  if (record.count >= max) return false;
  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot check
  if (body.honeypot) {
    return NextResponse.json({ ok: true }); // silently swallow bot submission
  }

  // Basic required-field validation
  const required = ["name", "igHandle", "igLink", "followers", "avgReelViews", "niche", "email", "consent"];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  const results: Record<string, string> = {};

  // ─── 1. Push to Google Sheets ─────────────────────────────────────────────
  try {
    if (process.env.GOOGLE_SHEETS_SPREADSHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      const { google } = await import("googleapis");
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
      const sheets = google.sheets({ version: "v4", auth });
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
        range: "Creators!A1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[
            new Date().toISOString(),
            body.name,
            body.igHandle,
            body.igLink,
            body.followers,
            body.avgReelViews,
            body.niche,
            body.sampleRate,
            body.country,
            body.phone,
            body.email,
            body.mediaUrl || "",
          ]],
        },
      });
      results.sheets = "ok";
    }
  } catch (err) {
    console.error("Sheets error:", err);
    results.sheets = "error";
  }

  // ─── 2. Slack webhook ─────────────────────────────────────────────────────
  try {
    if (process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🎉 *New Creator Application*\n*Name:* ${body.name}\n*Handle:* @${body.igHandle}\n*Niche:* ${body.niche}\n*Followers:* ${Number(body.followers).toLocaleString()}\n*Email:* ${body.email}`,
        }),
      });
      results.slack = "ok";
    }
  } catch (err) {
    console.error("Slack error:", err);
    results.slack = "error";
  }

  // ─── 3. Email notification ────────────────────────────────────────────────
  try {
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.EMAIL_FROM || "hello@osaaconnects.com",
        to: process.env.EMAIL_TO || "osaaconnects@gmail.com",
        subject: `New Creator Application: ${body.name} (@${body.igHandle})`,
        html: `
          <h2>New Creator Application</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Handle:</strong> @${body.igHandle}</p>
          <p><strong>IG Link:</strong> <a href="${body.igLink}">${body.igLink}</a></p>
          <p><strong>Followers:</strong> ${Number(body.followers).toLocaleString()}</p>
          <p><strong>Avg Reel Views:</strong> ${Number(body.avgReelViews).toLocaleString()}</p>
          <p><strong>Niche:</strong> ${body.niche}</p>
          <p><strong>Sample Rate:</strong> ${body.sampleRate}</p>
          <p><strong>Country:</strong> ${body.country}</p>
          <p><strong>Phone:</strong> ${body.phone}</p>
          <p><strong>Email:</strong> ${body.email}</p>
        `,
      });
      results.email = "ok";
    }
  } catch (err) {
    console.error("Email error:", err);
    results.email = "error";
  }

  // ─── 4. CMS Entry (Sanity) ────────────────────────────────────────────────
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.SANITY_API_TOKEN) {
      const { createClient } = await import("@sanity/client");
      const client = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
        apiVersion: "2024-01-01",
        token: process.env.SANITY_API_TOKEN,
        useCdn: false,
      });
      await client.create({
        _type: "creator",
        name: body.name,
        handle: body.igHandle,
        igLink: body.igLink,
        followers: Number(body.followers),
        avgViews: Number(body.avgReelViews),
        niches: [body.niche],
        email: body.email,
        phone: body.phone,
        location: body.country,
        availability: true,
      });
      results.sanity = "ok";
    }
  } catch (err) {
    console.error("Sanity error:", err);
    results.sanity = "error";
  }

  return NextResponse.json({ ok: true, results });
}
