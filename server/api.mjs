import {mkdir,appendFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {randomUUID} from 'node:crypto';
const rates=new Map();
const reply=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
export async function api(req,res){
 if(req.url!=='/api/applications')return false;
 if(req.method!=='POST'){reply(res,405,{error:'Use POST to submit an application.'});return true;}
 const origin=req.headers.origin;
 if(origin){let host;try{host=new URL(origin).host}catch{reply(res,403,{error:'Invalid origin.'});return true}if(host!==req.headers.host&&origin!==process.env.PUBLIC_ORIGIN){reply(res,403,{error:'Submission origin is not allowed.'});return true}}
 if(!req.headers['content-type']?.startsWith('application/json')){reply(res,415,{error:'Expected a JSON application.'});return true;}
 let body='';try{for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>8192){reply(res,413,{error:'Application is too large.'});return true;}}}catch{reply(res,400,{error:'Unable to read the application.'});return true;}
 let input;try{input=JSON.parse(body)}catch{reply(res,400,{error:'Please submit a valid application.'});return true;}
 if(!input||typeof input!=='object'||Array.isArray(input)){reply(res,400,{error:'Please complete the application.'});return true;}
 if(input.website){reply(res,400,{error:'Unable to accept this application.'});return true;}
 const fields={};for(const [key,max]of Object.entries({name:120,email:254,role:120,company:160})){if(input[key]!=null&&typeof input[key]!=='string'){reply(res,400,{error:'Please check your application details.'});return true;}fields[key]=(input[key]||'').trim();if(fields[key].length>max||/[\u0000-\u001f]/.test(fields[key])){reply(res,400,{error:'Please check your application details.'});return true;}}
 if(fields.name.length<2||!fields.role||!/^\S+@[^\s@]+\.[^\s@]+$/.test(fields.email)){reply(res,400,{error:'Please provide your name, a valid email address and profession.'});return true;}
 const ip=req.socket.remoteAddress||'unknown',now=Date.now();for(const [key,value]of rates)if(now-value.start>3600000)rates.delete(key);const record=rates.get(ip)||{start:now,count:0};if(record.count>=10){reply(res,429,{error:'Too many applications. Please try again later.'});return true;}
 const id=randomUUID();try{const file=resolve(process.env.APPLICATIONS_FILE||'.data/applications.jsonl');await mkdir(dirname(file),{recursive:true,mode:0o700});await appendFile(file,JSON.stringify({id,createdAt:new Date().toISOString(),...fields})+'\n',{mode:0o600});record.count++;rates.set(ip,record);reply(res,201,{ok:true,id});}catch{reply(res,503,{error:'We could not save your application. Please try again shortly.'});}
 return true;
}
