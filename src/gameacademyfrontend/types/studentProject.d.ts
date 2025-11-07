export interface StudentProject {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  year: number;
  authors: Array<{
    name: string;
    slug: string;
    role: string;
  }>;
  markdown?: string;
  tags?: string[];
  status: 'active' | 'completed' | 'archived';
  githubUrl?: string;
  demoUrl?: string;
}