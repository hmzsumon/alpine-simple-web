import type {Order} from "../types";
/* ────────── a just-saved receipt must not be replaced by an older bootstrap ────────── */
export function currentOrder(id:string|undefined,orders:Order[]|undefined,receipt:Order|undefined):Order|undefined {
 const listed=orders?.find(o=>o.id===id),saved=receipt?.id===id?receipt:undefined;
 if(!listed)return saved;if(!saved)return listed;
 if((listed.bookingRevision||0)!==(saved.bookingRevision||0))return (listed.bookingRevision||0)>(saved.bookingRevision||0)?listed:saved;
 if(listed.status==="Cancelled"||listed.paymentStatus==="paid"||listed.status==="Paid")return listed;
 return saved;
}
