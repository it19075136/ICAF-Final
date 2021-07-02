import axios from "axios";
import {updateWorkshopWorkforce} from './workshopActions';

const GET_ALL_DOCUMENTS = "GET_ALL_DOCUMENTS";
const UPDATE_DOCUMENT_APPROVE = "UPDATE_DOCUMENT_APPROVE";
const GET_ALL_USERS = "GET_ALL_USERS";


export const getAllDocuments = () => dispatch => {
    axios.get('https://icaf-rest.herokuapp.com/document/')
    .then(res => {
        dispatch({
            type : GET_ALL_DOCUMENTS,
            payload : res.data
        })
    })
}

export function postDocumentApprove(values) {
    console.log('postDocumentApprove values: ', values);
    return (dispatch) => {
        axios.post(`https://icaf-rest.herokuapp.com/document/update/isApprove/${values.id}`, values)
            .then(res => {
                dispatch({
                    type: UPDATE_DOCUMENT_APPROVE,
                    payload: values
                });
                const resourcePersons = {};

                resourcePersons.resourcePersons = values.userId;
                
                if(values.type === "W_PROPOSAL"){
                    updateWorkshopWorkforce(values.activityId,resourcePersons);
                }

            }).catch((err) => {
                console.log(err);
            })
    }
}

export function getAllUsers(){
    return (dispatch) => {
        axios.get(`https://icaf-rest.herokuapp.com/user/`)
        .then(res => {
            dispatch({
                type : GET_ALL_USERS,
                payload : res.data
            });
        }).catch((err) => {
            console.log(err);
        })
    }
}

