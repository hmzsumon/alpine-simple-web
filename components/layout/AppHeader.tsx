"use client";
import {confirmAction} from "@/lib/feedback";
import { LogOut, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { useWaiterContext } from "@/context/WaiterContext";
export default function AppHeader() {
  const c = useWaiterContext();
  return (
    <header className="app-header">
      <div className="flex min-w-0 items-center gap-3">
        <img
          src="/alpine-logo.png"
          alt="Alpine Restaurant"
          width={48}
          height={48}
          className="rounded-xl"
        />
        <div className="min-w-0">
          <p className="font-bold tracking-wide">
            ALPINE <span className="muted text-sm font-normal">স্টাফ</span>
          </p>
          <p className="muted truncate text-xs mt-1">
            {c.session?.user.name} ·{" "}
            {c.session?.user.roleName || c.session?.user.role}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={!!c.bootstrap ? "text-alpine" : "text-amber-300"}
          title={!!c.bootstrap ? "মেনু লোড হয়েছে" : "মেনু লোড হচ্ছে"}
        >
          {!!c.bootstrap ? <Wifi size={15} /> : <WifiOff size={15} />}
        </span>
        <button
          className="icon"
          aria-label="রিফ্রেশ"
          disabled={c.busy}
          onClick={() => void c.refresh()}
        >
          <RefreshCw size={20} className={c.busy ? "animate-spin" : ""} />
        </button>
        <button
          className="icon"
          aria-label="লগআউট"
          onClick={async () => {
            if (await confirmAction("লগআউট করবেন? না পাঠানো খাবার এই ব্রাউজারে সেভ থাকবে।"))
              void c.logout();
          }}
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
