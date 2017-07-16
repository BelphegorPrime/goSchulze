package main

import (
	"net/http"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}
type Routes []Route

var routes = Routes{
	Route{
		"new_question",
		"POST",
		"/new/question",
		new_question_func,
	},
	Route{
		"get_question",
		"POST",
		"/get/question",
		get_question_func,
	},
	Route{
		"get_result",
		"POST",
		"/get/result",
		get_result_func,
	},
	Route{
		"new_answer",
		"POST",
		"/new/answer",
		new_answer_func,
	},
}

