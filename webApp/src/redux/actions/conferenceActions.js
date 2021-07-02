import axios from 'axios';
import { GET_ALL_CONFERENCE, EDIT_CONFERENCE, ADD_CONFERENCE, DELETE_CONFERENCE } from '../constants';

export const getAllConference = () => dispatch => {
    axios.get('https://icaf-rest.herokuapp.com/conference')
        .then(res => {
            dispatch({
                type: GET_ALL_CONFERENCE,
                payload: res.data
            })
        })
}

export const addConference = (payload) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post('https://icaf-rest.herokuapp.com/conference', payload)
            .then(res => {
                if (res.status == 200) {
                    dispatch({
                        type: ADD_CONFERENCE,
                        payload: res.data
                    })
                    resolve(res.data);
                }
                else
                    resolve(res);
            })
    })

}

export const editConference = (id, payload) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put(`https://icaf-rest.herokuapp.com/conference/${id}`, payload)
            .then(res => {
                if (res.status == 200) {
                    dispatch({
                        type: EDIT_CONFERENCE,
                        payload: res.data
                    })
                    resolve(res.data);
                }
                else
                    resolve(res);
            })
    })

}

export const deleteConference = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.delete(`https://icaf-rest.herokuapp.com/conference/${id}`).then((res) => {
            if (res.status == 200) {
                dispatch({
                    type: DELETE_CONFERENCE,
                    payload: id
                })
                resolve(id)
            }
            else
                resolve(res)
        })
    })

}