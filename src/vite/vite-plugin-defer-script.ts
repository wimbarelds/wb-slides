import type { Plugin, PluginOption } from 'vite';

const regex = /<script .* src="\/assets\/index-[a-zA-Z0-9]+\.js"><\/script>/;

type FilterProps = Pick<Plugin, 'apply' | 'applyToEnvironment'>;

const defaultFilterProps: FilterProps = {
  apply(userConfig, env) {
    if (env.command !== 'build') return false;
    if (!userConfig.environments) return false;
    return Object.values(userConfig.environments).some((env) => env.consumer === 'server');
  },
  applyToEnvironment(environment) {
    if (environment.config.consumer !== 'client') return false;
  },
};

function getFilterProps(filterRun: boolean | FilterProps): FilterProps {
  if (!filterRun) return {};
  if (filterRun === true) return defaultFilterProps;
  return filterRun;
}

interface Options {
  scriptRegex?: RegExp;
  filterRun?: boolean | FilterProps;
}

export function vitePluginDeferScript({
  scriptRegex = regex,
  filterRun = true,
}: Options = {}): PluginOption {
  return {
    ...getFilterProps(filterRun),
    name: 'defer-script',
    enforce: 'post',
    transformIndexHtml: (html, _context) => {
      const [match] = [...(html.match(scriptRegex) ?? [])];
      if (!match) {
        console.log('[vite-plugin-defer-script]: No script found');
        return html;
      }
      if ([' defer', ' async', ' blocking'].some((attr) => match.includes(attr))) return html;
      return html.replace(match, `<script defer ${match.slice(8)}`);
    },
  };
}
