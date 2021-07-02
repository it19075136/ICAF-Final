import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Jumbotron, Table, Form, Modal, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { Pencil, Trash } from 'react-bootstrap-icons';
import "react-datepicker/dist/react-datepicker.css";
import '../admin.css'
import '../submissionManagement/submission.css'
import { getAllSubmissions, deleteSubmission, updateSubmission } from '../../redux/actions/submissionActions'
import { getAllConference } from '../../redux/actions/conferenceActions'
import CusAlert from '../../utils/alert';

class viewSubmissions extends Component {

    state = {
        submission: {
            id: '',
            topic: '',
            description: '',
            conferenceName: '',
            deadline: null
        },
        show: false,
        alert: {
            open: false,
            result: 'success',
            message: null
        }
    }

    constructor(props) {

        super(props);
        this.props.getAllConference();
        this.props.getAllSubmissions();
    }


    render() {

        console.log(this.props.submissions);

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(this.state.submission);
            this.props.updateSubmission(this.state.submission).then((res) => {
                res ? this.setState({ ...this.state, alert: { ...this.state.alert, open: true, result: 'success' }, show: false }, () => {
                    setTimeout(() => {
                        this.setState({ ...this.state, alert: { ...this.state.alert, open: false, message: null } })
                    }, 1500)
                }) : this.setState({ ...this.state, alert: { ...this.state.alert, open: true, result: 'danger' }, show: false }, () => {
                    setTimeout(() => {
                        this.setState({ ...this.state, alert: { ...this.state.alert, open: false, message: null } })
                    }, 1500)
                })
            }).catch((err) => {
                console.log(err);
            });

        }

        const handleChange = (e) => {
            this.setState({
                ...this.state,
                submission: { ...this.state.submission, [e.target.name]: e.target.value }
            })

        }

        const handleDelete = (id) => {
            this.props.deleteSubmission(id).then((res) => {
                console.log(res);
                res && res != 'documents exist'? this.setState({ ...this.state, alert: { ...this.state.alert, open: true,result: 'success' } }, () => {
                    setTimeout(() => {
                        this.setState({ ...this.state, alert: { ...this.state.alert, open: false } })
                    }, 1500)
                }) : this.setState({ ...this.state, alert: { ...this.state.alert, open: true, result: 'danger', message: res == 'documents exist' ? 'Deletion failed,Documents already exist for the submission topic':null  } }, () => {
                    setTimeout(() => {
                        this.setState({ ...this.state, alert: { ...this.state.alert, open: false } })
                    }, 1500)
                })
            }).catch((err) => {
                console.log(err);
            })
        }

        return (
            <div className="body">
                <Jumbotron className="main">
                    <h1>All submission topics</h1>
                    {this.state.alert.open ? <CusAlert result={this.state.alert.result} message={this.state.alert.message} /> : (null)}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Conference Name</th>
                                <th>Topic</th>
                                <th>Deadline</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.submissions.length != 0 && this.props.conferences.length != 0 ? this.props.submissions.map(submission => {
                                return (<tr key={submission._id}>
                                    <td>{this.props.conferences.find(conference => conference._id == submission.conferenceId) ? this.props.conferences.find(conference => conference._id == submission.conferenceId).conferenceName : "no conference"}</td>
                                    <td>{submission.topic}</td>
                                    <td>{submission.deadline.split('T')[0]}</td>
                                    <td><Pencil className="actions" onClick={() => this.setState({
                                        ...this.state, submission: {
                                            id: submission._id,
                                            topic: submission.topic,
                                            description: submission.description,
                                            conferenceName: this.props.conferences.find(conference => conference._id == submission.conferenceId).conferenceName,
                                            deadline: submission.deadline
                                        }
                                    }, () => this.setState({ ...this.state, show: true }))} />   |  <Trash className="actions" onClick={handleDelete.bind(this, submission._id)} /></td>
                                </tr>)
                            }) : <span className="container">No data</span>}
                        </tbody>
                    </Table>
                </Jumbotron>
                <Modal show={this.state.show} onHide={() => this.setState({ ...this.state, show: false })} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update submission topic- {this.state.submission.topic}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="container" onSubmit={handleSubmit}>
                            <br />
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} placeholder={this.state.submission.description} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Deadline</Form.Label><br />
                                <DatePicker selected={this.state.submission.deadline ? new Date(Date.parse(this.state.submission.deadline)) : new Date()} name="deadline" onChange={(date) => this.setState({ ...this.state, submission: { ...this.state.submission, deadline: date } })} />
                            </Form.Group>
                            <br />
                            <Button type="submit" color="primary">Update Submission</Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ ...this.state, show: false })}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    submissions: state.submission.submissions,
    conferences: state.conference.conferences
});

export default connect(mapStateToProps, { getAllSubmissions, getAllConference, deleteSubmission, updateSubmission })(viewSubmissions)