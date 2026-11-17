"use client";
import {isParcelStaff} from "@/utils/parcelStaff";
import {
  LayoutGrid,
  ShoppingCart,
  ClipboardList,
  UtensilsCrossed,
  Bell, Package,
} from "lucide-react";
import { useWaiterContext } from "@/context/WaiterContext";
import type { Page } from "@/types";
export default function BottomNav() {
  const c = useWaiterContext(),
    operator =
      c.session?.user.mobileMode === "operator" ||
      c.session?.user.role === "kitchen";
  const tabs: {key:Page;label:string;icon:typeof Bell}[]=[{key:"tables",label:isParcelStaff(c.session?.user)?"পার্সেল":"হল ও টেবিল",icon:isParcelStaff(c.session?.user)?Package:LayoutGrid},{key:"cart",label:"কার্ট",icon:ShoppingCart},{key:"bookings",label:"বুকিং",icon:ClipboardList},{key:"orders",label:"অর্ডার",icon:ClipboardList}];
  return (
    <nav className="bottom-nav" aria-label="প্রধান মেনু">
      {tabs.map((t) => {
        const count =
          t.key === "bookings" ? (c.bootstrap?.orders.filter(o=>o.bookingState==="booking"&&o.status!=="Cancelled").length||0):t.key === "cart"
            ? c.quantity
            : t.key === "notifications"
              ? c.operations.unread
              : 0;
        return (
          <button
            key={t.key}
            aria-current={c.page === t.key ? "page" : undefined}
            onClick={() => c.navigate(t.key)}
            className={c.page === t.key ? "active" : ""}
          >
            <span className="relative">
              <t.icon size={22} />
              {count > 0 && (
                <span className="badge">{count.toLocaleString("bn-BD")}</span>
              )}
            </span>
            <span>{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
