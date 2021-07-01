import React, {useState,useEffect} from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom'
import {Provider} from 'react-redux';
import {store} from './redux/store';
import AdminSideNav from './layouts/AdminSideNav'
import AddSubmissionForm from './components/submissionManagement/AddSubmissionForm';
import adminDashboard from './components/adminManagement/adminDashboard';
import AddWorkshopForm from './components/workshopManagement/AddWorkshopForm';
import SubmitDocumet from './components/documentManagement/submitDocument';
import singup from './components/user-singup-login/singup';
import singin from './components/user-singup-login/singin';
import WorkshopList from './components/workshopManagement/WorkshopList';
import AddConferenceForm from './components/conferenceManagement/AddConferenceForm';
import './app.css';
import ViewSubmissions from './components/submissionManagement/viewSubmissions';
import SubmitDocument from './components/documentManagement/submitDocument';
import AddTemplate from './components/documentManagement/addTemplate';
import Templates from './components/documentManagement/templates';
import DocumentList from './components/documentManagement/documentList';
import forgetPassword from './components/user-singup-login/forgetPassword';
import updatePassword from './components/user-singup-login/updatePassword';
import jwt from 'jsonwebtoken';
import EditConferenceForm from './components/conferenceManagement/EditConferenceForm';
import userProfile from './components/userProfileManagement/userProfile';
import LandPage from './layouts/LandPage';
import WebNavbar from './layouts/WebNavbar'
import viewWorkshop from './components/workshopManagement/viewWorkshop';

export default function app(){
    useEffect(() => {
        store.dispatch({type:'ADD_USER',payload:jwt.decode(localStorage.getItem("user"))});
     }, [])
    return (
       
        <Provider store={store}>
            <WebNavbar/>
            <AdminSideNav />
            <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LandPage}/>
                <Route exact path="/singup" component={singup} />
                <Route exact path="/singin" component={singin} />
                <Route exact path="/forgetPassword" component={forgetPassword} />
                <Route exact path="/updatePassword" component={updatePassword} />
                <Route exact path="/submission/add" component={AddSubmissionForm} />
                <Route exact path='/userProfile' component={userProfile} />


                <Route exact path="/admin/dashboard" component={adminDashboard} />

                <Route exact path="/document/upload" component={SubmitDocument} />
                <Route exact path="/template/upload" component={AddTemplate} />
                <Route exact path="/templates" component={Templates} />
                <Route exact path="/submission" component={ViewSubmissions} />
                <Route exact path="/mySubmissions" component={DocumentList} />

                <Route exact path="/workshop/add" component={AddWorkshopForm} />
                <Route exact path="/workshops" component={viewWorkshop} />
                <Route exact path="/viewWorkshops" component={WorkshopList} />
                <Route exact path="/conference/add" component={AddConferenceForm}/>
                <Route exact path="/document/submit" component={SubmitDocumet} />
                <Route exact path="/conferences" component={EditConferenceForm}/>
            </Switch>
            </BrowserRouter>
        </Provider>
    )
}