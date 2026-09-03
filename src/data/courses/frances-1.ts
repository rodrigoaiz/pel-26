import type { Course } from './types';

export const course = {
  slug: 'frances-1',
  title: 'Francés I',
  plan: 'Plan nuevo',
  units: [
    {
      id: 'u1',
      title: 'Unidad 1',
      theme: 'Primeras conversaciones',
      lessons: 5
    },
    {
      id: 'u2',
      title: 'Unidad 2',
      theme: 'Hablar de mí',
      lessons: 9
    },
    {
      id: 'u3',
      title: 'Unidad 3',
      theme: 'Personas y vida cotidiana',
      lessons: 10
    }
  ]
} satisfies Course;
