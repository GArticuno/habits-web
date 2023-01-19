import HabitDay from "../HabitDay";

import { generateDatesFromYearBeginning } from "../../utils/generateDatesFromYearBeginning";

const SummaryTable = () => {
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const summaryDates = generateDatesFromYearBeginning();

  const minimumSummaryDatesSize = 18 * 7;
  const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

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
          return (
            <HabitDay
              key={String(date)}
              amount={5}
              completed={4}
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