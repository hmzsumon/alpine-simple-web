/* ────────── prepare each immutable catalog once; empty search needs no matching work ────────── */
import type {MenuItem} from "../types";
import {matchesFood} from "./menuNames";
import {isCodeQuery} from "./menuSearch";
const compare=typeof Intl!=="undefined"&&typeof Intl.Collator==="function"?new Intl.Collator("en",{numeric:true}).compare:undefined;
function naturalCode(a:string,b:string){
 const x=a.match(/\d+|\D+/g)||[],y=b.match(/\d+|\D+/g)||[];
 for(let i=0;i<Math.min(x.length,y.length);i++){const left=x[i],right=y[i];if(left===right)continue;if(/^\d+$/.test(left)&&/^\d+$/.test(right)){const diff=Number(left)-Number(right);if(diff)return diff;}else{const diff=left.toLowerCase().localeCompare(right.toLowerCase());if(diff)return diff;}}
 return x.length-y.length;
}
const cache=new WeakMap<MenuItem[],{items:MenuItem[];categories:string[]}>();
export function prepareMenu(menu:MenuItem[]){
 const previous=cache.get(menu);if(previous)return previous;
 const result={items:[...menu].sort((a,b)=>{const left=a.code||"999999",right=b.code||"999999";return compare?compare(left,right):naturalCode(left,right);}),categories:["All",...new Set(menu.map(item=>item.category))]};
 cache.set(menu,result);return result;
}
export function filterMenu(items:MenuItem[],query:string,category:string){
 const search=query.trim();if(!search&&category==="All")return items;
 const code=!!search&&isCodeQuery(search);
 return items.filter(item=>(code||category==="All"||item.category===category)&&(!search||matchesFood(item,search)));
}
