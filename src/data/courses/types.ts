export type Lesson = {
  slug: string;
  title: string;
  subtitle: string;
  status: 'current' | 'next' | 'locked';
  kind: 'dialogue' | 'practice' | 'production' | 'review';
  href?: string;
};
