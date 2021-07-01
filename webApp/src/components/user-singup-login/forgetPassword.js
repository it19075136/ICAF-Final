import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Form,Alert,Col } from 'react-bootstrap';
import {updatePassword} from '../../redux/actions/singinActions';
import '../admin.css'
class forgetPassword extends Component {
    state={
        email:"",
        alert:{
            open:false,
            text:"login unsuccessfull"
        }
    }
    render() {
        const handleChange=(e)=>{
            console.log(this.state);
            this.setState({
                ...this.state,
               email:e.target.value
            })
        }
        const handleSubmit=(e)=>{
            console.log('in in in');
            e.preventDefault();
            this.props.updatePassword(this.state.email).then((res)=>{
                console.log('in in');
                    // if(res.data){
                        // console.log(res);
                        // localStorage.setItem('updatePasswordDetails',res.data);
                        window.location.href='/updatePassword';
                    // }
            }).catch((err)=>{
                console.log(err);
            })
            // this.
        }
        return (
            <div className="body">
            <Form >
            {this.state.alert.open ? <Alert key="1" variant="success" className="container">
            {this.state.alert.text}
        </Alert> : (null)}
                <Form.Group controlId="formHorizontalEmail">
                <Form.Label  sm={2}>
                    Email
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="email" name="email" placeholder="Email" onChange={handleChange} />
                </Col>
                {/* <AvForm>
                    <AvField name="originalEmail" label="Email" type="email" />
                    <AvField name="confirmationEmail" label="Email" type="email" validate={{ match: { value: 'originalEmail' } }} />
                </AvForm> */}
            </Form.Group>
                {/* <Form.Group  controlId="formHorizontalPassword">
                <Form.Label  sm={2}>
                    Password
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
                </Col> */}
                {/* <AvForm >
                    <AvField name="originalpassword" label="password" type="email" />
                    <AvField name="password" label="password" type="password" validate={{ match: { value: 'originalpassword' } }} />
                </AvForm> */}
            {/* </Form.Group> */}
                <Form.Group >
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit" onClick={handleSubmit}>restet password</Button>
                </Col>
            </Form.Group>
            </Form>
        </div>
        )
    }
}
export default connect(null,{updatePassword})(forgetPassword)
