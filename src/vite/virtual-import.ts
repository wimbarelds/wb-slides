import { registerHooks } from 'node:module';

export function virtualImport(code: string) {
  const virtualPath = `./virtual-${Math.random().toString(36).slice(2)}.js`;
  const virtualFullPath = import.meta.resolve(virtualPath);
  const hook = registerHooks({
    resolve: (specifier, context, next) => {
      if (specifier !== virtualPath) return next(specifier, context);
      return { url: virtualFullPath, format: 'module', shortCircuit: true };
    },
    load: (url, context, next) => {
      if (url !== virtualFullPath) return next(url, context);
      hook.deregister();
      return { source: code, format: 'module', shortCircuit: true };
    },
  });

  return import(virtualPath);
}
