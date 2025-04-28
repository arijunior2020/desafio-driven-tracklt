import { useContext, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContextBase";
import { User } from "../types/user";
import { Habit as HabitType, CreateHabitData } from "../types/habit";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HabitItem from "../components/HabitItem";
import LoadingButton from "../components/LoadingButton";
import { api } from "../services/api";
import { ClipLoader } from "react-spinners";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function Habit() {
  const { user } = useContext(UserContext) as { user: User };
  const [habits, setHabits] = useState<HabitType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newHabit, setNewHabit] = useState("");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadHabits = useCallback(() => {
    if (!user?.token) return;

    setIsLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    api
      .get("/habits", config)
      .then((res) => setHabits(res.data))
      .catch(() => alert("Erro ao buscar hábitos"))
      .finally(() => setIsLoading(false));
  }, [user?.token]);

  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  function toggleDay(index: number) {
    if (selectedDays.includes(index)) {
      setSelectedDays(selectedDays.filter((d) => d !== index));
    } else {
      setSelectedDays([...selectedDays, index]);
    }
  }

  function saveHabit(e: React.FormEvent) {
    e.preventDefault();

    if (selectedDays.length === 0) {
      alert("Selecione pelo menos um dia para o hábito.");
      return;
    }

    setLoading(true);

    const start = Date.now();

    const body: CreateHabitData = {
      name: newHabit,
      days: selectedDays,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    api
      .post("/habits", body, config)
      .then(() => {
        setNewHabit("");
        setSelectedDays([]);
        setShowForm(false);
        loadHabits();
      })
      .catch(() => alert("Erro ao salvar hábito"))
      .finally(() => {
        const elapsed = Date.now() - start;
        const delay = Math.max(10000 - elapsed, 0);
        setTimeout(() => setLoading(false), delay);
      });
  }

  return (
    <>
      <Header />
      <Container>
        <Top>
          <h2>Meus hábitos</h2>
          <button
            data-test="habit-create-btn"
            onClick={() => setShowForm(!showForm)}
          >
            +
          </button>
        </Top>

        {showForm && (
          <Form onSubmit={saveHabit}>
            <input
              data-test="habit-name-input"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="nome do hábito"
              disabled={loading}
              required
            />
            <WeekDays>
              {weekDays.map((d, i) => (
                <Day
                  key={i}
                  type="button"
                  onClick={() => toggleDay(i)}
                  selected={selectedDays.includes(i)}
                  disabled={loading}
                >
                  {d}
                </Day>
              ))}
            </WeekDays>
            <Buttons>
              <button
                data-test="habit-create-cancel-btn"
                type="button"
                onClick={() => setShowForm(false)}
                disabled={loading}
              >
                Cancelar
              </button>
              <LoadingButton
                data-test="habit-create-save-btn"
                text="Salvar"
                loading={loading}
                disabled={loading}
                width="84px"
                height="35px"
              />
            </Buttons>
          </Form>
        )}

        {isLoading ? (
          <LoaderWrapper>
            <ClipLoader color="#52b6ff" size={80} />
            <span>Carregando hábitos...</span>
          </LoaderWrapper>
        ) : habits.length === 0 ? (
          <EmptyMessage>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </EmptyMessage>
        ) : (
          habits.map((h) => (
            <HabitItem key={h.id} name={h.name} days={h.days} />
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
`;

const LoaderWrapper = styled.div`
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

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 23px;
    color: #126ba5;
  }

  button {
    width: 40px;
    height: 35px;
    background: #52b6ff;
    border: none;
    border-radius: 5px;
    font-size: 27px;
    color: white;
  }
`;

const Form = styled.form`
  background: #fff;
  padding: 18px;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.03);

  input {
    width: 100%;
    height: 45px;
    padding: 0 11px;
    font-size: 20px;
    margin-bottom: 10px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-family: "Lexend Deca", sans-serif;
  }
`;

const WeekDays = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
`;

const Day = styled.button<{ selected: boolean }>`
  width: 30px;
  height: 30px;
  background: ${({ selected }) => (selected ? "#cfcfcf" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#dbdbdb")};
  border: 1px solid #d5d5d5;
  border-radius: 5px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    font-size: 16px;
    color: #52b6ff;
    background: none;
    border: none;
    font-family: "Lexend Deca", sans-serif;
  }
`;

const EmptyMessage = styled.p`
  font-size: 17.98px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  color: #666666;
  width: 338px;
  margin-left: 17px;
`;
