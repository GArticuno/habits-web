import * as CheckboxRadix from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";

import { getDay, toggleHabit } from "../../../services";
import { DayResponse } from "../../../services/types";

import { CheckboxComponentProps } from "./types";

const HabitsList = ({ date, onCompletedChanged }: CheckboxComponentProps) => {
  const [day, setDay] = useState<DayResponse | null>(null);
  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  const handleGetDay = async () => {
    const data = await getDay({ date });
    setDay(data);
  };

  const handleToggleHabit = async (habitId: string) => {
    if(day) {
      const isHabitAlreadyCompleted = day.completedHabits.includes(habitId);
      await toggleHabit({ id: habitId });

      let completedHabits: string[] = [];

      if(isHabitAlreadyCompleted) {
        completedHabits = day.completedHabits.filter(id => id !== habitId);
      } else {
        completedHabits = [...day.completedHabits, habitId];
      }

      setDay({
        possibleHabits: day.possibleHabits,
        completedHabits,
      });

      onCompletedChanged(completedHabits.length);
    }
  };

  useEffect(() => {
    handleGetDay();
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-3">
      {day?.possibleHabits.map((item, index) => {
        return (
          <CheckboxRadix.Root
            className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
            key={item.id}
            disabled={isDateInPast}
            checked={day.completedHabits.includes(item.id)}
            onCheckedChange={() => handleToggleHabit(item.id)}
          >
            <div
              className={`
                w-8
                h-8
                rounded-lg
                flex
                items-center
                justify-center
                bg-zinc-900
                border-2
                border-zinc-800
                transition-colors
                group-data-[state=checked]:bg-green-500
                group-data-[state=checked]:border-green-500
                group-focus:ring-2
                group-focus:ring-violet-700
                group-focus:ring-offset-2
                group-focus:ring-offset-background
              `}
            >
              <CheckboxRadix.Indicator>
                <Check size={20} className="text-white" />
              </CheckboxRadix.Indicator>
            </div>
            <span
              className={`
                font-semibold
                text-xl
                text-white
                leading-tight
                group-data-[state=checked]:line-through
                group-data-[state=checked]:text-zinc-400
              `}
            >
              {item.title}
            </span>
          </CheckboxRadix.Root>
        );
      })}
    </div>
  );
};

export default HabitsList;