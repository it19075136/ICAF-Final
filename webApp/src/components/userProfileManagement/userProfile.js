import React, { Component } from 'react'
// import { AvForm, AvField } from 'availity-reactstrap-validation';
// import { Button, Form, Col, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { postUser } from '../../redux/actions/singupActions'
import './userProfile.css';
import jwt from 'jsonwebtoken';
class userProfile extends Component {
   
    render() {
        const item=localStorage.getItem("user");
        const decodeItem = jwt.decode(item);
       
        return (
            <div className="container emp-profile">
            <form method="post">
                <div className="row">
                
                    <div className="col-md-6">
                        <div className="profile-head">
                                    <h5>
                                        {decodeItem.name}
                                    </h5>
                                    <h6>
                                        {decodeItem.type}
                                    </h6>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                    </div>
                </div>
                <div className="row">
                   
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                       
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{decodeItem.name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{decodeItem.email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div class="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>0{decodeItem.phoneNumber}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Profession</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{decodeItem.type}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Gender</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{decodeItem.gender}</p>
                                            </div>
                                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>           
        </div>
        )
    }
}
export default connect(null, {  })(userProfile)