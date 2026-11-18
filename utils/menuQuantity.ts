/* Translate an explicit total into mode-preserving cart changes; typing alone never changes the order. */
type Serving='dine_in'|'parcel';
export function menuQuantityChanges(lines:{quantity:number;fulfillment?:Serving}[],target:number,preferred:Serving){
 if(!Number.isInteger(target)||target<0||target>99)throw Error('Quantity must be an integer from 0 to 99');
 const total=lines.reduce((sum,line)=>sum+line.quantity,0),difference=target-total;
 if(difference>=0)return difference?[{mode:preferred,delta:difference}]:[];
 let remaining=-difference;const result:{mode:Serving;delta:number}[]=[];
 for(const mode of [preferred,preferred==='parcel'?'dine_in':'parcel'] as Serving[]){const available=lines.filter(line=>(line.fulfillment||'dine_in')===mode).reduce((sum,line)=>sum+line.quantity,0),take=Math.min(available,remaining);if(take)result.push({mode,delta:-take});remaining-=take;}
 return result;
}
