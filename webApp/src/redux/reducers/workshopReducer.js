import { ADD_WORKSHOP, GET_ALL_WORKSHOPS , UPDATE_WORKSHOP } from "../constants";

const initstate = {
    workshops: [],
    updateWorkshop: {}
}

export default function (state = initstate, action){
    switch (action.type) {
        case GET_ALL_WORKSHOPS:
            return {
                ...state,
                workshops: action.payload
            }
        case ADD_WORKSHOP:
            return{
                ...state,
                workshops: [...state.workshops, action.payload]
            }
        case UPDATE_WORKSHOP:
            return {
                ...state,
                updateWorkshop : action.payload
            }
        default:
            return state;
    }
}