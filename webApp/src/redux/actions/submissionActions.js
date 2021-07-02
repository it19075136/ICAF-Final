import axios from 'axios';
import { GET_ALL_SUBMISSIONS, ADD_SUBMISSION, REMOVE_SUBMISSION, UPDATE_SUBMISSION } from '../constants';

export const getAllSubmissions = () => dispatch => {
    axios.get('https://icaf-rest.herokuapp.com/submission')
        .then(res => {
            dispatch({
                type: GET_ALL_SUBMISSIONS,
                payload: res.data
            })
        })
}

export const addSubmission = (payload) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post('https://icaf-rest.herokuapp.com/submission', payload)
            .then(res => {
                if (res.status == 200) {
                    dispatch({
                        type: ADD_SUBMISSION,
                        payload: res.data
                    })
                    resolve(res.data);
                }
                else
                    resolve(res);
            })
    })
}

export const deleteSubmission = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.delete(`https://icaf-rest.herokuapp.com/submission/${id}`).then((res) => {
            if (res.status == 200) {
                dispatch({
                    type: REMOVE_SUBMISSION,
                    payload: res.data
                })
                resolve(res.data)
            }
            else
                resolve(res)
        })
    });
}

export const updateSubmission = (payload) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put(`https://icaf-rest.herokuapp.com/submission/${payload.id}`, payload).then((res) => {
            if (res.status == 200) {
                dispatch({
                    type: UPDATE_SUBMISSION,
                    payload: res.data
                })
                resolve(res.data)
            }
            else
                resolve(res)
        })
    });
}