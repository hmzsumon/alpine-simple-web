/* ────────── role-dependent web navigation; every data/action is still authorized by the API ────────── */
"use client";
import {isParcelStaff} from "@/utils/parcelStaff";
import ParcelCounter from "../screens/ParcelCounter";
import {useEffect} from "react";
import {notify} from "@/lib/feedback";
import { X, LoaderCircle } from "lucide-react";
import { useWaiterContext } from "@/context/WaiterContext";
import AppHeader from "./AppHeader";
import BottomNav from "./BottomNav";
import LoginScreen from "../screens/LoginScreen";
import TablesScreen from "../screens/TablesScreen";
import MenuScreen from "../screens/MenuScreen";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ReceiptScreen from "../screens/ReceiptScreen";


export default function WaiterApp() {
  const c = useWaiterContext();
  useEffect(()=>{if(c.error)notify(c.error,"error");},[c.error]);
  if (c.starting)
    return (
      <div className="h-dvh flex items-center justify-center gap-3 text-alpine">
        <LoaderCircle className="animate-spin" />
        লোড হচ্ছে…
      </div>
    );
  if (!c.session) return <LoginScreen />;
  return (
    <main className="app-shell">
      {c.page !== "menu" && <AppHeader />}
      <div className="screen-area">
        {c.page === "tables" ? (
          isParcelStaff(c.session.user)?<ParcelCounter />:<TablesScreen />
        ) : c.page === "menu" ? (
          <MenuScreen />
        ) : c.page === "cart" ? (
          <CartScreen />
        ) : (c.page === "orders" || c.page === "bookings") ? (
          <OrdersScreen />
        ) : (
          <ReceiptScreen />
        )}
      </div>
      {c.page !== "menu" && <BottomNav />}
    </main>
  );
}
