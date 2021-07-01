import axios from 'axios';
import { GET_ALL_WORKSHOPS, ADD_WORKSHOP, UPDATE_WORKSHOP } from '../constants';

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