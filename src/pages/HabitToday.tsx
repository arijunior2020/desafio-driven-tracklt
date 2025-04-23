import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../contexts/UserContextBase";
import { ProgressContext } from "../contexts/ProgressContextBase";
import TodayHabit from "../components/TodayHabit";
import { api } from "../services/api";
import { User } from "../types/user";
import { TodayHabit as TodayHabitType } from "../types/habit";
import { ClipLoader } from "react-spinners";

export default function HabitToday() {
  const { user } = useContext(UserContext) as { user: User };
  const { setProgress } = useContext(ProgressContext);
  const [habits, setHabits] = useState<TodayHabitType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const config = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };

  useEffect(() => {
    setIsLoading(true);

    api
      .get("/habits/today", config)
      .then((res) => {
        setHabits(res.data);
        updateProgress(res.data);
      })
      .catch(() => {
        alert("Erro ao carregar hábitos de hoje.");
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 1500);
      });
  }, []);

  function updateProgress(habits: TodayHabitType[]) {
    const done = habits.filter((h) => h.done).length;
    const percent = habits.length > 0 ? (done / habits.length) * 100 : 0;
    setProgress(percent);
  }

  function toggleHabit(habit: TodayHabitType) {
    const endpoint = `/habits/${habit.id}/${habit.done ? "uncheck" : "check"}`;

    api
      .post(endpoint, {}, config)
      .then(() => {
        return api.get("/habits/today", config);
      })
      .then((res) => {
        setHabits(res.data);
        updateProgress(res.data);
      })
      .catch(() => {
        alert("Erro ao atualizar hábito.");
      });
  }

  const today = dayjs().locale("pt-br").format("dddd, DD/MM");

  return (
    <>
      <Header />
      <Container>
        <h2>{today}</h2>

        {isLoading ? (
          <LoadingContainer>
            <ClipLoader color="#52b6ff" size={80} />
            <span>Carregando hábitos...</span>
          </LoadingContainer>
        ) : habits.length === 0 ? (
          <p>Você ainda não tem hábitos para hoje.</p>
        ) : (
          habits.map((h) => (
            <TodayHabit
              key={h.id}
              name={h.name}
              done={h.done}
              currentSequence={h.currentSequence}
              highestSequence={h.highestSequence}
              onCheck={() => toggleHabit(h)}
            />
          ))
        )}
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  padding: 90px 18px 100px;
  background-color: #f2f2f2;
  min-height: 100vh;

  h2 {
    font-size: 23px;
    color: #126ba5;
    margin-bottom: 28px;
  }

  p {
    font-size: 18px;
    color: #666;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  color: #126ba5;
  font-family: "Lexend Deca", sans-serif;
  font-size: 16px;
  gap: 8px;
`;
