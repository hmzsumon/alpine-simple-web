"use client";
import {tableLabel} from "@/utils/halls";

import { ChevronRight } from "lucide-react";
import { useWaiterContext } from "@/context/WaiterContext";
import { statusLabel, bnDigits } from "@/utils/menuNames";
import { money } from "@/config";
import { Title, Empty } from "../ui/Primitives";
export default function OrdersScreen() {
  const c = useWaiterContext();
  const visible=(c.bootstrap?.orders||[]).filter(o=>c.page==="bookings"?o.bookingState==="booking"&&o.status!=="Cancelled":o.bookingState!=="booking");
  return (
    <section className="page">
      <Title
        eyebrow="আপনার অর্ডারের খবর"
        title={c.page==="bookings"?"আপনার বুকিং":"অর্ডারের তালিকা"}
        detail="অর্ডার ও বিলের অবস্থা দেখুন।"
      />
      <div className="grid gap-3 mt-5 md:grid-cols-2">
        {visible.map((o) => (
          <button
            className="card text-left"
            key={o.id}
            onClick={() => void c.openReceipt(o.id)}
          >
            <div className="flex justify-between items-center">
              <strong className="text-2xl">{o.parcelToken || (o.table==="WALK-IN"?(o.simpleBillNo||"অর্ডার"):tableLabel(o.table,c.bootstrap?.tables,o))}</strong>
              <span
                className={"pill " + (o.status === "Ready" ? "green" : "amber")}
              >
                {statusLabel(o.status)}
              </span>
            </div>
            <p className="muted text-[10px] break-all mt-2">
              {o.id} ·{" "}
              {o.paymentStatus === "paid" || o.status === "Paid"
                ? "পরিশোধিত"
                : "পেমেন্ট বাকি"}
            </p>
            <p className="muted text-xs mt-3">
              {o.waiter} ·{" "}
              {bnDigits(o.items.reduce((n, l) => n + l.quantity, 0))}টি খাবার
            </p>
            <div className="flex justify-between mt-4">
              <strong>
                {money(
                  o.items.reduce((n, l) => n + l.price * l.quantity, 0) +
                    (o.packingCharge || 0),
                )}
              </strong>
              <span className="text-alpine flex items-center text-xs">
                অর্ডার দেখুন
                <ChevronRight size={17} />
              </span>
            </div>
          </button>
        ))}
      </div>
      {!visible.length && (
        <Empty
          title="কোনো অর্ডারের তালিকা নেই"
          detail="টেবিল বেছে নিয়ে নতুন অর্ডার নিন।"
        />
      )}
    </section>
  );
}

