"use client";
/* ────────── paint immediate feedback before navigation; reject repeated taps synchronously ────────── */
import {useCallback,useEffect,useRef,useState} from "react";
type Channel="takeaway"|"foodpanda";
export function useParcelStart(open:(channel:Channel)=>boolean,onError:(error:unknown)=>void){
 const [opening,setOpening]=useState<Channel|null>(null),locked=useRef(false),callback=useRef(open),failed=useRef(onError),frame=useRef<ReturnType<typeof requestAnimationFrame>|undefined>(undefined),timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
 callback.current=open;failed.current=onError;
 useEffect(()=>()=>{if(frame.current!==undefined)cancelAnimationFrame(frame.current);if(timer.current!==undefined)clearTimeout(timer.current);},[]);
 const start=useCallback((channel:Channel)=>{
  if(locked.current)return;locked.current=true;setOpening(channel);
  frame.current=requestAnimationFrame(()=>{frame.current=undefined;timer.current=setTimeout(()=>{timer.current=undefined;
   const release=()=>{locked.current=false;setOpening(null);};
   try{if(!callback.current(channel))release();}catch(error){release();failed.current(error);}
  },0);});
 },[]);
 return {opening,start};
}
