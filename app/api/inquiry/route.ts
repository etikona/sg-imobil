import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { validateInquiry, type InquiryInput } from "@/lib/validation";

function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

export async function POST(req: Request) {
  let body: InquiryInput;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Silently ignore bot submissions.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  // Validate inquiry data.
  const errors = validateInquiry(body);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "validation", errors }, { status: 422 });
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, INQUIRY_TO_EMAIL } = process.env;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !INQUIRY_TO_EMAIL) {
    console.error("Nodemailer configuration is missing.");

    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD.replace(/\s/g, ""),
      },
    });

    const isOwner = body.kind === "owner";

    const details = [
      [
        "Tipul cererii",
        isOwner ? "Ofertă proprietate" : "Solicitare de contact",
      ],
      ["Nume", body.name],
      ["Telefon", body.phone],
      ...(isOwner
        ? [
            ["Tip proprietate", body.propertyType],
            [
              "Operațiune",
              body.intent === "vanzare" ? "Vânzare" : "Închiriere",
            ],
            ["Localitate / adresă", body.location],
          ]
        : []),
      ["ID proprietate", body.propertyId],
      ["Link proprietate", body.propertySlug],
      ["Mesaj", body.message || "Nu a fost adăugat niciun mesaj."],
    ].filter(([, value]) => value);

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #222;">
        <h2 style="color: #244b38;">Cerere nouă – SG Imobil</h2>
        <p>Ați primit o solicitare nouă prin intermediul site-ului.</p>

        <table style="width: 100%; border-collapse: collapse;">
          ${details
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; width: 40%;">
                    ${escapeHtml(label)}
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;">
                    ${escapeHtml(value)}
                  </td>
                </tr>
              `,
            )
            .join("")}
        </table>

        <p style="margin-top: 24px; color: #777; font-size: 12px;">
          Mesaj trimis automat de pe site-ul SG Imobil.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"SG Imobil Website" <${GMAIL_USER}>`,
      to: INQUIRY_TO_EMAIL,
      subject: `Cerere nouă de la ${body.name} – SG Imobil`,
      text: details.map(([label, value]) => `${label}: ${value}`).join("\n"),
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Inquiry email delivery failed:", error);

    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
