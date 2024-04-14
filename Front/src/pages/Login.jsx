import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Logo from "../assets/Bao.jpeg";
import { ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [cookies, setCookie] = useCookies(["auth"]);
  const [inputValue, setInputValue] = useState("");

  const handleOauth2 = async () => {
    setCookie("auth", inputValue, { path: "/" });
    return window.location.replace("/");
  };

  return (
    <>
      <FormContainer>
        <div
          style={{
            backgroundColor: "#131324",
          }}
        >
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>채팅서버 구현하기</h1>
          </div>
          <input
            type="input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleOauth2}>로그인</button>
        </div>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
