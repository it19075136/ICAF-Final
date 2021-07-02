import React, { Component } from 'react'
import { connect } from 'react-redux'
import passwordHash from "password-hash"
import {addNewPassword} from '../../redux/actions/singinActions';
import { Button, Form,Alert,Col } from 'react-bootstrap';
import jwt from 'jsonwebtoken';
import '../admin.css';
import './document.css';
class updatePassword extends Component {
    state = {
        user: {
            _id:'',
            password: '',
            code:''
        },
        alert: {
            open: false,
            text: "Record added successfully!"
        },
        originalPassword: ""
    }
    componentDidMount(){
        const item = localStorage.getItem('updatePasswordDetails');
        const decodeItem = jwt.decode(item);
        console.log(decodeItem);
        console.log(decodeItem._id);
        this.setState({
            ...this.state,
            user:{...this.state.user,_id:decodeItem._id}
        })
    }
    render() {
        const item = localStorage.getItem('updatePasswordDetails');
        const decodeItem = jwt.decode(item);
        const handleChange = (e) => {
            console.log(this.state);
            this.setState({
                ...this.state,
                user: { ...this.state.user, [e.target.name]: e.target.value }
            })
        }
        const handleChangePassword = (e) => {
            this.setState({
                ...this.state,
                originalPassword: e.target.value
            })
        }
        const handlelSubmit = (e) => {
            e.preventDefault();
            console.log(this.state);
            console.log(this.state.user);
            if (this.state.user._id === "" || this.state.user.password === "" ||  this.state.user.code === ""  ) {
                this.setState({
                    ...this.state,
                    alert: { ...this.state.alert, open: true, text: "fill all the details" }
                })
                setTimeout(() => {
                    this.setState({
                        ...this.state,
                        alert: { ...this.state.alert, open: false, text: "fill all the details" }
                    })
                }, 6000)
            } //checking if any field is empty
            else if (this.state.user.password !== this.state.originalPassword) {
                this.setState({
                    ...this.state,
                    alert: { ...this.state.alert, open: true, text: "password are deferent" }
                })
                setTimeout(() => {
                    this.setState({
                        ...this.state,
                        alert: { ...this.state.alert, open: false, text: "password are deferent" }
                    })
                }, 6000)
            }
            else if(!passwordHash.verify(this.state.user.code,decodeItem.code)){
                this.setState({
                    ...this.state,
                    alert: { ...this.state.alert, open: true, text: "code is  incorecct" }
                })
                setTimeout(() => {
                    this.setState({
                        ...this.state,
                        alert: { ...this.state.alert, open: false, text: "code is  incorecct" }
                    })
                }, 6000)
            }
            else{
                console.log('add new password');
                this.props.addNewPassword(this.state.user).then(res => {

                    console.log('inside postuser action in singup component');
                    console.log(res.data);
                    if (res) {
                        console.log('Record added successfully!')
                        this.setState({
                            ...this.state,
                            alert: { ...this.state.alert, open: true, text: "Record added successfully!" }
                        })
                        setTimeout(() => {
                            this.setState({
                                ...this.state,
                                alert: { ...this.state.alert, open: false, text: "Record added successfully!" }
                            })
                        }, 6000)
                        window.location.href="/singin"
                    }
                   
                    console.log(res)
                }).catch((err) => {
                    this.setState({
                        ...this.state,
                        alert: { ...this.state.alert, open: true, text: "Record added Unsuccessfully!" }
                    })
                    setTimeout(() => {
                        this.setState({
                            ...this.state,
                            alert: { ...this.state.alert, open: false, text: "Record added Unsuccessfully!" }
                        })
                    }, 6000)
                    console.log(err)
                })
            }

        }
        return (
            <div className="main-form">
            <div className="body">
            <Form  className="container">
                {this.state.alert.open ? <Alert key="1" variant="success" className="container">
                    {this.state.alert.text}
                </Alert> : (null)}
                <Form.Group controlId="formHorizontalEmail">
                    <Form.Label sm={2}>
                        code
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" name="code" placeholder="code" onChange={handleChange} />
                    </Col>
                  
                </Form.Group>
               

                <Form.Group controlId="formHorizontalPassword">
                    <Form.Label sm={2}>
                        Password
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" name="originalPassword" placeholder="Password" onChange={handleChangePassword} />
                    </Col>
                    
                </Form.Group>
                <Form.Group controlId="formHorizontalPassword">
                    <Form.Label sm={2}>
                        Re Enter Password
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
                    </Col>
                  
                </Form.Group>
                <Form.Group >
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit" onClick={handlelSubmit}>change password</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
        </div>
        )
    }
}
export default connect(null,{addNewPassword})(updatePassword)
