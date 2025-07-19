import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import dts from 'unplugin-dts/vite';
import { defineConfig } from 'vite';

import { vitePluginGhPagesBase, vitePluginMdx, vitePluginMuiIcons } from './src/vite-plugins';

export default defineConfig(({ command }) => ({
  plugins: [
    vitePluginMdx(),
    react(),
    tailwindcss(),
    vitePluginGhPagesBase(),
    vitePluginMuiIcons(
      'chevron_right',
      'chevron_left',
      'stat_1',
      'stat_minus_1',
      'more_horiz',
      'construction',
    ),
    ...(command === 'build'
      ? [dts({ tsconfigPath: './tsconfig.build.json', bundleTypes: true })]
      : []),
  ],
  build: {
    lib: {
      entry: {
        main: resolve(import.meta.dirname, 'src/lib/index.ts'),
        vitePlugins: resolve(import.meta.dirname, 'src/vite-plugins/index.ts'),
      },
    },
    rollupOptions: {
      external: [
        'clsx',
        'react',
        'react/jsx-runtime',
        'react-dom',
        'react-markdown',
        'react-router',
        'react-syntax-highlighter',
        '@mdx-js/rollup',
        '@mdx-js/react',
        'remark-gfm',
        'tailwind-merge',
        'vite',
        'fs',
        'path',
        'process',
      ],
    },
  },
}));
