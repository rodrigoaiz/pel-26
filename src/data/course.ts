import activityMenu from './menu_asignatura.json';

export type Lesson = {
  slug: string;
  title: string;
  subtitle: string;
  status: 'current' | 'next' | 'locked';
  kind: 'dialogue' | 'practice' | 'production' | 'review';
};

type MoodleActivity = {
  id: string;
  moduleName: string;
};

const moodleActivities = activityMenu.actividades as Record<string, MoodleActivity>;

/** Construye la ruta desde el mismo catálogo que usan las páginas PHP actuales. */
export function moodleActivityUrl(activityKey: string) {
  const activity = moodleActivities[activityKey];

  if (!activity) {
    throw new Error(`No existe la actividad Moodle "${activityKey}" en menu_asignatura.json.`);
  }

  return `/mod/${activity.moduleName}/view.php?id=${activity.id}`;
}

export const course = {
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
  ],
  unitTwo: [
    { slug: 'mon-age', title: 'Mon âge et ma date de naissance', subtitle: 'Decir tu edad y fecha de nacimiento', status: 'current', kind: 'dialogue' },
    { slug: 'ma-nationalite', title: 'Ma nationalité et mes données', subtitle: 'Compartir datos personales', status: 'next', kind: 'practice' },
    { slug: 'coordonnees', title: 'Mes coordonnées', subtitle: 'Teléfono, correo y dirección', status: 'next', kind: 'practice' },
    { slug: 'inscription', title: "M'inscrire à…", subtitle: 'Completar un formulario', status: 'next', kind: 'practice' },
    { slug: 'horaire', title: 'Mon emploi du temps', subtitle: 'Hablar del horario escolar', status: 'next', kind: 'practice' },
    { slug: 'matiere', title: 'Ma matière préférée', subtitle: 'Expresar preferencias', status: 'next', kind: 'practice' },
    { slug: 'heure', title: 'Quelle heure est-il ?', subtitle: 'Decir la hora', status: 'next', kind: 'dialogue' },
    { slug: 'routine', title: 'Ma routine', subtitle: 'Describir actividades diarias', status: 'next', kind: 'practice' },
    { slug: 'production', title: 'Production orale', subtitle: 'Usar lo aprendido', status: 'locked', kind: 'production' }
  ] satisfies Lesson[]
};
