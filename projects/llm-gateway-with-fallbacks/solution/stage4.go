package main

import (
	"context"
	"net/http"
)

func Route(ctx context.Context, client *http.Client, providers []string, payload string, maxAttempts int, maxBytes int64) (Outcome, error) {
	endpoints, e := Endpoints(providers)
	if e != nil {
		return Outcome{}, e
	}
	if maxAttempts < 1 {
		return Outcome{}, ErrLimit
	}
	out := Outcome{State: "exhausted"}
	for _, endpoint := range endpoints {
		if out.Attempts >= maxAttempts {
			return out, ErrLimit
		}
		if e := ctx.Err(); e != nil {
			out.State = "cancelled"
			return out, e
		}
		out.Attempts++
		reply, e := Attempt(ctx, client, endpoint, payload, maxBytes)
		if e != nil {
			if e == ErrLimit {
				out.State = "response-limit"
				return out, e
			}
			continue
		}
		out.Reply = reply
		kind, e := ClassifyStatus(reply.Status)
		if e != nil {
			return out, e
		}
		if kind == "success" {
			out.State = "completed"
			return out, nil
		}
		if kind == "terminal" {
			out.State = "terminal-error"
			return out, ErrInvalid
		}
	}
	return out, ErrLimit
}
