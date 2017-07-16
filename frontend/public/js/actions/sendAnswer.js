import request from "superagent"
import Cookies from 'universal-cookie';

export default function sendAnswer(uuid, answer){
    return dispatch => {
        request.post('/new/answer')
            .send({uuid, answer})
            .withCredentials()
            .end((error, response) => {
                console.log(response)
                console.log(error)

                const cookies = new Cookies();
                cookies.set(uuid, true, { path: '/' });
                console.log(cookies.get(uuid));
            })
    }
}