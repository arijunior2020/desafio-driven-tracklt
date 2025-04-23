import styled from "styled-components";
import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../contexts/UserContextBase";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleLogout() {
    localStorage.removeItem("trackit_user");
    setUser(null);
    window.location.href = "/";
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <HeaderContainer data-test="header">
      <LogoText>TrackIt</LogoText>
      <AvatarWrapper ref={menuRef}>
        <UserImage
          src={user?.image}
          alt="User"
          data-test="avatar"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {menuOpen && (
          <DropdownMenu>
            <li onClick={handleLogout}>Sair</li>
          </DropdownMenu>
        )}
      </AvatarWrapper>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  background: #126ba5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  z-index: 10;
`;

const LogoText = styled.h1`
  font-family: "Playball", cursive;
  font-size: 38.98px;
  color: #ffffff;
`;

const AvatarWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const UserImage = styled.img`
  width: 51px;
  height: 51px;
  border-radius: 50%;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #ffffff;
  list-style: none;
  padding: 8px 12px;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 99;

  li {
    font-family: "Lexend Deca", sans-serif;
    font-size: 16px;
    color: #126ba5;
    cursor: pointer;
    padding: 6px 0;
  }

  li:hover {
    text-decoration: underline;
  }
`;
