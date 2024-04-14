package main

import (
	"chat_server/network"
	"log"
)

func main() {
	log.Println("======== [main start] ========")

	n := network.NewServer()
	n.StartServer()
}
