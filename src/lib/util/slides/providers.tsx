import { type ComponentType, type ReactNode, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { Layout as DefaultLayout } from '../../components/layout/Layout';
import type { Topic } from '../../types';
import { SlidesContext } from './SlidesContext';
import { createRootRoute, slidesToRoutes } from './routeUtils';

interface SlidesProviderProps {
  slides: Topic[];
  children: ReactNode;
}

export function SlidesProvider({ slides, children }: SlidesProviderProps) {
  return <SlidesContext.Provider value={slides}>{children}</SlidesContext.Provider>;
}

interface SlidesRouterProviderProps {
  slides: Topic[];
  Layout?: ComponentType<{ children: ReactNode }>;
}

export function SlidesRouterProvider({
  slides,
  Layout = DefaultLayout,
}: SlidesRouterProviderProps) {
  const router = useMemo(() => {
    const rootRoute = createRootRoute({
      LayoutComponent: Layout,
      children: slidesToRoutes(slides),
    });

    const basename = new URL(document.baseURI).pathname || undefined;
    return createBrowserRouter([rootRoute], { basename });
  }, [Layout, slides]);

  return (
    <SlidesProvider slides={slides}>
      <RouterProvider router={router} />
    </SlidesProvider>
  );
}
