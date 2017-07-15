import Immutable from 'immutable';

const initialState = Immutable.Map({
    uuid: "",
    question: "",
    possibleAwnsers: [],
});

export default function site(state = initialState, action){
    if(action.type === "SET_UUID"){
        return state.set("uuid", action.uuid)
    }
    if(action.type === "SET_POSSIBLE_AWNSER_ROWS"){
        console.log(action.possibleAwnsers)
        return state.set("possibleAwnsers", [].concat(action.possibleAwnsers))
    }
    if(action.type === "SET_QUESTION"){
        return state.set("question", action.question)
    }
    return state
}
