import Immutable from 'immutable';

const initialState = Immutable.Map({
    uuid: "",
    question: "",
    possibleAnswers: [],
});

export default function site(state = initialState, action){
    if(action.type === "SET_UUID"){
        return state.set("uuid", action.uuid)
    }
    if(action.type === "SET_POSSIBLE_ANSWERS_ROWS"){
        return state.set("possibleAnswers", [].concat(action.possibleAnswers))
    }
    if(action.type === "SET_QUESTION"){
        return state.set("question", action.question)
    }
    return state
}
