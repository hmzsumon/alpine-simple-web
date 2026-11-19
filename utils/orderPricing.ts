/* ── Only fish and the plain-rice dish allow a price for an individual order ── */
import {isFishCategory} from './fishPricing';
interface PriceItem {category?:unknown;name?:unknown;nameBn?:unknown;}
const normalized=(value:unknown)=>typeof value==='string'?value.normalize('NFKC').toLowerCase().replace(/[\s()._-]+/g,'').trim():'';
export function isRiceDish(item:PriceItem|null|undefined){if(!item)return false;const category=normalized(item.category);if(!['rice&sides','rice','ভাতওঅন্যান্য','ভাত'].includes(category))return false;return [item.name,item.nameBn].some(name=>['plainricedish','whitericedish','ricedish','সাদাভাতডিশ','সাদাভাতডিস','ভাতডিশ','ভাতডিস','ভাতেরডিশ','ভাতেরডিস'].includes(normalized(name)));}
export const canSetOrderPrice=(item:PriceItem|null|undefined)=>!!item&&(isFishCategory(typeof item.category==='string'?item.category:'')||isRiceDish(item));
