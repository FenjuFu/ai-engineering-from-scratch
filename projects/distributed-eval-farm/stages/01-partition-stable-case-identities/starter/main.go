package main

import (
	"context"
	"fmt"
)

func main() {
	ids := []string{"case-c", "case-a", "case-b"}
	parts, _ := Partition(ids, 2)
	fmt.Printf("PARTITIONS %v\n", parts)
	lease := Lease{Shard: "shard-0"}
	Acquire(&lease, "worker-1", 0, 10)
	Submit(&lease, "worker-1", 1, 1, "complete")
	fmt.Printf("RECEIPT %+v\n", lease)
	results, err := Parallel(context.Background(), ids, 2, func(_ context.Context, id string) (string, error) { return "passed:" + id, nil })
	fmt.Printf("RESULTS %v ERROR %v\n", results, err)
}
