import type { HabitDayProps } from "./types";

const HabitDay = ({ completed }: HabitDayProps) => (
  <div className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg" />
);

export default HabitDay;