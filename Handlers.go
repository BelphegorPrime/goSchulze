package main

import (
	"net/http"
	"github.com/BelphegorPrime/lib"
	"fmt"
	"database/sql"
	"time"
	"encoding/json"
	"strings"
)

func new_question_func(rw http.ResponseWriter, req *http.Request) {
	requestContent := lib.GetRequestContentFromRequest(req)

	if !isQuestionAlreadyInDb(db, requestContent["uuid"].(string)) {
		insertNewQuestion(db, requestContent["uuid"].(string), requestContent["question"].(string), requestContent["possibleAnswers"].([]interface{}))
	} else {
		removeQuestion(db, requestContent["uuid"].(string))
		insertNewQuestion(db, requestContent["uuid"].(string), requestContent["question"].(string), requestContent["possibleAnswers"].([]interface{}))
	}

	rw.Write([]byte("true"))
}

func get_question_func(rw http.ResponseWriter, req *http.Request) {
	requestContent := lib.GetRequestContentFromRequest(req)
	returnValue := getQuestion(requestContent["uuid"].(string))
	b, err := json.Marshal(returnValue)
	if err != nil {
		fmt.Println(err)
	}
	rw.Write(b)
}

func get_result_func(rw http.ResponseWriter, req *http.Request) {
	requestContent := lib.GetRequestContentFromRequest(req)
	returnValue := getResult(db, requestContent["uuid"].(string))
	fmt.Println(returnValue)
}

func new_answer_func(rw http.ResponseWriter, req *http.Request) {
	requestContent := lib.GetRequestContentFromRequest(req)
	returnValue := getQuestion(requestContent["uuid"].(string))

	if !isAwnserAlreadyInDb(db, returnValue["question"].(Question).Id, requestContent["answer"].(string)) {
		insertNewAnswer(db, returnValue["question"].(Question).Id, requestContent["answer"].(string))
	} else {
		updateAnswer(db, returnValue["question"].(Question).Id, requestContent["answer"].(string))
	}
}

func isQuestionAlreadyInDb(db *sql.DB, uuid string) bool {
	var count int
	row := db.QueryRow("SELECT COUNT(*) FROM question WHERE uuid =? ", uuid)
	err := row.Scan(&count)
	if err != nil {
		fmt.Println(err)
	}
	if count > 0 {
		return true
	}
	return false
}

func isAwnserAlreadyInDb(db *sql.DB, questionId int, answer string) bool {
	var count int
	row := db.QueryRow("SELECT COUNT(*) FROM answer WHERE questionID =? AND value=?", questionId, answer)
	err := row.Scan(&count)
	if err != nil {
		fmt.Println(err)
	}
	if count > 0 {
		return true
	}
	return false
}

func insertNewQuestion(db *sql.DB, uuid string, question string, possibleAnswers []interface{}) {
	res, err := db.Exec("INSERT INTO question("+
		"uuid,"+
		"question,"+
		"answer,"+
		"endtime)"+
		"VALUES(?,?,?,?)",
		uuid,
		question,
		"",
		time.Now().Add(time.Hour*time.Duration(1)+
			time.Minute*time.Duration(0)+
			time.Second*time.Duration(0)),
	)
	if err != nil {
		fmt.Println(err)
	} else {
		id, err := res.LastInsertId()
		if err != nil {
			fmt.Println(err)
		} else {
			for _, answer := range possibleAnswers {
				_, err := db.Exec("INSERT INTO possible_answer("+
					"questionID,"+
					"value)"+
					"VALUES(?,?)",
					id,
					answer,
				)
				if err != nil {
					fmt.Println(err)
				}
			}
		}
	}
}

// TODO: implement a remove question function
func removeQuestion(db *sql.DB, uuid string) {
	fmt.Println(uuid)
}

type Question struct {
	Id       int
	Uuid     string
	Question string
	Answer   string
	Endtime  time.Time
}

type PossibleAnswer struct {
	Id         int
	QuestionId int
	Value      string
}

type Answer struct {
	Id         int
	QuestionId int
	Value      string
	Count      int
}

