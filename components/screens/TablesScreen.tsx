/* ── Screen: direct order start without a physical table ── */
"use client";
import {useWaiterContext} from "@/context/WaiterContext";
import {Title,Button} from "../ui/Primitives";
import ParcelCounter from "./ParcelCounter";
export default function TablesScreen(){const c=useWaiterContext();if(c.session?.user.permissions.includes("orders:parcel")&&c.session.user.role==="waiter")return <ParcelCounter/>;return <section className="page"><Title eyebrow="ALPINE SIMPLE" title="অর্ডার নিন" detail="খাবার বেছে অর্ডার জমা দিন। বিল ক্যাশ কাউন্টারে যাবে।"/><div className="mt-6 grid gap-4"><Button disabled={c.busy||!!c.pending} onClick={()=>c.chooseTable({id:"WALK-IN",name:"নতুন অর্ডার",floor:"",seats:0,occupied:false,orders:[]})}>{c.draft.items.length&&!c.draft.orderId?"খাবারের তালিকায় ফিরুন":"নতুন অর্ডার"}</Button><Button secondary onClick={()=>c.navigate("orders")}>অর্ডারের তালিকা</Button>{c.pending&&<Button onClick={()=>c.navigate("cart")}>অপেক্ষমাণ অর্ডার দেখুন</Button>}</div></section>;}
