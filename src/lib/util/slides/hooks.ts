import { useContext, useMemo } from 'react';
import { useMatches, useNavigate } from 'react-router';

import type { Slide, Topic } from '../../types';
import { SlidesContext } from './SlidesContext';

export function useSlides() {
  const topics = useContext(SlidesContext);
  return useMemo(() => {
    return topics.map((topic, topicIndex) => {
      const firstSlide = topic.slides[0];
      const topicPath = topicIndex === 0 ? '/' : `/${topic.slug}/${firstSlide.slug}`;
      return {
        ...topic,
        path: topicPath,
        slides: topic.slides.map((slide, slideIndex) => {
          const path = !topicIndex && !slideIndex ? '/' : `/${topic.slug}/${slide.slug}`;
          return { ...slide, path };
        }),
      };
    });
  }, [topics]);
}

interface NavigationData {
  topicIndex?: number;
  slideIndex?: number;
  slide?: Slide;
  topic?: Topic;
}

export function useNavigationData() {
  const matches = useMatches();
  return (matches.at(-1)?.data ?? {}) as NavigationData;
}

export function useCurrentSlide() {
  const { slide } = useNavigationData();
  return slide;
}

export function useNavIndeces() {
  const { topicIndex, slideIndex } = useNavigationData();
  return [topicIndex ?? 0, slideIndex ?? 0];
}

export function useHasPrevSlide() {
  const [topicIndex, slideIndex] = useNavIndeces();
  return topicIndex > 0 || slideIndex > 0;
}

export function useHasNextSlide() {
  const slides = useSlides();
  const lastTopicIndex = slides.length - 1;
  const lastSlideIndex = slides[lastTopicIndex].slides.length - 1;
  const [topicIndex, slideIndex] = useNavIndeces();
  return topicIndex < lastTopicIndex || slideIndex < lastSlideIndex;
}

export function useSlideNav(): [() => void, () => void] {
  const topics = useSlides();
  const navigate = useNavigate();

  const flatSlides = useMemo(() => {
    return topics.flatMap((topic, topicIndex) =>
      topic.slides.map((slide, slideIndex) => {
        return {
          topic,
          topicIndex,
          slide,
          slideIndex,
          path: slide.path,
        };
      }),
    );
  }, [topics]);

  const [currentTopicIndex, currentSlideIndex] = useNavIndeces();
  const currentFlatIndex = flatSlides.findIndex(
    ({ topicIndex, slideIndex }) =>
      topicIndex === currentTopicIndex && slideIndex === currentSlideIndex,
  );

  return [
    () => {
      if (currentFlatIndex <= 0) return;
      const newIndex = currentFlatIndex - 1;
      const { path } = flatSlides[newIndex];
      navigate(path);
    },
    () => {
      if (currentFlatIndex >= flatSlides.length - 1) return;
      const newIndex = currentFlatIndex + 1;
      const { path } = flatSlides[newIndex];
      navigate(path);
    },
  ];
}
