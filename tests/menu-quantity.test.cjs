const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),ts=require('typescript'),React=require('react');
function compile(file,req=require){const box={exports:{},require:req};vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,box);return box.exports;}
function nodes(tree){return !tree||typeof tree!=='object'?[]:[tree,...React.Children.toArray(tree.props?.children).flatMap(nodes)];}
function entry(){let index=0;const state=[],changes=[],effects=[];const hooks={...React,useState:init=>{const i=index++;if(!(i in state))state[i]=init;return [state[i],v=>state[i]=typeof v==='function'?v(state[i]):v];},useRef:init=>{const i=index++;if(!(i in state))state[i]={current:init};return state[i];},useEffect:(fn,deps)=>{const i=index++;if(!state[i]||deps.some((v,j)=>v!==state[i][j])){state[i]=deps;effects.push(fn);}}};const C=compile('components/menu/MenuQuantityEntry.tsx',p=>p==='react'?hooks:require(p)).default;const render=()=>{index=0;const result=C({name:'পরোটা',quantity:0,disabled:false,onConfirm:n=>(changes.push(n),true)});while(effects.length)effects.shift()();return nodes(result);};return {changes,render,input:()=>render().find(n=>n.type==='input'),button:()=>render().find(n=>n.props?.['aria-label']==='পরোটা পরিমাণ নিশ্চিত করুন')};}
test('web quantity typing and step buttons do not submit a partial number; Enter confirms once',()=>{
 const h=entry();h.input().props.onChange({target:{value:'1'}});h.input().props.onChange({target:{value:'১২'}});assert.equal(h.input().props.value,'12');assert.equal(h.changes.length,0);const commit=h.input().props.onKeyDown;commit({key:'Enter',preventDefault(){}});commit({key:'Enter',preventDefault(){}});assert.deepEqual(h.changes,[12]);
});
test('web blank and invalid quantities cannot confirm or clear the current search',()=>{
 const h=entry();for(const value of ['', '100']){h.input().props.onChange({target:{value}});assert.equal(h.button().props.disabled,true);h.button().props.onClick();assert.equal(h.changes.length,0);}
});
test('web total updates preserve parcel splits rather than silently dropping part of a food',()=>{
 const {menuQuantityChanges}=compile('utils/menuQuantity.ts'),lines=[{quantity:2,fulfillment:'dine_in'},{quantity:3,fulfillment:'parcel'}];assert.equal(JSON.stringify(menuQuantityChanges(lines,1,'dine_in')),JSON.stringify([{mode:'dine_in',delta:-2},{mode:'parcel',delta:-2}]));assert.throws(()=>menuQuantityChanges(lines,100,'dine_in'));
});

test('web quantity keeps every rapid plus tap before confirming the selected food',()=>{const h=entry();const plus=h.render().find(n=>n.props?.['aria-label']==='পরোটা পরিমাণ বাড়ান');for(let i=0;i<4;i++)plus.props.onClick();assert.equal(h.input().props.value,'5');assert.equal(h.changes.length,0);h.button().props.onClick();assert.deepEqual(h.changes,[5]);});
