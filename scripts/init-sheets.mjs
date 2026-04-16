import { google } from "googleapis";
import fs from "fs";
import path from "path";

const serviceAccountKey = JSON.parse(
  process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}"
);

if (!serviceAccountKey.private_key) {
  console.error("❌ GOOGLE_SERVICE_ACCOUNT_KEY environment variable not set");
  process.exit(1);
}

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccountKey,
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
  ],
});

const sheets = google.sheets({ version: "v4", auth });
const drive = google.drive({ version: "v3", auth });

async function createSpreadsheet() {
  try {
    console.log("📊 Creating Google Sheets spreadsheet...");

    const response = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: "Maxima Consulting - Заявки",
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

    console.log(`✅ Spreadsheet created: ${spreadsheetId}`);

    // Add headers
    console.log("📝 Adding headers...");
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Заявки!A1:G1",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          ["Дата", "Время", "Имя", "Контакт", "Оборот бизнеса", "Ситуация", "ID заявки"],
        ],
      },
    });

    // Format headers
    console.log("🎨 Formatting headers...");
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 0.2,
                    green: 0.8,
                    blue: 0.8,
                  },
                  textFormat: {
                    bold: true,
                    foregroundColor: {
                      red: 1,
                      green: 1,
                      blue: 1,
                    },
                  },
                },
              },
              fields: "userEnteredFormat(backgroundColor,textFormat)",
            },
          },
        ],
      },
    });

    // Share spreadsheet
    console.log("🔗 Sharing spreadsheet...");
    try {
      await drive.permissions.create({
        fileId: spreadsheetId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
    } catch (error) {
      console.warn("⚠️  Could not share spreadsheet (may require manual sharing)");
    }

    const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

    console.log("\n✨ Success!");
    console.log(`📋 Spreadsheet URL: ${spreadsheetUrl}`);
    console.log(`📌 Spreadsheet ID: ${spreadsheetId}`);
    console.log("\n🔧 Add this to your .env file:");
    console.log(`GOOGLE_SHEETS_ID=${spreadsheetId}`);

    // Save to a file for reference
    const configPath = path.join(process.cwd(), ".sheets-config.json");
    fs.writeFileSync(
      configPath,
      JSON.stringify(
        {
          spreadsheetId,
          spreadsheetUrl,
          createdAt: new Date().toISOString(),
        },
        null,
        2
      )
    );

    console.log(`\n💾 Config saved to: ${configPath}`);
  } catch (error) {
    console.error("❌ Error creating spreadsheet:", error);
    process.exit(1);
  }
}

createSpreadsheet();
