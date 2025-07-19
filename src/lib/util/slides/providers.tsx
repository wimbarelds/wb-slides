import { type ComponentType, type ReactNode, useMemo } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';

import { Layout as DefaultLayout } from '../../components/layout/Layout';
import type { Topic } from '../../types';
import { SlidesContext } from './SlidesContext';
import { slidesToRoutes } from './util';

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
    return createBrowserRouter(
      [
        {
          path: '/',
          element: (
            <Layout>
              <Outlet />
            </Layout>
          ),
          children: slidesToRoutes(slides),
        },
      ],
      {
        basename: new URL(document.baseURI).pathname || undefined,
      },
    );
  }, [Layout, slides]);

  return (
    <SlidesProvider slides={slides}>
      <RouterProvider router={router} />
    </SlidesProvider>
  );
}
