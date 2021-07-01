import { ADD_SUBMISSION, GET_ALL_SUBMISSIONS, REMOVE_SUBMISSION, UPDATE_SUBMISSION } from '../constants'

const initstate = {
    submissions: [],
}

export default function (state = initstate, action) {

    switch (action.type) {
        case GET_ALL_SUBMISSIONS:
            return {
                ...state,
                submissions: action.payload
            };
        case ADD_SUBMISSION:
            return {
                ...state,
                submissions: [...state.submissions, action.payload],
            }
        case REMOVE_SUBMISSION:
            return {
                ...state,
                submissions: state.submissions.filter(submission => submission._id != action.payload._id)
            }
        case UPDATE_SUBMISSION:
            return {
                ...state,
                submissions: [...state.submissions.filter(submission => submission._id != action.payload._id), action.payload]
            }
        default:
            return state;
    }
}
