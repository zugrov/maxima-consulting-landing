import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";

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
        if (!validatedData.timestamp) {
          validatedData.timestamp = new Date().toISOString();
        }

        // Send notifications
        await sendContactNotifications(validatedData);

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
