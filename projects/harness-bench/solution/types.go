package main

import "errors"

var ErrInvalid = errors.New("invalid input")
var ErrLimit = errors.New("budget exceeded")
var ErrConflict = errors.New("conflict")

type Case struct {
	ID       string
	Prompt   string
	Expected string
}
type Result struct {
	Harness   string
	Correct   int
	Attempted int
	Errors    int
	Total     int
	State     string
}
type Model func(string) (string, error)
