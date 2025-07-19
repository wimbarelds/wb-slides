import { createAssignment, createSlide, createSlides, createTopic } from '../../lib';
import Slide1 from './Topic 1/Slide1.mdx';
import Slide2 from './Topic 1/Slide2.mdx';
import Slide3 from './Topic 2/Slide3.mdx';
import Slide4 from './Topic 2/Slide4.mdx';

export const slides = createSlides([
  createTopic({
    title: 'Topic 1',
    slides: [
      createSlide({ title: 'Slide 1', component: Slide1 }),
      createAssignment({ title: 'Slide 2', component: Slide2 }),
    ],
  }),
  createTopic({
    title: 'Topic 2',
    slides: [
      createSlide({ title: 'Slide 3', component: Slide3 }),
      createSlide({ title: 'Slide 4', component: Slide4 }),
    ],
  }),
]);
