import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../contexts/UserContextBase";
import { ProgressContext } from "../contexts/ProgressContextBase";
import { api } from "../services/api";
import { User } from "../types/user";
import { TodayHabit as TodayHabitType } from "../types/habit";
import { ClipLoader } from "react-spinners";

export default function HabitToday() {
  const { user } = useContext(UserContext) as { user: User };
  const { setProgress } = useContext(ProgressContext);
  const [habits, setHabits] = useState<TodayHabitType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingHabitId, setLoadingHabitId] = useState<number | null>(null); // <- para controlar loading individual

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
    setLoadingHabitId(habit.id); // Começa o loading no hábito clicado

    const endpoint = `/habits/${habit.id}/${habit.done ? "uncheck" : "check"}`;

    api
      .post(endpoint, {}, config)
      .then(() => api.get("/habits/today", config))
      .then((res) => {
        setHabits(res.data);
        updateProgress(res.data);
      })
      .catch(() => {
        alert("Erro ao atualizar hábito.");
      })
      .finally(() => {
        setLoadingHabitId(null); // Termina o loading
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
          habits.map((habit) => (
            <HabitCard key={habit.id}>
              <HabitInfo>
                <h3>{habit.name}</h3>
                <p>
                  Sequência atual: <strong>{habit.currentSequence} dias</strong>
                </p>
                <p>
                  Seu recorde: <strong>{habit.highestSequence} dias</strong>
                </p>
              </HabitInfo>

              <CheckButton
                onClick={() => toggleHabit(habit)}
                disabled={loadingHabitId === habit.id}
                isDone={habit.done}
              >
                {loadingHabitId === habit.id ? (
                  <ClipLoader color="#ffffff" size={14} />
                ) : (
                  "✓"
                )}
              </CheckButton>
            </HabitCard>
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

const HabitCard = styled.div`
  background: #ffffff;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HabitInfo = styled.div`
  h3 {
    font-size: 20px;
    color: #666666;
    margin-bottom: 8px;
    font-family: "Lexend Deca", sans-serif;
  }

  p {
    font-size: 13px;
    margin: 2px 0;
    font-family: "Lexend Deca", sans-serif;
  }
`;

const CheckButton = styled.button<{ isDone: boolean }>`
  width: 69px;
  height: 69px;
  background-color: ${({ isDone }) => (isDone ? "#8FC549" : "#EBEBEB")};
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  font-size: 36px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
