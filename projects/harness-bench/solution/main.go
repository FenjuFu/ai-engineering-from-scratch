package main

import (
	"fmt"
)

func main() {
	cases, _ := Cases([]byte(`[{"ID":"a","Prompt":"sky color","Expected":"blue"},{"ID":"b","Prompt":"2 plus 2","Expected":"4"},{"ID":"c","Prompt":"abstain","Expected":"unknown"}]`), 10)
	models := []struct {
		name  string
		model Model
	}{{"raw", func(p string) (string, error) { return "blue", nil }}, {"lookup", func(p string) (string, error) {
		if p == "sky color" {
			return "blue", nil
		}
		if p == "2 plus 2" {
			return "4", nil
		}
		return "unknown", nil
	}}, {"uppercase", func(p string) (string, error) { return "BLUE", nil }}, {"abstaining", func(p string) (string, error) { return "unknown", nil }}, {"failing", func(p string) (string, error) { return "", ErrInvalid }}}
	rows := []Result{}
	for _, m := range models {
		r, _ := Evaluate(m.name, cases, m.model, 3)
		rows = append(rows, r)
	}
	out, _ := Leaderboard(rows)
	fmt.Print(out)
}
