import type { JSX } from 'react';

import type { Slide, SlideComponent, Topic } from '../../types';
import { slugify } from '../slugify';
import { useSlides } from './hooks';
import { SlidesProvider, SlidesRouterProvider } from './providers';
import { slidesToRoutes, topicToRoute, createRootRoute } from './routeUtils';

function createSlides<T extends Topic[]>(slides: T): T {
  return slides;
}

type TopicProps = { title: string; slug?: string; slides: Slide[] };

function createTopic({ title, slug, slides }: TopicProps): Topic {
  return {
    title,
    slug: slug ?? slugify(title),
    slides,
  };
}

type SlideProps =
  | { title: string; component: SlideComponent; slug?: string }
  | { title: JSX.Element; component: SlideComponent; slug: string };

function getSlidePropsSlug(props: SlideProps): string {
  if ('slug' in props && props.slug) return props.slug;
  return slugify(props.title as string);
}

function createSlide(props: SlideProps): Slide {
  return {
    ...props,
    slug: getSlidePropsSlug(props),
  };
}

function createAssignment(props: SlideProps): Slide {
  return {
    ...createSlide(props),
    type: 'assignment',
  };
}

export {
  createAssignment,
  createSlide,
  createSlides,
  createTopic,
  SlidesProvider,
  SlidesRouterProvider,
  useSlides,
  topicToRoute,
  slidesToRoutes,
  createRootRoute,
};
