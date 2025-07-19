import { type PluginOption } from 'vite';

export function vitePluginMuiIcons(...names: string[]): PluginOption {
  return {
    name: 'mui-iconfont',
    transformIndexHtml: () => [
      {
        tag: 'link',
        attrs: {
          rel: 'stylesheet',
          href: `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,-25&&icon_names=${names.toSorted().join(',')}`,
        },
      },
    ],
  };
}
