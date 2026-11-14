/* ────────── preserve draft-switch callbacks behind the branded dialog ────────── */
import {confirmAction} from "@/lib/feedback";
export const Alert={async alert(title:string,message:string,buttons:{text:string;style?:string;onPress?:()=>void}[]){
 const accepted=buttons.find(b=>b.style!=="cancel"&&b.onPress),cancel=buttons.find(b=>b.style==="cancel");
 if(await confirmAction(message,{title,confirmLabel:accepted?.text,danger:accepted?.style==="destructive"}))accepted?.onPress?.();else cancel?.onPress?.();
}};
