export type CourseUnit = {
  id: string;
  title: string;
  theme: string;
  lessons: number;
  topics?: string[];
};

export type Course = {
  slug: string;
  title: string;
  plan: string;
  description?: string;
  status?: string;
  units: CourseUnit[];
};

export type LessonScreen = {
  id: string;
  title: string;
  href?: string;
};

export type LearningGroup = {
  id: string;
  title: string;
  screens: LessonScreen[];
};

export type Lesson = {
  slug: string;
  title: string;
  subtitle: string;
  status: 'current' | 'next' | 'locked';
  kind: 'dialogue' | 'practice' | 'production' | 'review';
  href?: string;
};
