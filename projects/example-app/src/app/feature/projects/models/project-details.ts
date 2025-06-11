export interface ProjectDetails {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  startDate: string;
  endDate: string;
  budget: number;
  team: string[];
  technologies: string[];
  progress: number;
}
