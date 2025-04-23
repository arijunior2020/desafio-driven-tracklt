import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { Calendar, CheckSquare } from "lucide-react";

export default function Footer() {
  const location = useLocation();

  return (
    <MenuContainer>
      <MenuItem to="/habitos" $active={location.pathname === "/habitos"}>
        <Calendar size={24} />
        <span>Hábitos</span>
      </MenuItem>

      <MenuItem to="/hoje" $active={location.pathname === "/hoje"}>
        <CheckSquare size={20} />
        <span>Hoje</span>
      </MenuItem>
    </MenuContainer>
  );
}

const MenuContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 70px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`;

const MenuItem = styled(Link)<{ $active: boolean }>`
  flex: 1;
  height: 70px;
  background-color: ${({ $active }) => ($active ? "#52B6FF" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#d4d4d4")};
  border-radius: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 17.98px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  gap: 5px;

  svg {
    color: ${({ $active }) => ($active ? "#ffffff" : "#d4d4d4")};
  }
`;
