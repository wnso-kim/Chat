package network

import (
	. "chat_server/types"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

// Http 통신을 Socket 통신으로 변환하는 작업(websocket.Upgrader 사용)
var upgrader = &websocket.Upgrader{
	ReadBufferSize:  SocketBufferSize,
	WriteBufferSize: MessageBufferSize,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

type Room struct {
	// 들어오는 메시지를 다른 클라이언트들에게 전송
	Forward chan *message // 수신되는 메시지를 보관하는 값

	Join  chan *client // Socket이 연결되는 경우 작동
	Leave chan *client // Socket이 끊어지는 경우에 대해서 작동

	clients map[*client]bool // 현재 방에 있는 client 정보를 저장
}

type message struct {
	Name    string
	Message string
	Time    int64
}

type client struct {
	Send   chan *message
	Room   *Room
	Name   string
	Socket *websocket.Conn
}

func NewRoom() *Room {
	return &Room{
		Forward: make(chan *message),
		Join:    make(chan *client),
		Leave:   make(chan *client),
		clients: make(map[*client]bool),
	}
}

func (r *Room) SocketServe(c *gin.Context) {

	socket, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		panic(err)
	}

	userCookie, err := c.Request.Cookie("auth")
	if err != nil {
		panic(err)
	}

	client := &client{
		Socket: socket,
		Send:   make(chan *message, MessageBufferSize),
		Room:   r,
		Name:   userCookie.Value,
	}

	r.Join <- client

	// 해당 함수(소켓 통신)이 종료될 경우 호출 될 함수(로직)
	defer func() { r.Leave <- client }()

	// 로직들
}
