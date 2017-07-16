import request from "superagent"

export default function getResult(uuid){
    return dispatch => {
        request.post('/get/result')
            .send({uuid})
            .end((error, response) => {
                console.log(response)
                console.log(error)
            })
    }
}
