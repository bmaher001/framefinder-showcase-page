import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
export default defineConfig({plugins:[react()],build:{rollupOptions:{input:{main:resolve('index.html'),demo:resolve('demo/index.html')}}},server:{host:'127.0.0.1',port:5180,proxy:{'/api':'http://127.0.0.1:5181'}}});
