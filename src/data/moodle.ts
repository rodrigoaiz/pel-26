import activityMenu from './menu_asignatura.json';

type MoodleActivity = {
  id: string;
  moduleName: string;
};

const moodleActivities = activityMenu.actividades as Record<string, MoodleActivity>;

/** Construye la ruta Moodle desde el catálogo legado; sin registro devuelve undefined para no romper el build. */
export function moodleActivityUrl(activityKey: string) {
  const activity = moodleActivities[activityKey];

  if (!activity) {
    console.warn(`[moodle] Falta la actividad "${activityKey}" en menu_asignatura.json; se muestra deshabilitada.`);
    return undefined;
  }

  return `/mod/${activity.moduleName}/view.php?id=${activity.id}`;
}
