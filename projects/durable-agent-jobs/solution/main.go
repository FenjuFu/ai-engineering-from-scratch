package main

import (
	"fmt"
	"os"
	"path/filepath"
)

func main() {
	j, _ := NewJob("report-1")
	ClaimJob(&j, 0, 0, 10, 3)
	fmt.Printf("CLAIM %+v\n", j)
	Reclaim(&j, 10)
	fmt.Printf("RECLAIM %+v\n", j)
	ClaimJob(&j, 2, 10, 10, 3)
	fmt.Println("STALE FINISH", Finish(&j, 1, 11))
	Finish(&j, 3, 11)
	directory, _ := os.MkdirTemp("", "jobs-demo-")
	defer os.RemoveAll(directory)
	file := filepath.Join(directory, "jobs.json")
	Save(file, []Job{j})
	loaded, err := Load(file)
	fmt.Printf("RECOVERED %+v ERROR %v\n", loaded, err)
}
