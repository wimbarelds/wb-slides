import { MDXProvider } from '@mdx-js/react';
import type { ReactNode } from 'react';

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
      <main className="z-10 max-w-3xl p-12 w-full mx-auto bg-gray-950/50" data-slide-type={type}>
        <MDXProvider components={{ wrapper: Prose }}>{children}</MDXProvider>
      </main>
      <Nav />
    </>
  );
}
