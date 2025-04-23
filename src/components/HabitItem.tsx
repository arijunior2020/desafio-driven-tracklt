import styled from "styled-components";

interface Props {
  name: string;
  days: number[];
}

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function HabitItem({ name, days }: Props) {
  return (
    <HabitContainer>
      <h3>{name}</h3>
      <DaysContainer>
        {weekDays.map((d, i) => (
          <Day key={i} selected={days.includes(i)}>
            {d}
          </Day>
        ))}
      </DaysContainer>
    </HabitContainer>
  );
}

const HabitContainer = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.03);

  h3 {
    font-size: 20px;
    font-weight: 700;
    font-family: "Lexend Deca", sans-serif;
    color: #666666;
  }
`;

const DaysContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 10px;
`;

const Day = styled.div<{ selected: boolean }>`
  width: 30px;
  height: 30px;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  background: ${({ selected }) => (selected ? "#cfcfcf" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#dbdbdb")};
  font-size: 20px;
  font-family: "Lexend Deca", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
`;
