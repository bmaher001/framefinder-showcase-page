import http from 'node:http';
import {createServer} from 'vite';
import {api} from './api.mjs';
const apiServer=http.createServer(async(req,res)=>{if(!await api(req,res)){res.writeHead(404);res.end();}});
apiServer.listen(5181,'127.0.0.1');const vite=await createServer();await vite.listen();vite.printUrls();
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,async()=>{await vite.close();apiServer.close();process.exit(0)});
