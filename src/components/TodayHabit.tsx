import styled from "styled-components";

interface Props {
  name: string;
  done: boolean;
  currentSequence: number;
  highestSequence: number;
  onCheck: () => void;
}

export default function TodayHabit({
  name,
  done,
  currentSequence,
  highestSequence,
  onCheck,
}: Props) {
  return (
    <HabitBox>
      <div>
        <h3>{name}</h3>
        <p>
          Sequência atual: <strong>{currentSequence} dias</strong>
        </p>
        <p>
          Seu recorde: <strong>{highestSequence} dias</strong>
        </p>
      </div>
      <CheckButton $done={done} onClick={onCheck}>
        ✔
      </CheckButton>
    </HabitBox>
  );
}

const HabitBox = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CheckButton = styled.button<{ $done: boolean }>`
  width: 69px;
  height: 69px;
  background-color: ${(props) => (props.$done ? "#8FC549" : "#EBEBEB")};
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  font-size: 32px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
