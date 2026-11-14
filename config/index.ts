/* ────────── same Alpine restaurant contract, browser transport ────────── */
import { bnDigits } from "../utils/menuNames";
export const DEFAULT_SERVER =
  process.env.NEXT_PUBLIC_REALTIME_URL || "https://alpine-87e6611a0afd.herokuapp.com";
export const EMPTY_DRAFT = { table: "", items: [], note: "" };
export const money = (value: number) =>
  "৳" + bnDigits(value.toLocaleString("en-BD", { maximumFractionDigits: 2 }));
