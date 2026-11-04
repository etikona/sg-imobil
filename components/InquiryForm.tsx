"use client";
import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import {
  validateInquiry,
  type Errors,
  type InquiryInput,
  type InquiryKind,
} from "@/lib/validation";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";
interface Props {
  kind: InquiryKind;
  propertyId?: string;
  propertySlug?: string;
  submitLabel: string;
  idPrefix?: string;
}

export function InquiryForm({
  kind,
  propertyId,
  propertySlug,
  submitLabel,
  idPrefix = kind,
}: Props) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  const f = (k: string) => `${idPrefix}-${k}`;
  const err = (k: keyof InquiryInput) => errors[k];
  const aria = (k: keyof InquiryInput) => ({
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${f(k)}-err` : undefined,
  });
  const Err = ({ k }: { k: keyof InquiryInput }) =>
    err(k) ? (
      <p id={`${f(k)}-err`} className="mt-1 text-sm text-red-700">
        {err(k)}
      </p>
    ) : null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const d = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    ) as Record<string, string>;

    const input: InquiryInput = {
      kind,
      name: d.name ?? "",
      phone: d.phone ?? "",
      propertyType: d.propertyType,
      intent: d.intent,
      location: d.location,
      message: d.message,
      propertyId,
      propertySlug,
      website: d.website,
    };

    const v = validateInquiry(input);
    setErrors(v);

    if (Object.keys(v).length) {
      (
        e.currentTarget.querySelector(
          "[aria-invalid=true]",
        ) as HTMLElement | null
      )?.focus();
      return;
    }

    setStatus("submitting");

    // Temporary simulated success response.
    await new Promise((resolve) => setTimeout(resolve, 800));

    setStatus("success");
  }

  // ! Status

  if (status === "success")
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-forest/30 bg-white p-6 text-ink"
      >
        <CheckCircle2 className="text-forest" size={32} />

        <h3 className="mt-3 text-lg font-semibold">
          Vă mulțumim pentru mesaj!
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted">
          Cererea dumneavoastră a fost înregistrată cu succes. Echipa SG Imobil
          vă va contacta în cel mai scurt timp.
        </p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 text-ink">
      <div>
        <label htmlFor={f("name")} className="label">
          Nume complet
        </label>
        <input
          id={f("name")}
          name="name"
          autoComplete="name"
          className="field"
          {...aria("name")}
        />
        <Err k="name" />
      </div>
      <div>
        <label htmlFor={f("phone")} className="label">
          Număr de telefon
        </label>
        <input
          id={f("phone")}
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+373 …"
          className="field"
          {...aria("phone")}
        />
        <Err k="phone" />
      </div>
      {kind === "owner" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={f("propertyType")} className="label">
                Tip proprietate
              </label>
              <select
                id={f("propertyType")}
                name="propertyType"
                defaultValue=""
                className="field"
                {...aria("propertyType")}
              >
                <option value="" disabled>
                  Alege…
                </option>
                <option>Apartament</option>
                <option>Casă</option>
                <option>Garsonieră</option>
                <option>Odaie în cămin</option>
                <option>Teren</option>
                <option>Spațiu comercial</option>
              </select>
              <Err k="propertyType" />
            </div>
            <div>
              <label htmlFor={f("intent")} className="label">
                Vânzare sau închiriere
              </label>
              <select
                id={f("intent")}
                name="intent"
                defaultValue=""
                className="field"
                {...aria("intent")}
              >
                <option value="" disabled>
                  Alege…
                </option>
                <option value="vanzare">Vânzare</option>
                <option value="chirie">Închiriere</option>
              </select>
              <Err k="intent" />
            </div>
          </div>
          <div>
            <label htmlFor={f("location")} className="label">
              Localitate / adresă proprietate
            </label>
            <input
              id={f("location")}
              name="location"
              autoComplete="off"
              className="field"
              {...aria("location")}
            />
            <Err k="location" />
          </div>
        </>
      )}
      <div>
        <label htmlFor={f("message")} className="label">
          Mesaj <span className="font-normal text-muted">(opțional)</span>
        </label>
        <textarea
          id={f("message")}
          name="message"
          rows={3}
          className="field py-2"
          {...aria("message")}
        />
        <Err k="message" />
      </div>
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {status === "error" && (
        <div
          role="alert"
          className="flex gap-3 rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-900"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden />
          <p>
            {serverMsg} Te rugăm să ne suni la{" "}
            <a
              className="font-semibold underline"
              href={`tel:${site.primaryPhone.href}`}
            >
              {site.primaryPhone.display}
            </a>
            .
          </p>
        </div>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full disabled:opacity-60"
      >
        <Loader2
          size={16}
          className={`animate-spin ${
            status === "submitting" ? "block" : "hidden"
          }`}
          aria-hidden="true"
        />

        <span>{status === "submitting" ? "Se trimite…" : submitLabel}</span>
      </button>
    </form>
  );
}
