import '../lib/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { SlidesRouterProvider } from '../lib';
import { slides } from './slides';

createRoot(document.querySelector('#app')!).render(
  <StrictMode>
    <SlidesRouterProvider slides={slides} />
  </StrictMode>,
);
