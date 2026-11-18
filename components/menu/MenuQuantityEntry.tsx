/* ── Search stays stable until the complete quantity is explicitly accepted ── */
'use client';
import {useEffect,useRef,useState} from 'react';
export default function MenuQuantityEntry({name,quantity,disabled,onConfirm}:{name:string;quantity:number;disabled:boolean;onConfirm:(target:number)=>boolean}){
 const [text,setText]=useState(String(quantity||1)),submitted=useRef(false);
 useEffect(()=>{setText(String(quantity||1));submitted.current=false;},[quantity]);
 const value=Number(text),valid=/^\d+$/.test(text)&&Number.isInteger(value)&&value>=(quantity?0:1)&&value<=99;
 const confirm=()=>{if(disabled||submitted.current||!valid)return;if(onConfirm(value))submitted.current=true;};
 const step=(delta:number)=>{if(disabled)return;submitted.current=false;setText(current=>String(Math.max(quantity?0:1,Math.min(99,(Number(current)||0)+delta))));};
 return <div className="menu-quantity-entry flex basis-full flex-wrap items-center gap-1.5 pt-2"><span className="text-xs text-muted">পরিমাণ</span><button type="button" aria-label={name+' পরিমাণ কমান'} disabled={disabled} className="h-11 w-9 rounded-lg bg-white/5 text-xl" onClick={()=>step(-1)}>−</button><input aria-label={name+' পরিমাণ'} inputMode="numeric" enterKeyHint="done" maxLength={3} disabled={disabled} value={text} onFocus={e=>e.currentTarget.select()} onChange={e=>{submitted.current=false;setText(e.target.value.replace(/[০-৯]/g,d=>String('০১২৩৪৫৬৭৮৯'.indexOf(d))));}} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();confirm();}}} className="h-11 !w-14 !p-1 text-center !text-base"/><button type="button" aria-label={name+' পরিমাণ বাড়ান'} disabled={disabled} className="h-11 w-9 rounded-lg bg-white/5 text-xl" onClick={()=>step(1)}>+</button><button type="button" aria-label={name+' পরিমাণ নিশ্চিত করুন'} disabled={disabled||!valid} className="primary ml-auto !min-h-11 !px-3" onClick={confirm}>{quantity?'ঠিক আছে':'যোগ করুন'}</button>{!valid&&<span role="status" className="text-xs text-rose-300">{quantity?'০':'১'}–৯৯ দিন</span>}</div>;
}
