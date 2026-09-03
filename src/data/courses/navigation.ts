import type { CollectionEntry } from 'astro:content';
import type { Course, CourseUnit, LearningGroup } from './types';
import { sitePath } from '../../utils/site-path';

type LessonEntry = CollectionEntry<'lessons'>;

export type CourseScreen = {
  entry: LessonEntry;
  slug: string;
  title: string;
  subtitle: string;
  status: 'current' | 'next' | 'locked';
  kind: 'dialogue' | 'practice' | 'production' | 'review';
  href: string;
  unit: LessonEntry['data']['unit'];
  learning: LessonEntry['data']['learning'];
  screenOrder: number;
};

const byPosition = (a: CourseScreen, b: CourseScreen) =>
  a.unit.order - b.unit.order ||
  a.learning.order - b.learning.order ||
  a.screenOrder - b.screenOrder;

export function getCourseScreens(entries: LessonEntry[], courseSlug: string): CourseScreen[] {
  return entries
    .filter((entry) => entry.data.course === courseSlug)
    .map((entry) => ({
      entry,
      slug: entry.id,
      title: entry.data.title,
      subtitle: entry.data.subtitle,
      status: entry.data.status,
      kind: entry.data.kind,
      unit: entry.data.unit,
      learning: entry.data.learning,
      screenOrder: entry.data.screenOrder,
      href: sitePath(`${courseSlug}/${entry.data.route ?? entry.id.replace(`${courseSlug}/`, '')}/`)
    }))
    .sort(byPosition);
}

export function getLearningGroups(screens: CourseScreen[]): LearningGroup[] {
  const groups = new Map<string, LearningGroup>();

  screens.forEach((screen) => {
    const group = groups.get(screen.learning.id) ?? {
      id: screen.learning.id,
      title: screen.learning.title,
      screens: []
    };
    group.screens.push({ id: screen.slug, title: screen.title, href: screen.href });
    groups.set(screen.learning.id, group);
  });

  return [...groups.values()];
}

export function getCourseNavigation(entries: LessonEntry[], course: Pick<Course, 'slug'>) {
  const screens = getCourseScreens(entries, course.slug);
  const unitMap = new Map<string, CourseUnit>();

  screens.forEach((screen) => {
    if (!unitMap.has(screen.unit.id)) {
      unitMap.set(screen.unit.id, {
        id: screen.unit.id,
        title: `Unidad ${screen.unit.order}`,
        theme: screen.unit.title,
        lessons: 0
      });
    }
  });

  const units = [...unitMap.values()];
  const lessonsByUnit = Object.fromEntries(units.map((unit) => [
    unit.id,
    screens.filter((screen) => screen.unit.id === unit.id)
  ]));
  const learningGroupsByUnit = Object.fromEntries(units.map((unit) => {
    const groups = getLearningGroups(lessonsByUnit[unit.id]);
    unit.lessons = groups.length;
    return [unit.id, groups];
  }));
  const featuredUnitId = units[0]?.id;
  const currentLessons = featuredUnitId ? lessonsByUnit[featuredUnitId] : [];

  return {
    screens,
    units,
    lessonsByUnit,
    learningGroupsByUnit,
    currentLessons,
    featuredUnitId,
    firstLessonHref: currentLessons[0]?.href ?? sitePath(`${course.slug}/`)
  };
}

export function getLessonNavigation(entries: LessonEntry[], entry: LessonEntry, course: Pick<Course, 'slug'>) {
  const courseNavigation = getCourseNavigation(entries, course);
  const currentIndex = courseNavigation.screens.findIndex((screen) => screen.entry.id === entry.id);
  const unitScreens = courseNavigation.lessonsByUnit[entry.data.unit.id] ?? [];
  const currentLearningIndex = getLearningGroups(unitScreens).findIndex((group) => group.id === entry.data.learning.id);

  return {
    lessons: courseNavigation.screens,
    nextLesson: courseNavigation.screens[currentIndex + 1],
    currentSlug: entry.id,
    progressLabel: `Aprendizaje ${currentLearningIndex + 1} de ${getLearningGroups(unitScreens).length}`,
    learningGroups: courseNavigation.learningGroupsByUnit[entry.data.unit.id] ?? [],
    unitLinks: courseNavigation.units.map((unit, index) => ({
      label: String(index + 1),
      href: courseNavigation.lessonsByUnit[unit.id][0].href,
      current: unit.id === entry.data.unit.id
    }))
  };
}

export function getCourseIndexPaths(courseList: Course[]) {
  return courseList.map((course) => ({ params: { course: course.slug }, props: { course } }));
}

export function getLessonPaths(entries: LessonEntry[], courseList: Course[]) {
  return entries.flatMap((entry) => {
    const course = courseList.find((item) => item.slug === entry.data.course);
    if (!course) return [];

    return [{
      params: {
        course: course.slug,
        slug: entry.data.route ?? entry.id.replace(`${course.slug}/`, '')
      },
      props: { course, entry }
    }];
  });
}
