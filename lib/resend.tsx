import { Resend } from "resend";
import NewCreatorEmail from "@/components/emails/NewCreator";

class EmailService {
  private resend: Resend | null = null;

  constructor() {
    console.log("📧 Initializing Email Service...");

    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY not found");
      return;
    }

    if (!process.env.RESEND_API_KEY.startsWith("re_")) {
      console.error("❌ Invalid RESEND_API_KEY format");
      return;
    }

    try {
      this.resend = new Resend(process.env.RESEND_API_KEY);
      console.log("✅ Email Service initialized");
    } catch (error) {
      console.error(
        "❌ Failed to initialize Resend:",
        (error as Error).message
      );
    }
  }

  async addNewCreatorEmail(email: string, firstName: string) {
    if (!this.resend) {
      throw new Error("Email service not initialized");
    }

    try {
      const emailData = {
        from: "Creators <onboarding@resend.dev>",
        to: email,
        subject: "Welcome to Grangou Creators! 🍽️",
        react: <NewCreatorEmail name={firstName} />,
      };

      console.log("📧 Email payload:", {
        from: emailData.from,
        to: emailData.to,
        subject: emailData.subject,
        hasReact: !!emailData.react,
      });

      const { data, error } = await this.resend.emails.send(emailData);

      if (error) {
        throw error;
      }

      console.log("✅ Welcome email sent:", data?.id);

      return data;
    } catch (error) {
      const err = error as Error;

      console.error("❌ Email service error:", {
        message: err.message,
        stack: err.stack,
        email,
      });

      throw err;
    }
  }
}

export default EmailService;