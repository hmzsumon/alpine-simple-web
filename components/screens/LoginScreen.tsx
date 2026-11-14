"use client";
import { useState } from "react";
import { ShieldCheck, Eye, EyeOff, Server } from "lucide-react";
import { useWaiterContext } from "@/context/WaiterContext";
import { Button } from "../ui/Primitives";
export default function LoginScreen() {
  const c = useWaiterContext(),
    [identifier, setIdentifier] = useState(""),
    [password, setPassword] = useState(""),
    [show, setShow] = useState(false),
    [settings, setSettings] = useState(false);
  return (
    <main className="login-wrap">
      <header className="login-brand"><img src="/alpine-logo.png" alt="Alpine Restaurant" width={48} height={48}/><div><p className="eyebrow">ALPINE RESTAURANT</p><h1 className="login-title">আপনার দায়িত্বে সুন্দর সেবা।</h1></div></header>
      <p className="login-caption">টেবিল অনুযায়ী অর্ডার নিন, ক্যাশ কাউন্টারে জমা দিন।</p>
      <form
        className="card login-card"
        onSubmit={(e) => {
          e.preventDefault();
          void c.login(identifier.trim(), password, c.server);
        }}
      >
        <h2 className="flex items-center gap-2 text-base font-bold mb-4">
          <ShieldCheck size={18} className="text-alpine" />
          কর্মীর লগইন
        </h2>
        <label>
          মোবাইল নম্বর / ইমেইল
          <input
            required
            autoComplete="username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="মোবাইল নম্বর অথবা ইমেইল"
          />
        </label>
        <label>
          অ্যাডমিনের দেওয়া পাসওয়ার্ড
          <div className="relative">
            <input
              required
              type={show ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-12"
            />
            <button
              type="button"
              className="password-toggle"
              aria-label={show ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
              onClick={() => setShow(!show)}
            >
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </label>
        {c.error && (
          <p role="alert" className="error-text">
            {c.error}
          </p>
        )}
        <Button busy={c.busy} type="submit" className="w-full mt-4">
          লগইন করুন
        </Button>
      </form>
      <button
        className="flex items-center justify-center gap-2 muted w-full mt-4 text-xs"
        onClick={() => setSettings(!settings)}
      >
        <Server size={17} /> রেস্টুরেন্ট সার্ভার সেটিংস
      </button>
      {settings && (
        <div className="card mt-3 text-xs leading-6 muted">
          একই মোবাইল অ্যাপের অ্যাকাউন্ট দিয়ে লগইন করুন।
          <br />
          লাইভ সংযোগ: {c.server}
          <br />
          ওয়েবের API সার্ভার .env.local থেকে নির্ধারণ করা হয়।
        </div>
      )}
      <p className="muted text-center text-xs tracking-widest mt-5">
        ALPINE SIMPLE · ORDER & CASH
      </p>
    </main>
  );
}
