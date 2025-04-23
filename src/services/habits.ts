import { api } from "./api";
import { Habit, TodayHabit, CreateHabitData } from "../types/habit";

export function getHabits(token: string) {
  return api.get<Habit[]>("/habits", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function createHabit(token: string, data: CreateHabitData) {
  return api.post<Habit>("/habits", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getTodayHabits(token: string) {
  return api.get<TodayHabit[]>("/habits/today", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function checkHabit(token: string, habitId: number) {
  return api.post(
    `/habits/${habitId}/check`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

export function uncheckHabit(token: string, habitId: number) {
  return api.post(
    `/habits/${habitId}/uncheck`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}
