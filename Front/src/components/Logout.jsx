import React from "react";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import { useCookies } from "react-cookie";

export default function Logout() {
  const [, , removeCookie] = useCookies(["auth"]);

  const handleClick = async () => {
    removeCookie("auth");
    return window.location.replace("/login");
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
