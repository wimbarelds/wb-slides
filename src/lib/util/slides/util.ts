import type { RouteObject } from 'react-router';

import type { Topic } from '../../types';

function topicToRoute(topic: Topic, topicIndex: number): RouteObject {
  return {
    path: topicIndex === 0 ? '/' : `/${topic.slug}`,
    children: topic.slides.map((slide, slideIndex): RouteObject => {
      const path = !topicIndex && !slideIndex ? '/' : `/${topic.slug}/${slide.slug}`;
      return {
        index: slideIndex === 0,
        Component: slide.component,
        path,
        loader: () => ({ topic, topicIndex, slide, slideIndex }),
        HydrateFallback: () => null,
      };
    }),
  };
}

export function slidesToRoutes(topics: Topic[]): RouteObject[] {
  return topics.map(topicToRoute);
}
