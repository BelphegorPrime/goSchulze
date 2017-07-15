package main

import "fmt"

type Candidate struct {
	Value     string
	Opponents []string
}

func schulzTest() {
	fmt.Println("GoSchulze")

	var candidates []Candidate

	inputCandidates := map[int]string{0: "A", 1: "B", 2: "C"}
	inputResults := map[string]map[string]int{
		"A": {"B": 0, "C": 2},
		"B": {"A": 4, "C": 6},
		"C": {"A": 8, "B": 10},
	}

	for index, candidateValue := range inputCandidates {
		opponents := []string{}
		opponentsString := getPossibleOpponents(inputCandidates, index)
		for _, opponentValue := range opponentsString {
			opponents = append(opponents, opponentValue)
		}
		candidates = append(
			candidates,
			Candidate{candidateValue, opponents},
		)
	}

	results := schulze(candidates, inputResults)
	fmt.Println(results)
}

func getPossibleOpponents(slice map[int]string, s int) map[int]string {
	returnValue := map[int]string{}
	for index, elemString := range slice {
		if (index != s) {
			returnValue[index] = elemString
		}
	}
	return returnValue
}

//Input:  map["X"]map["Y"]number
//the number of voters who prefer candidate "X" to candidate "Y".
//Output: map["X"]map["Y"]strength
//the strength of the strongest path from candidate "X" to candidate "Y".
func schulze(candidates []Candidate, inputResults map[string]map[string]int) map[string]map[string]int {
	p := map[string]map[string]int{}
	for i, elemI := range candidates {
		p[elemI.Value] = make(map[string]int)
		for j, elemJ := range candidates {
			if i != j {
				p[elemI.Value][elemJ.Value] = 0
				if inputResults[elemI.Value][elemJ.Value] > inputResults[elemJ.Value][elemI.Value] {
					p[elemI.Value][elemJ.Value] = inputResults[elemI.Value][elemJ.Value]
				}
			}
		}
	}

	for i, elemI := range candidates {
		for j, elemJ := range candidates {
			if i != j {
				for k, elemK := range candidates {
					if i != k && j != k {
						p[elemJ.Value][elemK.Value] = Max(p[elemJ.Value][elemK.Value], Min(p[elemJ.Value][elemI.Value], p[elemI.Value][elemK.Value]))
					}
				}
			}
		}
	}
	return p
}

func Min(x, y int) int {
	if x < y {
		return x
	}
	return y
}

func Max(x, y int) int {
	if x > y {
		return x
	}
	return y
}


//# Input: d[i,j], the number of voters who prefer candidate i to candidate j.
//# Output: p[i,j], the strength of the strongest path from candidate i to candidate j.
// for i from 1 to C
//    for j from 1 to C
//       if (i ≠ j) then
//          if (d[i,j] > d[j,i]) then
//             p[i,j] := d[i,j]
//          else
//             p[i,j] := 0
//
// for i from 1 to C
//    for j from 1 to C
//       if (i ≠ j) then
//          for k from 1 to C
//             if (i ≠ k and j ≠ k) then
//                p[j,k] := max ( p[j,k], min ( p[j,i], p[i,k] ) )

//OR

//for i := 1 to C do
//begin
//for j := 1 to C do
//begin
//if ( i <> j ) then
//begin
//if ( d[i, j] > d[j, i] ) then
//begin
//p[i, j] := d[i, j]
//end else
//begin
//p[i, j] := 0
//end
//end
//end
//end
//
//for i := 1 to C do
//begin
//for j := 1 to C do
//begin
//if ( i <> j ) then
//begin
//for k := 1 to C do
//begin
//if ( i <> k ) then
//begin
//if ( j <> k ) then
//begin
//p[j, k] := max ( p[j, k], min ( p[j, i], p[i, k] ) )
//end
//end
//end
//end
//end
//end
