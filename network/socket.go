package network

import (
	. "chat_server/types"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

// Http 통신을 Socket 통신으로 변환하는 작업(websocket.Upgrader 사용)
var upgrader = &websocket.Upgrader{
	ReadBufferSize:  SocketBufferSize,
	WriteBufferSize: MessageBufferSize,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

// 채널들은 모두 큐라고 생각
type Room struct {
	// 들어오는 메시지를 다른 클라이언트들에게 전송
	Forward chan *message // 수신되는 메시지를 보관하는 값

	Join  chan *client // Socket이 연결되는 경우 작동
	Leave chan *client // Socket이 끊어지는 경우에 대해서 작동

	Clients map[*client]bool // 현재 방에 있는 client 정보를 저장
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
		Clients: make(map[*client]bool),
	}
}

func (c *client) Read() {
	defer c.Socket.Close()

	for {
		var msg *message
		err := c.Socket.ReadJSON(&msg)
		if err != nil {
			panic(err)
		} else {
			msg.Time = time.Now().Unix()
			msg.Name = c.Name

			c.Room.Forward <- msg
		}
	}
}

func (c *client) Write() {
	defer c.Socket.Close()

	for msg := range c.Send {
		err := c.Socket.WriteJSON(msg)
		if err != nil {
			panic(err)
		}
	}
}

func (r *Room) RunInit() {
	// Room에 있는 모든 채널값을 받는 역할
	for {
		select {
		case client := <-r.Join:
			r.Clients[client] = true
		case client := <-r.Leave:
			r.Clients[client] = false
			close(client.Send)
			delete(r.Clients, client)
		case msg := <-r.Forward:
			for client := range r.Clients {
				client.Send <- msg
			}
		}
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

	// 읽고 쓰기 로직
	go client.Write() //go(고루틴): 백그라운드 동작

	client.Read()

}
