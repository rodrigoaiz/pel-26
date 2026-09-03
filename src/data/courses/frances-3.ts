import type { Course } from './types';

export const frances3 = {
  slug: 'frances-3',
  title: 'Francés III',
  plan: 'Plan nuevo',
  description: 'Un espacio de trabajo para organizar el siguiente tramo de tu recorrido en francés.',
  status: 'Índice tentativo',
  units: [
    {
      id: 'u1',
      title: 'Unidad 1',
      theme: 'La invitación',
      lessons: 4,
      topics: [
        'Actividades recreativas, culturales y pasatiempos',
        'Momentos del día y meses del año',
        'Saludos y despedidas',
        'Elementos básicos de una invitación escrita'
      ]
    },
    {
      id: 'u2',
      title: 'Unidad 2',
      theme: 'El futuro: Quand je serai grand-e...',
      lessons: 4,
      topics: [
        'Hablar de actividades futuras',
        'Proyectar',
        'Vida personal: viajes, residencia, trabajo y familia'
      ]
    },
    {
      id: 'u3',
      title: 'Unidad 3',
      theme: 'Nuestro porvenir: Agissons!',
      lessons: 3,
      topics: [
        'Comprender documentos sobre desafíos globales',
        'Dar una opinión sobre temas comunitarios',
        'Crear un proyecto comunitario'
      ]
    }
  ]
} satisfies Course;