func getQuestion(uuid string) map[string]interface{} {
	var question Question
	var possibleAnswers []PossibleAnswer

	row := db.QueryRow("SELECT * FROM question WHERE uuid =? ", uuid)
	err := row.Scan(&question.Id, &question.Question, &question.Uuid, &question.Answer, &question.Endtime, )
	if err != nil {
		fmt.Println(err)
	}
	if (&question.Id != nil) {
		rows, err := db.Query("SELECT * FROM possible_answer WHERE questionId =? ", &question.Id)
		if err != nil {
			fmt.Println(err)
		}
		defer rows.Close()
		for rows.Next() {
			var possibleAnswer PossibleAnswer
			if err := rows.Scan(&possibleAnswer.Id, &possibleAnswer.QuestionId, &possibleAnswer.Value); err != nil {
				fmt.Println(err)
			}
			possibleAnswers = append(possibleAnswers, possibleAnswer)
		}
		if err := rows.Err(); err != nil {
			fmt.Println(err)
		}
	}

	returnValue := make(map[string]interface{})
	returnValue["question"] = question
	returnValue["possibleAnswers"] = possibleAnswers
	return returnValue
}

func insertNewAnswer(db *sql.DB, questionId int, answer string) {
	_, err := db.Exec("INSERT INTO answer("+
		"questionID,"+
		"count,"+
		"value)"+
		"VALUES(?,?,?)",
		questionId,
		1,
		answer,
	)
	if err != nil {
		fmt.Println(err)
	}
}

func updateAnswer(db *sql.DB, questionId int, answer string) {
	var count int
	row := db.QueryRow("SELECT a.count FROM answer AS a WHERE questionID =? AND value =?", questionId, answer)
	err := row.Scan(&count)
	if err != nil {
		fmt.Println(err)
	}

	_, err = db.Exec("UPDATE answer SET "+
		"count=? "+
		"WHERE questionID=? AND value=?",
		count+1,
		questionId, answer)
	if err != nil {
		fmt.Println(err)
	}
}

func getResult(db *sql.DB, uuid string) map[string]interface{} {
	returnValue := make(map[string]interface{})
	var question Question
	var answers []Answer

	row := db.QueryRow("SELECT * FROM question WHERE uuid =? ", uuid)
	err := row.Scan(&question.Id, &question.Question, &question.Uuid, &question.Answer, &question.Endtime, )
	if err != nil {
		fmt.Println(err)
	}
	if (&question.Id != nil) {
		rows, err := db.Query("SELECT * FROM answer WHERE questionId =? ", &question.Id)
		if err != nil {
			fmt.Println(err)
		}
		defer rows.Close()
		for rows.Next() {
			var answer Answer
			if err := rows.Scan(&answer.Id, &answer.QuestionId, &answer.Value, &answer.Count); err != nil {
				fmt.Println(err)
			}
			answers = append(answers, answer)
		}
		if err := rows.Err(); err != nil {
			fmt.Println(err)
		}
	}

	schulzeInput, candidates := generateSchulzeInput(answers)

	fmt.Println(candidates)

	result := schulze(candidates, schulzeInput)
	fmt.Println(result)


	return returnValue
}

func generateSchulzeInput(answers []Answer) (map[string]map[string]int, []Candidate) {
	schulzeInput := map[string]map[string]int{}
	var candidates []Candidate
	if len(answers) > 0 {
		var answerValueArray = strings.Split(answers[0].Value, ">")
		for index, value := range answerValueArray {
			schulzeInput[value] = make(map[string]int)
			opponents := []string{}
			opponentsString := getPossibleOpponents(answerValueArray, index)
			for _, opponentValue := range opponentsString {
				opponents = append(opponents, opponentValue)
			}
			candidates = append(
				candidates,
				Candidate{value, opponents},
			)
		}

		for _, answer := range answers {
			var answerValueArray = strings.Split(answer.Value, ">")
			fmt.Println(answerValueArray)
			for i, answerValueI := range answerValueArray {
				for j, answerValueJ := range answerValueArray {
					if i == j-1 {
						schulzeInput[answerValueI][answerValueJ] += answer.Count
					}
				}
			}
		}
	}
	return schulzeInput, candidates
}
