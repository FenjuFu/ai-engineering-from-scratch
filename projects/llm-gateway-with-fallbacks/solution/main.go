package main

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"strings"
)

type demoTransport struct{}

func (d demoTransport) RoundTrip(r *http.Request) (*http.Response, error) {
	status := 503
	body := "primary unavailable"
	if r.URL.Host == "backup.test" {
		status = 200
		body = `{"answer":"Use cited evidence."}`
	}
	return &http.Response{StatusCode: status, Body: io.NopCloser(strings.NewReader(body)), Header: make(http.Header)}, nil
}
func main() {
	client := &http.Client{Transport: demoTransport{}}
	result, err := Route(context.Background(), client, []string{"https://primary.test", "https://backup.test"}, `{"prompt":"cite evidence"}`, 2, 100)
	fmt.Printf("STATE %s\nATTEMPTS %d\nPROVIDER %s\nBODY %s\nERROR %v\n", result.State, result.Attempts, result.Reply.Endpoint, result.Reply.Body, err)
}
