import { google } from "googleapis";
import { ENV } from "../_core/env";

let sheetsClient: ReturnType<typeof google.sheets> | null = null;
let driveClient: ReturnType<typeof google.drive> | null = null;

/**
 * Initialize Google Sheets and Drive clients
 */
function initializeGoogleClients() {
  if (sheetsClient && driveClient) {
    return { sheetsClient, driveClient };
  }

  try {
    const credentials = JSON.parse(ENV.googleServiceAccountKey);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
      ],
    });

    sheetsClient = google.sheets({ version: "v4", auth });
    driveClient = google.drive({ version: "v3", auth });

    console.log("[Google Sheets] Clients initialized successfully");
    return { sheetsClient, driveClient };
  } catch (error) {
    console.error("[Google Sheets] Failed to initialize clients:", error);
    throw new Error("Failed to initialize Google Sheets clients");
  }
}

/**
 * Create a new Google Sheets spreadsheet
 */
export async function createSpreadsheet(title: string): Promise<string> {
  try {
    const { sheetsClient } = initializeGoogleClients();

    const response = await sheetsClient.spreadsheets.create({
      requestBody: {
        properties: {
          title,
        },
        sheets: [
          {
            properties: {
              sheetId: 0,
              title: "Заявки",
            },
          },
        ],
      },
    });

    const spreadsheetId = response.data.spreadsheetId;
    if (!spreadsheetId) {
      throw new Error("No spreadsheet ID returned");
    }

    console.log(`[Google Sheets] Created spreadsheet: ${spreadsheetId}`);

    // Add headers
    await addHeaders(spreadsheetId);

    // Share with the service account email (read-only for now)
    await shareSpreadsheet(spreadsheetId);

    return spreadsheetId;
  } catch (error) {
    console.error("[Google Sheets] Failed to create spreadsheet:", error);
    throw error;
  }
}

/**
 * Add headers to the spreadsheet
 */
async function addHeaders(spreadsheetId: string): Promise<void> {
  try {
    const { sheetsClient } = initializeGoogleClients();

    const headers = [
      ["Дата", "Время", "Имя", "Контакт", "Оборот бизнеса", "Ситуация", "ID заявки"],
    ];

    await sheetsClient.spreadsheets.values.update({
      spreadsheetId,
      range: "'Заявки'!A1:G1",
      valueInputOption: "RAW",
      requestBody: {
        values: headers,
      },
    });

    console.log("[Google Sheets] Headers added to spreadsheet");
  } catch (error) {
    console.error("[Google Sheets] Failed to add headers:", error);
    throw error;
  }
}

/**
 * Share spreadsheet with the service account
 */
async function shareSpreadsheet(spreadsheetId: string): Promise<void> {
  try {
    const { driveClient } = initializeGoogleClients();

    await driveClient.permissions.create({
      fileId: spreadsheetId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    console.log("[Google Sheets] Spreadsheet shared");
  } catch (error) {
    console.error("[Google Sheets] Failed to share spreadsheet:", error);
    // Don't throw - sharing is not critical
  }
}

/**
 * Append a row to the spreadsheet
 */
export async function appendRow(
  spreadsheetId: string,
  data: {
    name: string;
    contact: string;
    revenue: string;
    situation: string;
    timestamp: string;
  }
): Promise<void> {
  try {
    const { sheetsClient } = initializeGoogleClients();

    const date = new Date(data.timestamp);
    const dateStr = date.toLocaleDateString("ru-RU");
    const timeStr = date.toLocaleTimeString("ru-RU");
    const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const row = [
      [
        dateStr,
        timeStr,
        data.name,
        data.contact,
        data.revenue,
        data.situation,
        requestId,
      ],
    ];

    await sheetsClient.spreadsheets.values.append({
      spreadsheetId,
      range: "'Заявки'!A:G",
      valueInputOption: "RAW",
      requestBody: {
        values: row,
      },
    });

    console.log(`[Google Sheets] Row appended: ${requestId}`);
  } catch (error) {
    console.error("[Google Sheets] Failed to append row:", error);
    throw error;
  }
}

/**
 * Get spreadsheet URL
 */
export function getSpreadsheetUrl(spreadsheetId: string): string {
  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
}
