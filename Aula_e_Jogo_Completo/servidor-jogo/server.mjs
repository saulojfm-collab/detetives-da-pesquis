import http from 'node:http';
import {randomBytes,timingSafeEqual} from 'node:crypto';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {rounds} from '../aula-docking/jogo-conteudo.mjs';
const here=path.dirname(fileURLToPath(import.meta.url));
const PUBLIC=path.resolve(process.env.STATIC_DIR||path.join(here,'../aula-docking'));
const PORT=Number(process.env.PORT||8787), HOST=process.env.HOST||'127.0.0.1';
const origins=(process.env.ALLOWED_ORIGINS||'').split(',').map(x=>x.trim()).filter(Boolean);
const rooms=new Map(),limits=new Map();const ttl=4*60*60*1000;
const token=()=>randomBytes(24).toString('hex');
const equal=(a,b)=>typeof a==='string'&&typeof b==='string'&&a.length===b.length&&timingSafeEqual(Buffer.from(a),Buffer.from(b));
const publicQuestion=r=>({place:r.place,title:r.title,story:r.story,question:r.question,options:r.options});
const authorized=(room,t)=>equal(room.host,t)?{host:true}:Object.values(room.players).find(p=>equal(p.token,t));
function snapshot(room,t){const who=authorized(room,t);if(!who)throw Error('Acesso à sala inválido.');const reveal=['reveal','finished'].includes(room.phase);const r=rounds[room.round];const players=Object.values(room.players);return{code:room.code,role:who.host?'host':'player',phase:room.phase,round:room.round,total:rounds.length,revision:room.revision,question:room.phase==='lobby'?null:publicQuestion(r),answer:reveal?{correct:r.correct,explanation:r.explanation,concept:r.concept,discuss:r.discuss}:null,answered:players.filter(p=>p.answers[room.round]!==undefined).length,players:players.map(p=>({id:p.id,name:p.name,score:p.score,answered:p.answers[room.round]!==undefined})),me:who.host?null:{id:who.id,name:who.name,score:who.score,choice:who.answers[room.round]??null},...(who.host?{distribution:r.options.map((_,i)=>players.filter(p=>p.answers[room.round]===i).length),responses:players.map(p=>({id:p.id,name:p.name,choices:p.answers,score:p.score}))}:{})};}
function broadcast(room){room.revision++;for(const c of room.clients){try{c.res.write('data: '+JSON.stringify(snapshot(room,c.token))+'\n\n')}catch{room.clients.delete(c)}}}
function fail(status,message){const e=Error(message);e.status=status;throw e}
async function body(req){let chunks=[],size=0;for await(const c of req){size+=c.length;if(size>8192)fail(413,'Pedido muito grande.');chunks.push(c)}try{return JSON.parse(Buffer.concat(chunks).toString()||'{}')}catch{fail(400,'Dados inválidos.')}}
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.json':'application/json','.md':'text/plain; charset=utf-8','.zip':'application/zip','.pdb':'text/plain; charset=utf-8'};
const server=http.createServer(async(req,res)=>{const url=new URL(req.url,'http://localhost');const origin=req.headers.origin;const sameOrigin=origin&&origin===`${req.socket.encrypted?'https':'http'}://${req.headers.host}`;const allowed=!origin||sameOrigin||origins.includes(origin);res.setHeader('Referrer-Policy','no-referrer');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Cache-Control','no-store');if(origin&&allowed){res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Vary','Origin');res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS');}const json=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(data))};try{
 if(url.pathname.startsWith('/api/')&&!allowed)fail(403,'A origem deste site não foi autorizada no serviço do jogo.');
 if(req.method==='OPTIONS'){res.writeHead(204);res.end();return}
 if(url.pathname==='/api/health'){json(200,{ok:true,service:'expedicao-bioprodutos',version:1});return}
 if(url.pathname.startsWith('/api/')){
  const ip=req.socket.remoteAddress;let rate=limits.get(ip);if(!rate||Date.now()-rate.time>60000){rate={time:Date.now(),count:0};limits.set(ip,rate)}if(++rate.count>1200)fail(429,'Muitas solicitações. Aguarde um momento.');
  if(req.method==='POST'&&url.pathname==='/api/rooms'){
   if(rooms.size>=100)fail(503,'Limite de salas atingido.');let code;do{code=[...randomBytes(6)].map(b=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[b%32]).join('')}while(rooms.has(code));const host=token();const room={code,host,players:{},round:0,phase:'lobby',revision:0,created:Date.now(),clients:new Set()};rooms.set(code,room);json(201,{code,token:host,state:snapshot(room,host)});return;
  }
  const match=url.pathname.match(/^\/api\/rooms\/([A-Z2-9]{6})(?:\/(join|events|command|answer))?$/);if(!match)fail(404,'Sala ou endereço não encontrado.');const room=rooms.get(match[1]);if(!room||Date.now()-room.created>ttl)fail(404,'Sala não encontrada ou expirada. Crie uma nova sala.');const action=match[2];
  if(req.method==='POST'&&action==='join'){
   if(room.phase!=='lobby')fail(409,'A expedição já começou. Peça ao professor para criar outra sala ou acompanhe a projeção.');if(Object.keys(room.players).length>=150)fail(409,'Sala completa.');const b=await body(req);const name=String(b.name||'').trim().replace(/[\u0000-\u001f]/g,'').slice(0,24);if(name.length<2)fail(400,'Use um apelido de 2 a 24 caracteres.');const id=randomBytes(6).toString('hex');const p={id,name,token:token(),answers:{},score:0};room.players[id]=p;broadcast(room);json(201,{code:room.code,token:p.token,state:snapshot(room,p.token)});return;
  }
  const t=action==='events'?url.searchParams.get('token'):(req.headers.authorization||'').replace(/^Bearer /,'');const who=authorized(room,t);if(!who)fail(403,'Acesso à sala inválido.');
  if(req.method==='GET'&&action==='events'){res.writeHead(200,{'Content-Type':'text/event-stream','Connection':'keep-alive','X-Accel-Buffering':'no'});res.write('data: '+JSON.stringify(snapshot(room,t))+'\n\n');const c={res,token:t};room.clients.add(c);const heartbeat=setInterval(()=>res.write(': conectado\n\n'),20000);req.on('close',()=>{clearInterval(heartbeat);room.clients.delete(c)});return;}
  if(req.method==='GET'&&!action){json(200,snapshot(room,t));return}
  if(req.method==='POST'&&action==='answer'){
   const b=await body(req);if(who.host)fail(403,'O professor conduz; não envia resposta como participante.');if(room.phase!=='question'||b.round!==room.round)fail(409,'Esta rodada já não está recebendo respostas.');if(who.answers[room.round]!==undefined)fail(409,'Sua resposta já foi registrada.');if(!Number.isInteger(b.choice)||b.choice<0||b.choice>=rounds[room.round].options.length)fail(400,'Alternativa inválida.');who.answers[room.round]=b.choice;broadcast(room);json(200,snapshot(room,t));return;
  }
  if(req.method==='POST'&&action==='command'){
   if(!who.host)fail(403,'Somente o professor pode conduzir as rodadas.');const b=await body(req);if(b.phase!==room.phase||b.round!==room.round)fail(409,'A sala avançou. Confira a rodada atual antes de continuar.');
   if(b.command==='start'&&room.phase==='lobby'){if(!Object.keys(room.players).length)fail(409,'Aguarde pelo menos um participante.');room.phase='question'}
   else if(b.command==='reveal'&&room.phase==='question'){for(const p of Object.values(room.players))if(p.answers[room.round]===rounds[room.round].correct)p.score+=2;room.phase='reveal'}
   else if(b.command==='next'&&room.phase==='reveal'&&room.round<rounds.length-1){room.round++;room.phase='question'}
   else if(b.command==='finish'&&room.phase==='reveal'&&room.round===rounds.length-1)room.phase='finished';
   else fail(409,'Ação incompatível com esta fase.');broadcast(room);json(200,snapshot(room,t));return;
  }fail(405,'Operação não disponível.');
 }
 if(req.method!=='GET'&&req.method!=='HEAD')fail(405,'Método não permitido.');const decoded=decodeURIComponent(url.pathname);const rel=decoded==='/'?'index.html':decoded.replace(/^\/+/, '');const full=path.resolve(PUBLIC,rel);if(!full.startsWith(PUBLIC+path.sep)||rel.split(/[\\/]/).some(v=>v.startsWith('.')))fail(404,'Arquivo não encontrado.');const st=await stat(full).catch(()=>null);if(!st?.isFile())fail(404,'Arquivo não encontrado.');res.writeHead(200,{'Content-Type':mime[path.extname(full)]||'application/octet-stream'});res.end(req.method==='HEAD'?undefined:await readFile(full));
 }catch(e){if(!res.headersSent)json(e.status||500,{error:e.status?e.message:'Não foi possível processar o pedido. Tente novamente.'});else res.end()}});
setInterval(()=>{for(const[code,r]of rooms)if(Date.now()-r.created>ttl){for(const c of r.clients)c.res.end();rooms.delete(code)}for(const[ip,l]of limits)if(Date.now()-l.time>120000)limits.delete(ip)},60000).unref();
server.listen(PORT,HOST,()=>console.log(`Expedição Bioprodutos: http://${HOST}:${PORT}\nSalas temporárias; encerrar este processo encerra as salas.`));
export {server};
