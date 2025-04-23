export interface Habit {
  id: number;
  name: string;
  days: number[];
}

export interface CreateHabitData {
  name: string;
  days: number[];
}

export interface TodayHabit {
  id: number;
  name: string;
  done: boolean;
  currentSequence: number;
  highestSequence: number;
}
