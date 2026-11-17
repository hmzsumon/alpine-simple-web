/* ────────── small web controls in the native Alpine palette ────────── */
"use client";
import type { ReactNode, ButtonHTMLAttributes } from "react";
export function Button({
  children,
  secondary = false,tone,
  busy = false,
  ...p
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  secondary?: boolean;tone?:"save"|"confirm"|"menu";
  busy?: boolean;
}) {
  return (
    <button
      {...p}
      style={{...p.style,...(tone?{background:({save:"#2563eb",confirm:"#059669",menu:"#7c3aed"})[tone],borderColor:"transparent",color:"white"}:{})}}
      disabled={p.disabled || busy}
      aria-busy={busy||undefined}
      className={
        (secondary ? "secondary" : "primary") + " mb-2.5 " + (p.className || "")
      }
    >
      {busy ? "অপেক্ষা করুন…" : children}
    </button>
  );
}
export function Empty({ title, detail }: { title: string; detail?: string }) {
  return (
    <div className="empty">
      <p>{title}</p>
      {detail && <small>{detail}</small>}
    </div>
  );
}
export function Title({
  eyebrow,
  title,
  detail,
}: {
  eyebrow?: string;
  title: string;
  detail?: string;
}) {
  return (
    <div className="page-title">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {detail && <p className="muted mt-2 text-sm leading-6">{detail}</p>}
    </div>
  );
}
export function Modal({
  title,
  close,
  children,
}: {
  title: string;
  close: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="modal"
      >
        <header>
          <h2>{title}</h2>
          <button className="icon" onClick={close} aria-label="বন্ধ করুন">
            ×
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}
export function Counter({
  value,
  plus,
  minus,
  disabled = false,
  name = "খাবার",
}: {
  value: number;
  plus: () => void;
  minus: () => void;
  disabled?: boolean;
  name?: string;
}) {
  return (
    <div className="counter">
      <button
        disabled={disabled || !value}
        onClick={minus}
        aria-label={name + " কমান"}
      >
        −
      </button>
      <span>{value.toLocaleString("bn-BD")}</span>
      <button
        className="add"
        disabled={disabled}
        onClick={plus}
        aria-label={name + " যোগ করুন"}
      >
        +
      </button>
    </div>
  );
}
