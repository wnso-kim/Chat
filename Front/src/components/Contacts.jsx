import React from "react";
import styled from "styled-components";
import kakao from "../assets/kakao.gif";

export default function Contacts({ userName }) {
  return (
    <>
      <Container>
        <div className="brand">
          <img src={kakao} alt="logo" sizes="xl" />
        </div>
        <div className="current-user">
          <div className="username">
            <h2>{userName}</h2>
          </div>
        </div>
        <div className="title">
          <h5>스트리밍 플랫폼의 채팅서버 구현해보기!</h5>
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 7rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    form {
      width: 80%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      .form-group {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        .filebox {
          display: flex;
          flex-direction: column;
          gap: 10px;

          label {
            display: inline-block;
            padding: 10px 20px;
            color: #fff;
            vertical-align: middle;
            background-color: #999999;
            cursor: pointer;
            height: 40px;
            margin-left: 10px;
          }

          input[type="file"] {
            position: absolute;
            width: 0;
            height: 0;
            padding: 0;
            overflow: hidden;
            border: 0;
          }
        }
      }

      .upload-name {
        display: inline-block;
        height: 40px;
        padding: 0 10px;
        vertical-align: middle;
        border: 1px solid #dddddd;
        margin: 10px 0px;
        width: 100%;
        color: #999999;
      }

      .btn {
        padding: 5px 10px;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }

  .title {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    h5 {
      color: white;
    }
  }
`;
