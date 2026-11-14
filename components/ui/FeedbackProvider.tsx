/* ────────── branded, keyboard-accessible dialogs and non-blocking toast stack ────────── */
"use client";
import {useEffect,useRef,useState,type ReactNode} from "react";
import {Check,CheckCircle2,Info,AlertCircle,X,ShieldCheck} from "lucide-react";
import type {ConfirmRequest,ToastKind} from "@/lib/feedback";
type Toast={id:string;message:string;kind:ToastKind};
function ToastCard({toast,close}:{toast:Toast;close:()=>void}){
 useEffect(()=>{const timer=setTimeout(close,toast.kind==="error"?8000:4500);return()=>clearTimeout(timer);},[toast.id,toast.kind,close]);
 const Icon=toast.kind==="error"?AlertCircle:toast.kind==="info"?Info:CheckCircle2;
 return <div className={"smart-toast smart-toast-"+toast.kind} role={toast.kind==="error"?"alert":"status"}><Icon size={20}/><p>{toast.message}</p><button type="button" aria-label="Dismiss" onClick={close}><X size={16}/></button></div>;
}
export default function FeedbackProvider({children,language="en"}:{children:ReactNode;language?:"bn"|"en"}){
 const [requests,setRequests]=useState<ConfirmRequest[]>([]),[toasts,setToasts]=useState<Toast[]>([]),dialog=useRef<HTMLDialogElement>(null),waiting=useRef<ConfirmRequest[]>([]);
 const bn=language==="bn",current=requests[0];
 useEffect(()=>{
  const ask=(event:Event)=>{const request=(event as CustomEvent<ConfirmRequest>).detail;waiting.current.push(request);setRequests([...waiting.current]);};
  const toast=(event:Event)=>setToasts(previous=>[...previous.slice(-2),(event as CustomEvent<Toast>).detail]);
  window.addEventListener("alpine:confirm",ask);window.addEventListener("alpine:toast",toast);
  return()=>{window.removeEventListener("alpine:confirm",ask);window.removeEventListener("alpine:toast",toast);waiting.current.forEach(r=>r.resolve(false));waiting.current=[];};
 },[]);
 useEffect(()=>{if(current&&!dialog.current?.open)dialog.current?.showModal();else if(!current&&dialog.current?.open)dialog.current.close();},[current]);
 function finish(value:boolean){if(!current)return;waiting.current.shift();current.resolve(value);setRequests([...waiting.current]);}
 return <>{children}<div className="smart-toast-stack" aria-label={bn?"নোটিফিকেশন":"Notifications"}>{toasts.map(toast=><ToastCard key={toast.id} toast={toast} close={()=>setToasts(previous=>previous.filter(t=>t.id!==toast.id))}/>)}</div><dialog ref={dialog} className="smart-dialog" aria-labelledby="smart-dialog-title" aria-describedby="smart-dialog-message" onCancel={e=>{e.preventDefault();finish(false);}}><div className="smart-dialog-heading"><span className={"smart-dialog-icon "+(current?.danger?"smart-danger":"")}><ShieldCheck size={20}/></span><div><small>ALPINE RESTAURANT</small><h2 id="smart-dialog-title">{current?.title||(bn?"নিশ্চিত করবেন?":"Please confirm")}</h2></div><button type="button" aria-label={bn?"বন্ধ করুন":"Close"} onClick={()=>finish(false)}><X size={18}/></button></div><p id="smart-dialog-message">{current?.message}</p><div className="smart-dialog-actions"><button type="button" autoFocus onClick={()=>finish(false)}>{bn?"ফিরে যান":"Cancel"}</button><button type="button" className={current?.danger?"smart-confirm smart-danger-button":"smart-confirm"} onClick={()=>finish(true)}><Check size={16}/>{current?.confirmLabel||(bn?"হ্যাঁ, নিশ্চিত করুন":"Confirm")}</button></div></dialog></>;
}
