import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap'
import DocumentUploader from './documentUploader';
import './document.css'
import { addDocuments, setUploadInProgress } from '../../redux/actions/documentActions';
import { ADMIN, RESEARCH, TEMPLATE, W_PROPOSAL } from '../../redux/constants'

class addTemplate extends Component {

    state = {
        document: {
            userId: ADMIN,
            activityId: TEMPLATE,
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
            this.setState({ ...this.state, document: { ...this.state.document, file: reader.result } }, () => {
                this.props.setUploadInProgress();
                this.props.addDocuments(this.state.document).then((data) => {
                    console.log(data)
                    this.setState({ ...this.state, alert: { ...this.state.alert, open: true } }, () => {
                        setTimeout(() => {
                            this.setState({ ...this.state, alert: { ...this.state.alert, open: false } })
                        }, 1500)
                    })
                })
            });
        }

    }

    render() {


        return (
            <form className="main-form" onSubmit={this.handleUpload} >
                {this.state.alert.open ? <Alert key="1" variant="success" className="container">
                    Record added successfully!
                </Alert> : (null)}
                <Form.Group>
                    <Form.Label>Select Template Type</Form.Label>
                    <Form.Control as="select" name="activityId" onChange={(e) => this.setState({ ...this.state, document: { ...this.state.document, type: e.target.value } })}>
                        <option>Select a template type</option>
                        <option key="1" value={TEMPLATE + "_" + W_PROPOSAL}>Workshop proposal template</option>
                        <option key="2" value={TEMPLATE + "_" + RESEARCH}>Research paper template</option>
                    </Form.Control>
                </Form.Group>
                <DocumentUploader />
                <Button type="submit" className="btn btn-primary" disabled={this.props.inProgress}>{this.props.inProgress ? "Upload is in progress" : "Upload"} </Button>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({

    documents: state.document.documents,
    inProgress: state.document.inProgress,
})

export default connect(mapStateToProps, { addDocuments, setUploadInProgress })(addTemplate)