package main

func Evaluate(name string, cases []Case, model Model, budget int) (Result, error) {
	if name == "" || model == nil || budget < 0 {
		return Result{}, ErrInvalid
	}
	out := Result{Harness: name, Total: len(cases), State: "completed"}
	for _, c := range cases {
		if out.Attempted >= budget {
			out.State = "budget-exhausted"
			break
		}
		out.Attempted++
		answer, e := model(c.Prompt)
		if e != nil {
			out.Errors++
			continue
		}
		if Correct(answer, c.Expected) {
			out.Correct++
		}
	}
	return out, nil
}
