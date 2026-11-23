import {defineConfig} from 'vite'
import raect from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
    plugins: [react(), tailwindcss()],})