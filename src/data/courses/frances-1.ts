import activityMenu from '../menu_asignatura.json';

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
  ]
};
