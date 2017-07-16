import request from "superagent"
import Cookies from 'universal-cookie';

export default function setAlreadyAnswered(isAlreadyAnswered){
    return dispatch => {
        dispatch({type:"SET_IS_ALREADY_ANSWERED", isAlreadyAnswered})
    }
}