package network

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Network struct {
	engin *gin.Engine
}

func NewServer() *Network {
	n := &Network{engin: gin.New()}

	n.engin.Use(gin.Logger())         // API 로거
	n.engin.Use(gin.Recovery())       // 패닝이 일어나 특정 로직이 잘못돼서 서버가 다운 되는 경우 다시 서버를 올려주는 역할
	n.engin.Use(cors.New(cors.Config{ // CORS 설정
		AllowWebSockets:  true,
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT"},
		AllowHeaders:     []string{"*"},
		AllowCredentials: true,
	}))

	r := NewRoom()
	go r.RunInit()

	n.engin.GET("/room", r.SocketServe)

	return n
}

func (n *Network) StartServer() error {
	log.Println("Starting server")

	return n.engin.Run(":8080")
}
