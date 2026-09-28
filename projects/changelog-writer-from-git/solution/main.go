package main

import (
	"fmt"
)

func main() {
	commits, _ := ParseLog("abc1234\tfeat(index): cache evidence\ndef5678\tfix: preserve citation offsets\naaa1111\tfeat!: replace legacy wire format")
	out, err := Release("v0.2.0", commits, 100)
	fmt.Print(out)
	fmt.Println("RESULT", err)
}
