package main

import (
	"fmt"
	"sort"
	"strings"
)

func Leaderboard(results []Result) (string, error) {
	rows := append([]Result{}, results...)
	seen := map[string]bool{}
	total := -1
	for _, r := range rows {
		if r.Harness == "" || r.Total <= 0 || r.Correct < 0 || r.Attempted < 0 || r.Errors < 0 || r.Attempted > r.Total || r.Correct+r.Errors > r.Attempted {
			return "", ErrInvalid
		}
		if seen[r.Harness] {
			return "", ErrConflict
		}
		seen[r.Harness] = true
		if total != -1 && total != r.Total {
			return "", ErrConflict
		}
		total = r.Total
	}
	sort.Slice(rows, func(i, j int) bool {
		if rows[i].Correct != rows[j].Correct {
			return rows[i].Correct > rows[j].Correct
		}
		if rows[i].Errors != rows[j].Errors {
			return rows[i].Errors < rows[j].Errors
		}
		return rows[i].Harness < rows[j].Harness
	})
	var out strings.Builder
	out.WriteString("LOCAL FIXTURE BENCHMARK\n")
	for _, r := range rows {
		fmt.Fprintf(&out, "%s correct=%d/%d attempted=%d errors=%d state=%s\n", r.Harness, r.Correct, r.Total, r.Attempted, r.Errors, r.State)
	}
	return out.String(), nil
}
