import mdx from '@mdx-js/rollup';
import rehypeStarryNight from 'rehype-starry-night';
import { type PluginOption } from 'vite';

export function vitePluginMdx(): PluginOption {
  return {
    enforce: 'pre',
    ...mdx({ providerImportSource: '@mdx-js/react', rehypePlugins: [rehypeStarryNight] }),
  };
}
