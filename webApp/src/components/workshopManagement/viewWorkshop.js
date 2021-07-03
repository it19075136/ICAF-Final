import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllWorkshops, updateWorkshopById, deleteWorkshop } from '../../redux/actions/workshopActions';
import { getAllConference } from '../../redux/actions/conferenceActions';
import { Jumbotron, Table, Form, Modal, Button, Alert } from 'react-bootstrap';
import { getAllUsers } from '../../redux/actions/adminActions'

class viewWorkshop extends Component {
    state = {
        workshop: {
            id: '',
            workshopName: '',
            workshopDescription: ''
        },
        show: false,
        alert: {
            open: false,
            openError: false
        }
    }

    componentDidMount() {
        this.props.getAllWorkshops();
        this.props.getAllConference();
        this.props.getAllUsers();
    }
    render() {
        console.log(this.props.workshops)
        console.log(this.props.conferences)
        console.log(this.props.admin)

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(this.state.workshop);
            this.props.updateWorkshopById(this.state.workshop, this.state.workshop.id).then((res) => {
                res ? this.setState({ ...this.state, alert: { ...this.state.alert, open: true }, show: false }, () => {
                    setTimeout(() => {
                        this.setState({ ...this.state, alert: { ...this.state.alert, open: false } })
                    }, 1500)
                }) : this.setState({ ...this.state, alert: { ...this.state.alert, openError: true }, show: false }, () => {
                    setTimeout(() => {
                        this.setState({ ...this.state, alert: { ...this.state.alert, openError: false } })
                    }, 1500)
                })
            }).catch((err) => {
                console.log(err);
            });

        }

        const handleChange = (e) => {
            this.setState({
                ...this.state,
                workshop: { ...this.state.workshop, [e.target.name]: e.target.value }
            })

        }


        const handleDelete = (id) => {
            this.props.deleteWorkshop(id).then((res) => {
                console.log(res);
                res ? this.setState({ ...this.state, alert: { ...this.state.alert, open: true } }, () => {
                    setTimeout(() => {
                        this.setState({ ...this.state, alert: { ...this.state.alert, open: false } })
                    }, 1500)
                }) : this.setState({ ...this.state, alert: { ...this.state.alert, openError: true } }, () => {
                    setTimeout(() => {
                        this.setState({ ...this.state, alert: { ...this.state.alert, openError: false } })
                    }, 1500)
                })
            }).catch((err) => {
                console.log(err);
            })
        }

        return (
            <div className="body">
                <center><h1>ALL Workshops</h1></center>
                {this.state.alert.open ? <Alert key="1" variant="success" className="container">
                    Action successfully!
                </Alert> : (null)}
                {this.state.alert.openError ? <Alert key="1" variant="error" className="container">
                    Action failed!
                </Alert> : (null)}
                <br />
                <div className="edit-table">
                    <table>
                        <tr className="table-primary col-sm">
                            <th>Workshop Name</th>
                            <th>Description</th>
                            <th>Resource Person Name</th>
                            <th>Conference Name</th>
                            <th>Action</th>
                        </tr>

                        {this.props.workshops && this.props.conferences && this.props.admin != 0 ? this.props.workshops.map(workshop => {
                            return (
                                <tr key={workshop._id}>
                                    <td>{workshop.workshopName}</td>
                                    <td>{workshop.workshopDescription}</td>
                                    <td>{workshop.resourcePersons.map(person => {
                                        return (
                                            <div> {this.props.admin.find(user => user._id == person).name}</div>
                                        )
                                    })}</td>
                                    <td>{this.props.conferences != 0 ? this.props.conferences.filter(conf => conf._id == workshop.conferenceId)[0].conferenceName : <strong>No conference Selected</strong>}</td>
                                    <td><button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => this.setState({
                                            ...this.state, workshop: {
                                                id: workshop._id,
                                                workshopName: workshop.workshopName,
                                                workshopDescription: workshop.workshopDescription
                                            }
                                        }, () => this.setState({ ...this.state, show: true }))}
                                    >
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={handleDelete.bind(this, workshop._id)}
                                        >
                                            <i class="fas fa-trash-alt"></i>
                                        </button></td>

                                </tr>
                            )
                        }) : <strong>No Workshop Found!!!</strong>}
                    </table>
                </div>
                <Modal show={this.state.show} onHide={() => this.setState({ ...this.state, show: false })} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Workshop - {this.state.workshop.workshopName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="container" onSubmit={handleSubmit}>
                            <br />
                            <Form.Group>
                                <Form.Label>Workshop Name</Form.Label>
                                <Form.Control as="textarea" rows={3} name="workshopName" onChange={handleChange} placeholder={this.state.workshop.workshopName} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} name="workshopDescription" onChange={handleChange} placeholder={this.state.workshop.workshopDescription} />
                            </Form.Group>

                            <br />
                            <Button type="submit" color="primary">Update Workshop</Button>
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
    workshops: state.workshop.workshops,
    conferences: state.conference.conferences,
    admin: state.admin.users
})
export default connect(mapStateToProps, { getAllWorkshops, getAllConference, updateWorkshopById, getAllUsers, deleteWorkshop })(viewWorkshop);