import activityMenu from './menu_asignatura.json';

type MoodleActivity = {
  id: string;
  moduleName: string;
};

const moodleActivities = activityMenu.actividades as Record<string, MoodleActivity>;

/** Construye la ruta Moodle desde el catálogo legado de actividades. */
export function moodleActivityUrl(activityKey: string) {
  const activity = moodleActivities[activityKey];

  if (!activity) {
    throw new Error(`No existe la actividad Moodle "${activityKey}" en menu_asignatura.json.`);
  }

  return `/mod/${activity.moduleName}/view.php?id=${activity.id}`;
}
