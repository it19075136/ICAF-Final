import { ADD_DOCUMENTS, SET_IN_PROGRESS } from '../constants'

const initstate = {
    documents: [],
    inProgress: false
}

export default function (state = initstate, action) {

    switch (action.type) {
        case ADD_DOCUMENTS:
            return {
                ...state,
                documents: action.payload,
                inProgress: false
            }
        case SET_IN_PROGRESS:
            return {
                ...state,
                inProgress: true
            }
        default:
            return state;
    }
}
