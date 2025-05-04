import { Habit } from './types';

// Generate some realistic sample data for the habits
export const generateMockData = (): Habit[] => {
  const habits: Habit[] = [
    {
      id: '1',
      name: 'Drink Water',
      category: 'Health',
      description: 'Stay hydrated throughout the day',
      goal: 8,
      unit: 'glasses',
      step: 0.5,
      maxPossible: 12,
      frequency: 'daily',
      streak: 5,
      today: {
        progress: 5,
        completed: false
      },
      history: generateHistoryData(5, 8)
    },
    {
      id: '2',
      name: 'Sleep',
      category: 'Wellness',
      description: 'Get quality sleep each night',
      goal: 8,
      unit: 'hours',
      step: 0.25,
      maxPossible: 12,
      frequency: 'daily',
      streak: 3,
      today: {
        progress: 7.5,
        completed: false
      },
      history: generateHistoryData(3, 8)
    },
    {
      id: '3',
      name: 'Exercise',
      category: 'Health',
      description: 'Daily physical activity',
      goal: 45,
      unit: 'minutes',
      step: 5,
      maxPossible: 120,
      frequency: 'daily',
      streak: 2,
      today: {
        progress: 30,
        completed: false
      },
      history: generateHistoryData(2, 45)
    },
    {
      id: '4',
      name: 'Read',
      category: 'Learning',
      description: 'Read books or articles',
      goal: 30,
      unit: 'minutes',
      step: 5,
      maxPossible: 120,
      frequency: 'daily',
      streak: 7,
      today: {
        progress: 15,
        completed: false
      },
      history: generateHistoryData(7, 30)
    },
    {
      id: '5',
      name: 'Meditate',
      category: 'Wellness',
      description: 'Mindfulness practice',
      goal: 10,
      unit: 'minutes',
      step: 1,
      maxPossible: 60,
      frequency: 'daily',
      streak: 4,
      today: {
        progress: 10,
        completed: true
      },
      history: generateHistoryData(4, 10)
    },
    {
      id: '6',
      name: 'Limit Screen Time',
      category: 'Wellness',
      description: 'Reduce non-work screen time',
      goal: 120,
      unit: 'minutes',
      step: 15,
      maxPossible: 360,
      frequency: 'daily',
      streak: 1,
      today: {
        progress: 90,
        completed: false
      },
      history: generateHistoryData(1, 120)
    }
  ];

  return habits;
};

// Helper function to generate history data
function generateHistoryData(streak: number, goal: number) {
  const history = [];
  const today = new Date();
  
  for (let i = 30; i >= 1; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // For days within the streak, mark as completed
    // For other days, randomize completion
    const isWithinStreak = i <= streak;
    const randomCompletion = Math.random() > 0.3;
    const completed = isWithinStreak || randomCompletion;
    
    // Generate a progress value based on completion status
    let progress;
    if (completed) {
      // If completed, progress is at least the goal, maybe a bit more
      progress = goal + (Math.random() * goal * 0.2);
    } else {
      // If not completed, progress is some percentage of the goal
      progress = goal * (0.3 + Math.random() * 0.6);
    }
    
    history.push({
      date: date.toISOString().split('T')[0],
      progress: Math.round(progress * 10) / 10,
      completed
    });
  }
  
  return history;
}