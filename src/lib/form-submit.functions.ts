import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SHEET_ID = "1poCKXPusDQ-bXZBN1Kff2s9eRup_ozGYim5E-H02uPI";
const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";

const TAB_HEADERS: Record<string, string[]> = {
  "Request a Call": [
    "Timestamp",
    "Full Name",
    "Complete Address",
    "MP",
    "Question or Idea",
    "Email",
    "Phone",
    "Best Time to Reach",
    "Notes",
  ],
  Volunteer: ["Timestamp", "Full Name", "Email", "Constituency", "Role", "Notes"],
  "MP Partnership": ["Timestamp", "Name", "Role / Office", "Constituency", "Email", "Message"],
};

async function gatewayFetch(path: string, init: RequestInit = {}) {
  const lovableKey = process.env.LOVABLE_API_KEY!;
  const connectionKey = process.env.GOOGLE_SHEETS_API_KEY!;
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${lovableKey}`);
  headers.set("X-Connection-Api-Key", connectionKey);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const res = await fetch(`${GATEWAY}${path}`, { ...init, headers });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sheets API ${res.status}: ${body}`);
  }
  return res.json();
}

async function ensureTab(tabName: string) {
  const meta = await gatewayFetch(
    `/spreadsheets/${SHEET_ID}?fields=sheets.properties.title`,
  );
  const titles: string[] = (meta.sheets ?? []).map(
    (s: { properties: { title: string } }) => s.properties.title,
  );
  if (titles.includes(tabName)) return;

  await gatewayFetch(`/spreadsheets/${SHEET_ID}:batchUpdate`, {
    method: "POST",
    body: JSON.stringify({
      requests: [{ addSheet: { properties: { title: tabName } } }],
    }),
  });

  const header = TAB_HEADERS[tabName];
  if (header) {
    await gatewayFetch(
      `/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(tabName)}!A1:append?valueInputOption=RAW`,
      {
        method: "POST",
        body: JSON.stringify({ values: [header] }),
      },
    );
  }
}

async function appendRow(tabName: string, row: (string | number)[]) {
  await ensureTab(tabName);
  await gatewayFetch(
    `/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(tabName)}!A1:append?valueInputOption=RAW`,
    {
      method: "POST",
      body: JSON.stringify({ values: [row] }),
    },
  );
}

const requestCallSchema = z.object({
  fullName: z.string().trim().min(1).max(200),
  address: z.string().trim().min(1).max(500),
  mp: z.string().trim().min(1).max(200),
  question: z.string().trim().min(1).max(2000),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(1).max(50),
  bestTime: z.string().trim().min(1).max(100),
  timeNote: z.string().trim().max(500).optional().default(""),
});

export const submitRequestCall = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => requestCallSchema.parse(data))
  .handler(async ({ data }) => {
    await appendRow("Request a Call", [
      new Date().toISOString(),
      data.fullName,
      data.address,
      data.mp,
      data.question,
      data.email,
      data.phone,
      data.bestTime,
      data.timeNote,
    ]);
    return { ok: true };
  });

const volunteerSchema = z.object({
  fullName: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(255),
  constituency: z.string().trim().min(1).max(200),
  role: z.string().trim().min(1).max(200),
  notes: z.string().trim().max(1000).optional().default(""),
});

export const submitVolunteer = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => volunteerSchema.parse(data))
  .handler(async ({ data }) => {
    await appendRow("Volunteer", [
      new Date().toISOString(),
      data.fullName,
      data.email,
      data.constituency,
      data.role,
      data.notes,
    ]);
    return { ok: true };
  });

const partnershipSchema = z.object({
  name: z.string().trim().min(1).max(200),
  role: z.string().trim().min(1).max(200),
  constituency: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

export const submitPartnership = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => partnershipSchema.parse(data))
  .handler(async ({ data }) => {
    await appendRow("MP Partnership", [
      new Date().toISOString(),
      data.name,
      data.role,
      data.constituency,
      data.email,
      data.message,
    ]);
    return { ok: true };
  });
