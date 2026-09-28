package main

import (
	"fmt"
)

func main() {
	events, _ := Parse("e1\t0\tdeploy\tversion B started\ne2\t35\talert\tlatency exceeded SLO\ne3\t90\trollback\tversion A restored")
	report, err := Report(events, []Claim{{"Latency alert followed deployment", []string{"e1", "e2"}}}, 5)
	fmt.Print(report)
	fmt.Println("RESULT", err)
}
