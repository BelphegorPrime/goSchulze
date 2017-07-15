package main

import (
	"net/http"
	"github.com/BelphegorPrime/lib"
	"fmt"
	"database/sql"
	"time"
)

func new_question_func(rw http.ResponseWriter, req *http.Request) {
	requestContent := lib.GetRequestContentFromRequest(req)

	if !isQuestionAlreadyInDb(db, requestContent["uuid"].(string)) {
		insertNewQuestion(db, requestContent["uuid"].(string), requestContent["question"].(string), requestContent["possibleAnswers"].([]interface{}))
	} else {
		removeQuestion(db, requestContent["uuid"].(string))
		insertNewQuestion(db, requestContent["uuid"].(string), requestContent["question"].(string), requestContent["possibleAnswers"].([]interface{}))
	}

	rw.Write([]byte([]byte("true")))
}

func get_question_func(rw http.ResponseWriter, req *http.Request) {
	requestContent := lib.GetRequestContentFromRequest(req)
	getQuestion(requestContent["uuid"].(string))
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

func insertNewQuestion(db *sql.DB, uuid string, question string, possibleAnswers []interface{}) {
	fmt.Println(possibleAnswers)
	fmt.Printf("[%s]: question %s mit uuid %s erstellt\n", time.Now(), question, uuid)
	fmt.Println(time.Now())
	fmt.Println(time.Now().Add(time.Hour * time.Duration(1)))
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
			fmt.Println("LastInsertId:", id)
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

func getQuestion(uuid string) {
	var question Question

	// TODO: Leftjoin possibleAnswers
	row := db.QueryRow("SELECT * FROM question WHERE uuid =? ", uuid)
	err := row.Scan(&question.Id,&question.Question,&question.Uuid,&question.Answer,&question.Endtime,)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(question)

}
