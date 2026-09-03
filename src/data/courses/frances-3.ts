export type CourseUnit = {
  id: string;
  title: string;
  theme: string;
  lessons: number;
  topics: string[];
};

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
      theme: 'Intercambiar experiencias y proyectos',
      lessons: 6,
      topics: [
        'Parler de ses expériences',
        'Raconter un projet',
        'Exprimer son opinion',
        'Comparer des parcours',
        'Comprendre un témoignage',
        'Production orale'
      ]
    },
    {
      id: 'u2',
      title: 'Unidad 2',
      theme: 'Participar en la vida social',
      lessons: 6,
      topics: [
        'Inviter et proposer',
        'Accepter ou refuser',
        'Organiser une sortie',
        'Donner des conseils',
        'Écrire un message',
        'Production écrite'
      ]
    },
    {
      id: 'u3',
      title: 'Unidad 3',
      theme: 'Comprender el mundo que nos rodea',
      lessons: 6,
      topics: [
        'Décrire un lieu',
        'Parler de l’environnement',
        'Exprimer la cause et la conséquence',
        'Débattre en groupe',
        'Présenter une initiative',
        'Évaluation finale'
      ]
    }
  ] satisfies CourseUnit[]
};
