import { type PluginOption } from 'vite';

import { fromCache, toCache } from './plugin-cache';

const BROWSER_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const cssBaseUrl = 'https://fonts.googleapis.com/css2';
const family = 'Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,-25';

async function load(
  url: string,
  parser: (response: Response) => string | Promise<string>,
): Promise<string> {
  const cached = await fromCache(url);
  if (cached) return cached;

  const result = await fetch(url, { headers: { 'User-Agent': BROWSER_USER_AGENT } }).then((res) =>
    parser(res),
  );
  await toCache(url, result);
  return result;
}

interface Options {
  inline?: 'none' | 'css' | 'full';
}

export function vitePluginMuiIcons(names: string[], options: Options = {}): PluginOption {
  return getPluginOption(names, options).then((option) => [option]);
}

async function getPluginOption(names: string[], options: Options = {}): Promise<PluginOption> {
  const { inline = 'css' } = options;

  const iconNames = names.toSorted().join(',');
  const cssUrl = `${cssBaseUrl}?family=${family}&icon_names=${iconNames}`;

  if (inline === 'none') {
    return {
      name: 'mui-iconfont',
      transformIndexHtml: () => [
        { tag: 'link', injectTo: 'head', attrs: { rel: 'stylesheet', href: cssUrl } },
      ],
    };
  }

  try {
    const css = await load(cssUrl, (res) => res.text());
    if (inline === 'css') {
      return {
        name: 'mui-iconfont',
        transformIndexHtml: () => [
          {
            tag: 'style',
            njectTo: 'head',
            attrs: { type: 'text/css' },
            children: css.replace(/(\r|\n|\s){2,}/g, ' '),
          },
        ],
      };
    }

    const matches = [...new Set(css.match(/url\([^)]+\)/g) || [])];
    const updatedCss = await matches.reduce(async (prevPromise, fontUrlCss): Promise<string> => {
      const fontUrl = fontUrlCss.slice(4, -1);
      const prev = await prevPromise;
      const font = await load(fontUrl, async (res) => {
        const buffer = await res.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        return `data:font/woff2;base64,${base64}`;
      });
      return prev.split(fontUrlCss).join(`url('${font}')`);
    }, Promise.resolve(css));

    return {
      name: 'mui-iconfont',
      transformIndexHtml: () => [
        {
          tag: 'style',
          njectTo: 'head',
          attrs: { type: 'text/css' },
          children: updatedCss.replace(/(\r|\n|\s){2,}/g, ' '),
        },
      ],
    };
  } catch (_ex) {
    return getPluginOption(names, { ...options, inline: 'none' });
  }
}
