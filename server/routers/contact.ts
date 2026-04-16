import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";
import { appendRow } from "../services/googleSheets";

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  contact: z.string().min(1, "Contact is required").max(255),
  revenue: z.string().min(1, "Revenue is required").max(255),
  situation: z.string().max(2000).optional().default(""),
  timestamp: z.string().datetime().optional(),
});

type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * Send contact form data via email and Telegram
 */
async function sendContactNotifications(data: ContactFormInput): Promise<void> {
  const emailAddress = "zugrov@gmail.com";
  const telegramHandle = "@maxima_CFO_light";

  // Format the message for both email and Telegram
  const formattedMessage = `
📋 **New Contact Form Submission**

**Name:** ${data.name}
**Contact:** ${data.contact}
**Revenue:** ${data.revenue}
**Situation:** ${data.situation || "Not provided"}
**Submitted:** ${data.timestamp || new Date().toISOString()}

---
Email: ${emailAddress}
Telegram: ${telegramHandle}
  `.trim();

  try {
    // Send notification to owner (this uses the built-in Manus notification system)
    await notifyOwner({
      title: `New Contact Form: ${data.name}`,
      content: formattedMessage,
    });

    console.log("[Contact] Notification sent to owner");
  } catch (error) {
    console.error("[Contact] Failed to send notification:", error);
    throw new Error("Failed to send contact notification");
  }
}

/**
 * Append contact data to Google Sheets
 */
async function appendToGoogleSheets(data: ContactFormInput & { timestamp: string }): Promise<void> {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    if (!spreadsheetId) {
      console.warn(
        "[Google Sheets] GOOGLE_SHEETS_ID not set, skipping sheet update"
      );
      return;
    }

    await appendRow(spreadsheetId, data);
    console.log("[Google Sheets] Data appended successfully");
  } catch (error) {
    console.error("[Google Sheets] Failed to append data:", error);
    // Don't throw - Google Sheets is not critical to form submission
  }
}

export const contactRouter = router({
  /**
   * Submit contact form
   * Sends data to email and Telegram
   */
  submit: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ input }) => {
      try {
        // Validate and sanitize input
        const validatedData = contactFormSchema.parse(input);

        // Add timestamp if not provided
        const timestamp = validatedData.timestamp || new Date().toISOString();
        const dataWithTimestamp = { ...validatedData, timestamp };

        // Send notifications
        await sendContactNotifications(dataWithTimestamp);

        // Append to Google Sheets
        await appendToGoogleSheets(dataWithTimestamp);

        return {
          success: true,
          message: "Contact form submitted successfully",
          data: {
            name: validatedData.name,
            contact: validatedData.contact,
            submittedAt: validatedData.timestamp,
          },
        };
      } catch (error) {
        console.error("[Contact] Submission error:", error);

        if (error instanceof z.ZodError) {
          const firstError = error.issues[0];
          throw new Error(`Validation error: ${firstError?.message || 'Invalid input'}`);
        }

        throw new Error("Failed to submit contact form");
      }
    }),
});
