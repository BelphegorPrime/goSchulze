import request from "superagent"

export default function getQuestion(uuid){
    return dispatch => {
        request.post('/get/question')
            .send({uuid})
            .end((error, response) => {
                let returnValue = JSON.parse(response.text)
                dispatch({
                    type: "QUESTION_FOUND",
                    question: returnValue["question"],
                    possibleAnswers: returnValue["possibleAnswers"],
                })
                console.log(returnValue)
            })
    }
}
