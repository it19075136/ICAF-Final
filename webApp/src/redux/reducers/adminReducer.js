const initstate = {
    documents : [],
    updateDocumentApprove : {},
    users : []
}

const GET_ALL_DOCUMENTS = "GET_ALL_DOCUMENTS";
const UPDATE_DOCUMENT_APPROVE = "UPDATE_DOCUMENT_APPROVE";
const GET_ALL_USERS = "GET_ALL_USERS";

export default function (state = initstate, action){
    switch(action.type){
        case GET_ALL_DOCUMENTS:
            return {
                ...state,
                documents : action.payload
            };
        case UPDATE_DOCUMENT_APPROVE:
            return {
                ...state,
                updateDocumentApprove : action.payload,
                // documents : [...this.state.documents,action.payload]
            }
        case GET_ALL_USERS:
            return {
                ...state,
                users : action.payload
            }        
        default : 
            return state;    
    }
}