import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Alert, pro } from 'react-bootstrap'
import DocumentUploader from './documentUploader';
import './document.css';
import { addDocuments, setUploadInProgress } from '../../redux/actions/documentActions';
import { getAllWorkshops } from '../../redux/actions/workshopActions';
import { getAllSubmissions } from '../../redux/actions/submissionActions';
import { RESEARCH, W_PROPOSAL } from '../../redux/constants'

class submitDocument extends Component {

    state = {
        document: {
            userId: "",
            activityId: "",
            type: "",
            file: ''
        },
        alert: {
            open: false
        }

    }

    handleUpload = async (e) => {

        e.preventDefault();
        console.log(this.state);

        const reader = new FileReader();

        reader.readAsDataURL(this.props.documents[0]);
        reader.onloadend = () => {
            this.setState({ ...this.state, document: { ...this.state.document, file: reader.result, userId: this.props.user._id } }, () => {
                this.props.setUploadInProgress();
                this.props.addDocuments(this.state.document).then((data) => {
                    this.setState({ ...this.state, alert: { ...this.state.alert, open: true } }, () => {
                        setTimeout(() => {
                            this.setState({ ...this.state, alert: { ...this.state.alert, open: false } })
                        }, 1500)
                    })
                })
            });
        }

    }

    componentDidMount() {

        this.props.getAllSubmissions();
        this.props.getAllWorkshops();
    }

    render() {
        return (
            <form className="main" onSubmit={this.handleUpload} >
                {this.state.alert.open ? <Alert key="1" variant="success" className="container">
                    Action successfull!
                </Alert> : (null)}
                <Form.Group>
                    <Form.Label>Select submission activity( Worksop/Research )</Form.Label>
                    <Form.Control as="select" name="activityId" onChange={(e) => this.setState({ ...this.state, document: { ...this.state.document, activityId: e.target.value, type: this.props.activities.find(act => act._id == e.target.value).topic ? RESEARCH : W_PROPOSAL } })}>
                        <option>Select an activity</option>
                        {this.props.activities ? this.props.activities.filter(act => act.topic ? (Date.parse(act.deadline) > Date.parse(new Date().toString())) : (act.workshopName ? true : false)).map(act => {
                            return <option key={act._id} value={act._id}>{act.topic ? (act.topic + ' - ' + 'Research') : (act.workshopName + ' - ' + 'Workshop')}</option>
                        }) : (null)}
                    </Form.Control>
                </Form.Group>
                <p></p>
                <DocumentUploader typeHint={".pdf/.doc/.docx files only"} />
                <Button type="submit" className="btn btn-primary" disabled={this.props.inProgress}>{this.props.inProgress ? "Upload is in progress" : "Upload"} </Button>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({

    documents: state.document.documents,
    inProgress: state.document.inProgress,
    activities: [...state.submission.submissions, ...state.workshop.workshops],
    user: state.user.user

})

export default connect(mapStateToProps, { addDocuments, getAllWorkshops, getAllSubmissions, setUploadInProgress })(submitDocument)