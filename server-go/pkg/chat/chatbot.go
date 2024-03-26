package chat

import (
	"github.com/ohannadeziderio/server-go/pkg/references"
	"math/rand"
	"strings"
	"time"
)

type Chatbot struct {
	Name string
}

func NewChatbot() *Chatbot {
	return &Chatbot{Name: "bot"}
}

func (c *Chatbot) SendMessage(message string) (string, error) {
	message = strings.ToLower(message)

	switch {
	case strings.Contains(message, "movie"):
		return ProcessMessage(message, references.GeekMovies), nil
	case strings.Contains(message, "music"):
		return ProcessMessage(message, references.Music), nil
	case strings.Contains(message, "book"):
		return ProcessMessage(message, references.Books), nil
	case strings.Contains(message, "meme"):
		return RandMeme(references.Memes), nil
	default:
		return ProcessMessage(message, references.Greetings), nil
	}
}

func ProcessMessage(message string, ref map[string]string) string {
	for key, value := range ref {
		if strings.Contains(message, key) {
			return value
		}
	}

	return "I think you spoke in Glogulese, because I didn't understand anything."
}

func RandMeme(ref []string) string {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	randomIndex := r.Intn(len(ref))

	return ref[randomIndex]
}
