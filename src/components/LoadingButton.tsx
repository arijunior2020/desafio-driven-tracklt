import { ClipLoader } from "react-spinners";
import styled from "styled-components";

interface Props {
  loading: boolean;
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  width?: string;
  height?: string;
}

export default function LoadingButton({
  loading,
  text,
  disabled,
  onClick,
  width = "84px",
  height = "35px",
}: Props) {
  return (
    <Button
      disabled={disabled || loading}
      onClick={onClick}
      $width={width}
      $height={height}
    >
      {loading ? <ClipLoader size={10} color="#ffffff" /> : text}
    </Button>
  );
}

const Button = styled.button<{ $width: string; $height: string }>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  background-color: #52b6ff;
  border: none;
  border-radius: 4.64px;
  font-size: 14px;
  font-family: "Lexend Deca", sans-serif;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;
