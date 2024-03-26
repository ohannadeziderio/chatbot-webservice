package main

import (
	"github.com/labstack/echo/v4"
	"github.com/ohannadeziderio/server-go/pkg/chat"
	"log"
	"net/http"
)

type Message struct {
	Text string `json:"message"`
}

func main() {
	bot := chat.NewChatbot()
	e := echo.New()

	e.POST("/chat", func(c echo.Context) error {
		return processMessage(c, bot)
	})

	e.Logger.Fatal(e.Start(":8080"))
}

func processMessage(c echo.Context, bot *chat.Chatbot) error {
	log.Println(c.Request().Method, c.Request().URL, "from", c.Request().RemoteAddr)

	var m Message
	if err := c.Bind(&m); err != nil {
		log.Fatal("Cannot bind message:", c)
		return err
	}

	log.Println("Receiving message:", m.Text)

	response, _ := bot.SendMessage(m.Text)
	r := Message{Text: response}

	log.Println("Sending response:", r.Text)

	return c.JSON(http.StatusOK, r)
}
