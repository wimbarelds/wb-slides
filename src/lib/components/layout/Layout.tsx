import { MDXProvider } from '@mdx-js/react';
import type { ReactNode } from 'react';

import { cn } from '../../util/cn';
import { useCurrentSlide } from '../../util/slides/hooks';
import { Prose } from '../common/Prose';
import { Nav } from './Nav';

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  const { type } = useCurrentSlide() ?? {};
  return (
    <>
      <div
        className={cn('fixed h-full bg-black/50 w-6xl max-w-full left-1/2 -translate-x-1/2')}
        data-background
      />
      <main className={cn('z-10 max-w-6xl p-12 pt-16 w-full mx-auto')} data-slide-type={type}>
        <MDXProvider components={{ wrapper: Prose }}>{children}</MDXProvider>
      </main>
      <Nav />
    </>
  );
}
