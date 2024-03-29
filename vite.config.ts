import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react(), dts({ insertTypesEntry: true })],
   build: {
      lib: {
         entry: path.resolve(__dirname, 'src/index.ts'),
         name: 'hrnet-packages',
         fileName: 'index',
      },
      rollupOptions: {
         external: ['react', 'react-dom'],
         output: {
            globals: {
               react: 'React',
               'react-dom': 'ReactDom',
            },
         },
      },
   },
});
