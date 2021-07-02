
import React, { Component } from 'react'
import { Button, Form, Alert, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { findUser } from '../../redux/actions/singinActions'
import '../admin.css'
import './document.css';
class singin extends Component {
    state = {
        user: {
            email: '',
            password: ''
        },
        alert: {
            open: false,
            text: "login unsuccessfull"
        }
    }
    render() {
        console.log(this.props.user);
        const handleChange = (e) => {
            console.log(this.state);
            this.setState({
                ...this.state,
                user: { ...this.state.user, [e.target.name]: e.target.value }
            })
        }
        const handleSubmit = (e) => {
            console.log(this.state);
            e.preventDefault();
            // e.preventdefault();
            console.log('in in in');
            // const {findUser} = this.props;
            console.log('in in in');
            this.props.findUser(this.state.user).then((res) => {
                console.log('in in');
                // const {token} = res;
                // localStorage.setItem('user',token);
                if (res._id) {
                    console.log(res);
                    this.setState({
                        ...this.state,
                        alert: { ...this.state.alert, open: true, text: "login successfull" }
                    })
                    setTimeout(() => {
                        this.setState({
                            ...this.state,
                            alert: { ...this.state.alert, open: false, text: "login unsuccessfull" }
                        })
                    }, 1000)
                    console.log(res.type, this.state.user.type);
                    console.log(res.type, this.state.user.type);
                    if (res.type == 'ADMIN' || res.type == "REVIEWER") {
                        window.location.href = '/admin/dashboard';
                    }
                    else if (res.type == 'EDITOR')
                        window.location.href = '/workshops';
                    else {
                        window.location.href = '/';
                    }
                }
                else {
                    this.setState({
                        ...this.state,
                        alert: { ...this.state.alert, open: true, text: "login unsuccessfull" }
                    })
                    setTimeout(() => {
                        this.setState({
                            ...this.state,
                            alert: { ...this.state.alert, open: false, text: "login unsuccessfull" }
                        })
                    }, 1000)
                }


            }).catch((err) => {
                this.setState({
                    ...this.state,
                    alert: { ...this.state.alert, open: true, text: "login unsuccessfull" }
                })
                setTimeout(() => {
                    this.setState({
                        ...this.state,
                        alert: { ...this.state.alert, open: false, text: "login unsuccessfull" }
                    })
                }, 1000)
                console.log('err');
                console.log(err);
            })
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
                    <Form.Group controlId="formHorizontalPassword">
                        <Form.Label sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
                        </Col>
                        {/* <AvForm >
                        <AvField name="originalpassword" label="password" type="email" />
                        <AvField name="password" label="password" type="password" validate={{ match: { value: 'originalpassword' } }} />
                    </AvForm> */}
                    </Form.Group>
                    <Form.Group controlId="formHorizontalCheck" >
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Form.Check label="Remember me" />
                        </Col>
                    </Form.Group>
                    <Form.Group >
                        <Col sm={{ span: 10, offset: 2 }}>
                            <a href="/forgetPassword">forget password?</a>
                        </Col>
                    </Form.Group>
                    <Form.Group >
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit" onClick={handleSubmit}>Sign in</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    submission: state.submission,
    conferences: state.conference.conferences,
    user: state.user.user
});
export default connect(mapStateToProps, { findUser })(singin)