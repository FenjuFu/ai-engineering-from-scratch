package main

import "errors"

var ErrInvalid = errors.New("invalid input")
var ErrLimit = errors.New("budget exceeded")
var ErrConflict = errors.New("conflict")

type Reply struct {
	Status   int
	Body     string
	Endpoint string
}
type Outcome struct {
	Reply    Reply
	Attempts int
	State    string
}
