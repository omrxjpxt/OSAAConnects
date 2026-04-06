import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.honeypot) return NextResponse.json({ ok: true });

  const required = ["brandName", "website", "brief", "targetAudience", "budget", "timeline", "contactName", "contactEmail"];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `Missing: ${field}` }, { status: 400 });
    }
  }

  const results: Record<string, string> = {};

  // ─── 1. Google Sheets ────────────────────────────────────────────────────
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
        range: "Brands!A1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[
            new Date().toISOString(),
            body.brandName,
            body.website,
            body.brief,
            body.targetAudience,
            body.budget,
            body.timeline,
            body.contactName,
            body.contactEmail,
            body.contactPhone || "",
          ]],
        },
      });
      results.sheets = "ok";
    }
  } catch (err) {
    console.error("Sheets error:", err);
    results.sheets = "error";
  }

  // ─── 2. Slack ────────────────────────────────────────────────────────────
  try {
    if (process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `💼 *New Brand Inquiry*\n*Brand:* ${body.brandName}\n*Website:* ${body.website}\n*Budget:* ${body.budget}\n*Timeline:* ${body.timeline}\n*Contact:* ${body.contactName} (${body.contactEmail})`,
        }),
      });
      results.slack = "ok";
    }
  } catch (err) {
    console.error("Slack error:", err);
    results.slack = "error";
  }

  // ─── 3. Email ─────────────────────────────────────────────────────────────
  try {
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.EMAIL_FROM || "hello@osaaconnects.com",
        to: process.env.EMAIL_TO || "osaaconnects@gmail.com",
        subject: `New Brand Inquiry: ${body.brandName}`,
        html: `
          <h2>New Brand Inquiry</h2>
          <p><strong>Brand:</strong> ${body.brandName}</p>
          <p><strong>Website:</strong> <a href="${body.website}">${body.website}</a></p>
          <p><strong>Brief:</strong> ${body.brief}</p>
          <p><strong>Target Audience:</strong> ${body.targetAudience}</p>
          <p><strong>Budget:</strong> ${body.budget}</p>
          <p><strong>Timeline:</strong> ${body.timeline}</p>
          <p><strong>Contact:</strong> ${body.contactName} — ${body.contactEmail} ${body.contactPhone ? `(${body.contactPhone})` : ""}</p>
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
        _type: "brand",
        brandName: body.brandName,
        website: body.website,
        contactEmail: body.contactEmail,
        contactPhone: body.contactPhone,
        notes: `Brief: ${body.brief}\nAudience: ${body.targetAudience}\nBudget: ${body.budget}\nTimeline: ${body.timeline}`,
      });
      results.sanity = "ok";
    }
  } catch (err) {
    console.error("Sanity error:", err);
    results.sanity = "error";
  }

  return NextResponse.json({ ok: true, results });
}
