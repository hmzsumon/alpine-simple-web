/* ────────── typed feedback events; confirmations never submit automatically ────────── */
export type ToastKind = "success" | "error" | "info";
export type ConfirmRequest = {message:string; title?:string; confirmLabel?:string; danger?:boolean; resolve:(value:boolean)=>void};
export function confirmAction(message:string,options:Omit<Partial<ConfirmRequest>,"message"|"resolve">={}):Promise<boolean>{
 if(typeof window==="undefined")return Promise.resolve(false);
 return new Promise(resolve=>window.dispatchEvent(new CustomEvent("alpine:confirm",{detail:{...options,message,resolve}})));
}
let sequence=0;
export function notify(message:string,kind:ToastKind="success"){
 if(typeof window!=="undefined"&&message)window.dispatchEvent(new CustomEvent("alpine:toast",{detail:{message,kind,id:String(Date.now())+"-"+(++sequence)}}));
}
