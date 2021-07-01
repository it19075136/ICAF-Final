import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Spinner } from 'react-bootstrap'
import DocumentUploader from './documentUploader';
import './document.css'
import { addDocuments, setUploadInProgress } from '../../redux/actions/documentActions';
import { ADMIN, RESEARCH, TEMPLATE, W_PROPOSAL } from '../../redux/constants'
import CusAlert from '../../utils/alert';

class addTemplate extends Component {

    state = {
        document: {
            userId: ADMIN,
            activityId: TEMPLATE,
            type: "",
            file: ''
        },
        alert: {
            open: false,
            result: 'success',
            message: null
        }

    }

    handleUpload = async (e) => {

        e.preventDefault();
        console.log(this.state);

        const reader = new FileReader();

        if (this.props.documents[0]) {
            reader.readAsDataURL(this.props.documents[0]);
            reader.onloadend = () => {
                this.setState({ ...this.state, document: { ...this.state.document, file: reader.result } }, () => {
                    this.props.setUploadInProgress();
                    this.props.addDocuments(this.state.document).then((res) => {
                        console.log(res);
                        this.setState({ ...this.state, alert: { ...this.state.alert, open: true, result: res._id ? 'success' : 'danger' } }, () => {
                            setTimeout(() => {
                                this.setState({ ...this.state, alert: { ...this.state.alert, open: false } })
                            }, 1500)
                        })
                        console.log(this.state)
                    })
                });
            }
        }
        else {
            this.setState({ ...this.state, alert: { ...this.state.alert, open: true, result: 'danger', message: 'uploadERR' } }, () => {
                setTimeout(() => {
                    this.setState({ ...this.state, alert: { ...this.state.alert, open: false, message: null } })
                }, 1500)
            })
        }

    }

    render() {


        return (
            <div className="main-form">
                <form className="container" onSubmit={this.handleUpload} >
                    {this.state.alert.open ? <CusAlert result={this.state.alert.result} message={this.state.alert.message} /> : (null)}
                    <Form.Group>
                        <Form.Label>Select Template Type</Form.Label>
                        <Form.Control as="select" name="activityId" onChange={(e) => this.setState({ ...this.state, document: { ...this.state.document, type: e.target.value } })}>
                            <option>Select a template type</option>
                            <option key="1" value={TEMPLATE + "_" + W_PROPOSAL}>Workshop proposal template</option>
                            <option key="2" value={TEMPLATE + "_" + RESEARCH}>Research paper template</option>
                        </Form.Control>
                    </Form.Group>
                    <DocumentUploader typeHint={".pdf/.doc/.docx files only"} />
                    <Button type="submit" className="btn btn-primary" disabled={this.props.inProgress}>{this.props.inProgress ? "Upload is in progress" : "Upload"} </Button>{this.props.inProgress ? <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    /> : null}            </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

    documents: state.document.documents,
    inProgress: state.document.inProgress,
})

export default connect(mapStateToProps, { addDocuments, setUploadInProgress })(addTemplate)