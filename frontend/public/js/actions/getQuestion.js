import request from "superagent"

export default function getQuestion(uuid){
    return dispatch => {
        request.post('/get/question')
            .send({uuid})
            .end((error, response) => {
                console.log(response)
                console.log(error)
            })
    }
}
