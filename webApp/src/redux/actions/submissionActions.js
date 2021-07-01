import axios from 'axios';
import { GET_ALL_SUBMISSIONS, ADD_SUBMISSION, REMOVE_SUBMISSION, UPDATE_SUBMISSION } from '../constants';

export const getAllSubmissions = () => dispatch => {
    axios.get('http://localhost:5000/submission')
        .then(res => {
            dispatch({
                type: GET_ALL_SUBMISSIONS,
                payload: res.data
            })
        })
}

export const addSubmission = (payload) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/submission', payload)
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
        axios.delete(`http://localhost:5000/submission/${id}`).then((res) => {
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
        axios.put(`http://localhost:5000/submission/${payload.id}`, payload).then((res) => {
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