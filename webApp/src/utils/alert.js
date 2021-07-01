import React from 'react'
import { Alert } from 'react-bootstrap'

export default function alert(props) {
        console.log(props)
    return (
            <Alert key="1" variant={props.result} className="container">
                    {props.message ? props.message == 'uploadERR' ? "Please re-select a file":props.message:props.result == "success" ? "Action successfull!":"Action failed"}
            </Alert> 
    )
}
