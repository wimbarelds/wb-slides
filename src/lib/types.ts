import type { FunctionComponent, ReactNode } from 'react';

export type SlideComponent = FunctionComponent<Record<never, never>>;
export type JsonData = boolean | string | number | null | JsonData[] | { [key: string]: JsonData };

export interface Slide {
  title: ReactNode;
  component: SlideComponent;
  slug: string;
  type?: string;
}

export interface Topic {
  title: string;
  slides: Slide[];
  slug: string;
}

export type Slides = Topic[];
