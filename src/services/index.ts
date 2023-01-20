import { AxiosError } from "axios";
import { api } from "../lib/axios";
import { CreateHabitRequest, DayRequest, DayResponse, SummaryProps, ToggleHabitRequest } from "./types";

export const getSummary = async () => {
  try {
    const response  = await api.get<SummaryProps[]>("/summary");
    return response.data;
  } catch (err) {
    console.log("Get Summary", err);
    return [];
  };
};

export const createHabit = async (data: CreateHabitRequest) => {
  try {
    await api.post("/habits", data);
    return true;
  } catch (err) {
    console.log("Create Habit", err);
    return false;
  };
};

export const getDay = async (params: DayRequest) => {
  try {
    const response  = await api.get<DayResponse>("/day", {
      params,
    });
    return response.data;
  } catch (err) {
    console.log("Get Day", err);
    return [];
  };
};

export const toggleHabit = async ({ id }: ToggleHabitRequest) => {
  try {
    await api.patch(`/habits/${id}/toggle`);
    return true;
  } catch (err) {
    console.log("Toggle Habit", err);
    return false;
  };
};
