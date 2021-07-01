import { ADD_CONFERENCE, GET_ALL_CONFERENCE, EDIT_CONFERENCE, DELETE_CONFERENCE } from "../constants";

const initstate = {
    conferences: []
}

export default function (state = initstate, action){
    switch (action.type) {
        case GET_ALL_CONFERENCE:
            return {
                ...state,
                conferences: action.payload
            }
        case ADD_CONFERENCE:
            return{
                ...state,
                conferences: [...state.conferences, action.payload]
            }
        case EDIT_CONFERENCE:
            return{
                ...state,
                conferences: [...state.conferences.filter(c => c._id != action.payload._id),action.payload]
            }
        case DELETE_CONFERENCE:
            return{
                ...state,
                conferences: state.conferences.filter(conference => conference._id != action.payload)
            }
        default:
            return state;
    }
}