package main

import (
	"net/http"
)

func index_func(rw http.ResponseWriter, req *http.Request){
	rw.Write([]byte("HelloWorld"))
}
