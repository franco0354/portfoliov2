import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function getEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) return undefined;
  return value.replace(/^["']|["']$/g, "");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getResendErrorMessage(error: { message?: string; name?: string }) {
  if (error.message?.includes("domain is not verified")) {
    return "Email could not be sent because francogregorio.com is not verified in Resend yet.";
  }

  if (error.message?.includes("only send testing emails to your own email address")) {
    return "Email could not be sent yet. Verify francogregorio.com in Resend, or use the Resend test sender with your Resend account email for local testing.";
  }

  return error.message ?? "Failed to send your message. Please try again later.";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = getEnv("RESEND_API_KEY");
    const ownerEmail = getEnv("CONTACT_EMAIL");
    const fromEmail = getEnv("RESEND_FROM_EMAIL");

    if (!apiKey || !ownerEmail || !fromEmail) {
      console.error("Missing Resend configuration.");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const ownerResult = await resend.emails.send({
      from: fromEmail,
      to: ownerEmail,
      replyTo: email,
      subject: `New contact message from ${name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (ownerResult.error) {
      console.error("Failed to send owner email:", ownerResult.error);
      return NextResponse.json(
        { error: getResendErrorMessage(ownerResult.error) },
        { status: 500 }
      );
    }

    const clientResult = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Thanks for reaching out — I received your message",
      html: `
        <h2>Hi ${escapeHtml(name)},</h2>
        <p>Thanks for contacting me through my portfolio. I received your message and will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        <p>Best regards,<br />Franco Gregorio</p>
      `,
    });

    if (clientResult.error) {
      console.error("Failed to send client confirmation:", clientResult.error);
      return NextResponse.json(
        { error: getResendErrorMessage(clientResult.error) },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
