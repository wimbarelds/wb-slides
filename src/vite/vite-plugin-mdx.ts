import mdx from '@mdx-js/rollup';
import { type PluginOption } from 'vite';

export function vitePluginMdx(): PluginOption {
  return {
    enforce: 'pre',
    ...mdx({ providerImportSource: '@mdx-js/react' }),
  };
}
