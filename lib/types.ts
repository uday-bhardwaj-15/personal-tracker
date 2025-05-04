export type User = {
  name: string;
  avatar: string;
  streakDays: number;
};

export type Habit = {
  id: string;
  name: string;
  category: string;
  icon?: string;
  description?: string;
  goal: number;
  unit: string;
  step?: number;
  maxPossible?: number;
  frequency: 'daily' | 'weekly';
  streak: number;
  today: {
    progress: number;
    completed: boolean;
  };
  history: {
    date: string;
    progress: number;
    completed: boolean;
  }[];
};