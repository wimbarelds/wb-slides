import { createContext } from 'react';

import type { Topic } from '../../types';

export const SlidesContext = createContext<Topic[]>([]);
