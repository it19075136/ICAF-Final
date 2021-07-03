import { ADD_DOCUMENTS, SET_IN_PROGRESS } from '../constants';
import axios from 'axios';

export const addDocuments = (data) => dispatch => {

    return new Promise((resolve, reject) => {
        axios.post('https://icaf-rest.herokuapp.com/document', data).then((res) => {
            console.log(res);
            dispatch({
                type: ADD_DOCUMENTS,
                payload: data
            })
            resolve(res.data)
        }).catch((err) => {
            console.log(err);
            resolve(err)
        })
    });

}

export const setUploadInProgress = () => dispatch => {

    dispatch({
        type: SET_IN_PROGRESS,
    })
}

export const getAllDocuments = () => dispatch => {

    axios.get('https://icaf-rest.herokuapp.com/document').then((res) => {
        console.log(res.data);
        dispatch({
            type: ADD_DOCUMENTS,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err);
    })
}