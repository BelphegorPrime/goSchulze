import Immutable from 'immutable';

const initialState = Immutable.Map({
    uuid: "",
});

export default function site(state = initialState, action){
    if(action.type === "SET_UUID"){
        return state.set("uuid", action.uuid)
    }
    return state
}
