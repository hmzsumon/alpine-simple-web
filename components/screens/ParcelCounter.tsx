"use client";
import {useMemo} from "react";
import {Package,ShoppingBag} from "lucide-react";
import {useWaiterContext} from "@/context/WaiterContext";
import {useParcelStart} from "@/hooks/useParcelStart";
import {prepareMenu} from "@/utils/menuCatalog";
import {Title,Button} from "../ui/Primitives";
const parcel={id:"PARCEL",floor:"",seats:0,occupied:false,orders:[]};
export default function ParcelCounter(){
 const c=useWaiterContext();
 useMemo(()=>c.bootstrap?.menu&&prepareMenu(c.bootstrap.menu),[c.bootstrap?.menu]);
 const {opening,start}=useParcelStart(channel=>c.chooseTable(parcel,undefined,channel),error=>c.setError(error instanceof Error?error.message:"অর্ডার পেজ খোলা যায়নি। আবার চেষ্টা করুন।"));
 const disabled=c.busy||!!c.pending||!!opening;
 return <section className="page"><Title eyebrow="ALPINE SIMPLE" title="পার্সেল ও ফুডপান্ডা" detail="অর্ডার হাতে এন্ট্রি করুন। বিল ক্যাশ কাউন্টারে যাবে।"/>
  <div className="space-y-4 mt-6">
   <Button className="w-full" disabled={disabled} busy={opening==="takeaway"} onClick={()=>start("takeaway")}><Package size={20}/>নতুন পার্সেল অর্ডার</Button>
   <Button secondary className="w-full" disabled={disabled} busy={opening==="foodpanda"} onClick={()=>start("foodpanda")}><ShoppingBag size={20}/>ফুডপান্ডা অর্ডার এন্ট্রি</Button>
   {!!opening&&<p role="status" className="text-sm text-alpine">মেনু খোলা হচ্ছে…</p>}
   <Button secondary className="w-full" disabled={!!opening} onClick={()=>c.navigate("orders")}>অর্ডারের তালিকা</Button>
  </div><p className="notice mt-6">ফুডপান্ডার আসল অর্ডার নম্বর লিখবেন। একই অর্ডার দ্বিতীয়বার এন্ট্রি দেবেন না।</p>
  {c.pending&&<Button className="w-full mt-4" onClick={()=>c.navigate("cart")}>অপেক্ষমাণ অর্ডার দেখুন</Button>}
 </section>;
}
