import request from "superagent"

export default function createNewQuestion(uuid, question, possibleAnswers){
    return dispatch => {
        request.post('/new/question')
            .send({uuid, question, possibleAnswers})
            .end((error, response) => {
                console.log(response)
                console.log(error)
            })
    }
}
