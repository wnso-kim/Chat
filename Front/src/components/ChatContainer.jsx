import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";

export default function ChatContainer({ userName, socket, chatContents }) {
  const handleSendMsg = async (msg) => {
    socket.send(JSON.stringify({ Message: msg }));
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar"></div>
          <div className="username">
            <h3>채팅방</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {chatContents.length !== 0
          ? chatContents.map((result, index) => {
              console.log(result);
              const isMyText = result.Name === userName;
              return (
                <div
                  className={`message ${isMyText ? "sended" : "recieved"}`}
                  key={index}
                >
                  <div className="content-box">
                    <div className="content-header">
                      <span>{result.Name}</span>
                    </div>
                    <div className="content">{result.Message}</div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
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
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;

      .content-box {
        flex-direction: column;
        max-width: 40%;

        .content-header {
          display: flex;
          flex-direction: row;

          span {
            display: flex;
            color: #fff;
            align-items: flex-end;
            padding-left: 5px;
          }
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        .content {
          overflow-wrap: break-word;
          padding: 1rem;
          font-size: 1.1rem;
          border-radius: 1rem;
          color: #d1d1d1;
          @media screen and (min-width: 720px) and (max-width: 1080px) {
            max-width: 70%;
          }
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
