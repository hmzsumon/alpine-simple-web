export function hallLabel(name:string){const labels:Record<string,string>={"Ground Hall":"গ্রাউন্ড হল","Gents Hall":"জেন্টস হল","Family Hall":"ফ্যামিলি হল","Party Hall":"পার্টি হল"};return labels[name]||name;}

export function tableLabel(id:string,tables:readonly {id:string;name?:string;hallName?:string}[]=[],saved?:{tableName?:string;hallName?:string}){const table=tables.find(t=>t.id===id),name=saved?.tableName||table?.name||id,hall=saved?.hallName||table?.hallName;return `${hall?hallLabel(hall)+" · ":""}টেবিল ${name}`;}
