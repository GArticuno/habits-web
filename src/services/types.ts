export type SummaryProps = {
  id: string;
  date: string;
  completed: number;
  amount: number;
};

export type CreateHabitRequest = {
  title: string;
  weekDays: number[];
}

export type DayRequest = {
  date: Date;
};

export type DayResponse = {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
};

export type ToggleHabitRequest = {
  id: string;
};