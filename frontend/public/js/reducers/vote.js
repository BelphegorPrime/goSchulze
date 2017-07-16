import Immutable from 'immutable';

const initialState = Immutable.Map({
    uuid: "",
    question: "",
    possibleAnswers: [],
    isAlreadyAnswered: false,
});

export default function site(state = initialState, action){
    if(action.type === "QUESTION_FOUND"){
        return state.set("question", action.question).set("possibleAnswers", action.possibleAnswers)
    }
    if(action.type === "SET_POSSIBLE_ANSWERS_VOTES"){
        return state.set("possibleAnswers", action.possibleAnswers)
    }
    if(action.type === "SET_IS_ALREADY_ANSWERED"){
        return state.set("isAlreadyAnswered", action.isAlreadyAnswered)
    }

    return state
}
