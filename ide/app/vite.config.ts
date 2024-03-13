import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import Unfonts from 'unplugin-fonts/vite';

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    build: {
      target: 'esnext'
    },
    server: {
      port: Number(process.env.VITE_PORT) || 3001,
    },
    plugins: [
      react(),
      Unfonts({
        google: {
          families: [{
            name: 'Montserrat',
            styles: 'wght@400;500;600;700'
          }]
        }
      })
    ],
    resolve: {
      alias: {
        '@root': resolve(__dirname, 'src'),
        '@configs': resolve(__dirname, 'src/configs'),
        '@components': resolve(__dirname, 'src/components'),
        '@layouts': resolve(__dirname, 'src/layouts'),
        '@screens': resolve(__dirname, 'src/screens')
      }
    }
  });
}


