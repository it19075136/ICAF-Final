import axios from 'axios';
import { GET_ALL_WORKSHOPS, ADD_WORKSHOP, UPDATE_WORKSHOP, UPDATE_WORKSHOPBY_ID, DELETE_WORKSHOP } from '../constants';

export const getAllWorkshops = () => dispatch => {
    axios.get('http://localhost:5000/workshop')
    .then(res => {
        dispatch({
            type: GET_ALL_WORKSHOPS,
            payload: res.data
        })
    })
}

export const addWorkshop = (payload) => dispatch => {
    axios.post('http://localhost:5000/workshop/', payload)
    .then(res => {
        dispatch({
            type: ADD_WORKSHOP,
            payload: res.data
        })
    })
}

export function updateWorkshopWorkforce(id,values){
    axios.post(`http://localhost:5000/workshop/update/workforce/${id}`, values)
            .then(res => {
                console.log('res: ', res);
            }).catch((err) => {
                console.log(err);
            })
}

export const updateWorkshopById = (payload,id) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put(`http://localhost:5000/workshop/${id}`, payload).then((res) => {
            if(res.status == 200){
                dispatch({
                    type: UPDATE_WORKSHOPBY_ID,
                    payload: res.data
                })
                resolve(res.data)
            }
            else
                resolve(res)
        })
    })
}

export const deleteWorkshop = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:5000/workshop/${id}`).then((res) => {
            if (res.status == 200) {
                dispatch({
                    type: DELETE_WORKSHOP,
                    payload: id
                })
                resolve(id)
            }
            else
                resolve(res)
        })
    })

}