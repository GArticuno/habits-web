import { generateDatesFromYearBeginning } from "../../utils/generateDatesFromYearBeginning";

export const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

export const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7;
export const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;