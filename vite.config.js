import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
dotenv.config();
//import WindiCSS from 'vite-plugin-windicss';
// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [react()],
  server:{
    port:3000,
  }
})
