import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { getSummary } from "../../services";
import { SummaryProps } from "../../services/types";
import HabitDay from "../HabitDay";

import { amountOfDaysToFill, summaryDates, weekDays } from "./constants";

const SummaryTable = () => {
  const [summary, setSummary] = useState<SummaryProps[]>([]);

  const handleGetSummary = async () => {
    const data = await getSummary();
    setSummary(data);
  };

  useEffect(() => {
    handleGetSummary();
  }, []);
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => {
          return (
            <div
              key={`${weekDay}-${index}`}
              className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
            >
              {weekDay}
            </div>
          );
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map(date => {
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, "day")
          })
          return (
            <HabitDay
              key={String(date)}
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          );
        })}
        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill })
          .map((_value, index) => {
            return (
              <div
                key={String(index)}
                className={`
                  w-10
                  h-10
                  bg-zinc-900
                  border-2
                  border-zinc-800
                  rounded-lg
                  opacity-40
                  cursor-not-allowed
                `}
              />
            )
        })}
      </div>
    </div>
  );
};

export default SummaryTable;