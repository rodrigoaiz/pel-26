import { course as frances1 } from './frances-1';
import { frances3 } from './frances-3';
import { frances4 } from './frances-4';
import type { Course } from './types';

export const courses = [frances1, frances3, frances4] satisfies Course[];

export function getCourse(courseSlug: string) {
  return courses.find((course) => course.slug === courseSlug);
}
