import React, { Component } from 'react';
import './admin.css'
import { connect } from 'react-redux';
import { getAllDocuments, postDocumentApprove, getAllUsers } from '../../redux/actions/adminActions';
import axios from 'axios';
import { Button, Card, Container, Row, Col, Modal, Table } from 'react-bootstrap';
import { NutFill } from 'react-bootstrap-icons';
import FilePreviewer from 'react-file-previewer';

class adminDashboard extends Component {
    constructor(props) {
        super(props);

        this.setShow = this.setShow.bind(this);
        this.approveOrRefuse = this.approveOrRefuse.bind(this);
        this.setShowMiniModal = this.setShowMiniModal.bind(this);

        this.state = {
            docs: [],
            show: false,
            modalData: [],
            showMiniModal: false,
            modalUrl: ''


        }
    }

    componentDidMount() {
        const { getAllDocuments, getAllUsers } = this.props;
        getAllDocuments();
        getAllUsers();


        // axios.get('http://localhost:5000/document/').then(
        //     res => {
        //         this.setState({
        //             docs : res.data
        //         })
        //     }
        // )
    }

    setShow(data, info, type, status) {
        this.setState({
            modalData: info,
            show: data
        })
    }

    setShowMiniModal(data, url) {
        console.log('url: ', url);
        this.setState({

            showMiniModal: data,
            modalUrl: url
        })
    }

    approveOrRefuse(data) {
        const { postDocumentApprove } = this.props;
        let values = {};

        values.id = data._id;
        values.userId = data.userId;
        values.type  = data.type;
        values.activityId = data.activityId;
        values.status = 'APPROVED';
        postDocumentApprove(values);
        this.setShow(false, []);
        window.location.reload();


    }

    render() {
        const { docs, show, fullscreen, modalData, showMiniModal, modalUrl } = this.state;
        const { documents, users } = this.props.admin;

            const filteredArray = documents.map((d) => ({
                activityId: d.activityId,
                createdAt: d.createdAt,
                fileUrl: d.fileUrl,
                status: d.status,
                type: d.type,
                updatedAt: d.updatedAt,
                userId: d.userId,
                __v: d.__v,
                _id: d._id,
                name: users.map(u =>  u._id === d.userId ? u.name : null), 
                match: users.some((u) => u._id === d.userId),
            }))

            console.log('filteredArray: ', filteredArray);
            let researchArray = filteredArray.filter((e) => {
            return e.type == 'RESEARCH' && e.match == true
        })

        let workshopArray = filteredArray.filter((e) => {
            return e.type == 'W_PROPOSAL' && e.match == true
        })

        let workshopArrayPending = workshopArray.filter((e) => {
            return e.type == 'W_PROPOSAL' && e.status == 'PENDING'
        })

        let workshopArrayApproved = workshopArray.filter((e) => {
            return e.type == 'W_PROPOSAL' && e.status == 'APPROVED'
        })

        let researchArrayPending = researchArray.filter((e) => {
            return e.type == 'RESEARCH' && e.status == 'PENDING'
        })

        let researchArrayApproved = researchArray.filter((e) => {
            return e.type == 'RESEARCH' && e.status == 'APPROVED'
        })

        return (
            <div className="body">
                <Modal
                    show={show}
                    onHide={() => this.setShow(false, [])}
                    size="xl"
                // dialogClassName="modal-style-custom"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Type</th>
                                    <th>Preview</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {modalData.length !== 0 ? modalData.map(e =>

                                    <tr>
                                        <td>{e.name[0] !== null ? e.name[0] : 'No Name'}</td>
                                        <td>{e.status}</td>
                                        <td>{e.type}</td>
                                        <td>
                                            <Button
                                             
                                                onClick={() => this.setShowMiniModal(true, e.fileUrl)}
                                            >View File</Button>

                                        </td>
                                        <td>{e.status == 'APPROVED' ? 'Already Approved' : <Button variant="primary" onClick={() => this.approveOrRefuse(e)}>{e.status == 'PENDING' ? 'Approve' : 'Refuse'}</Button>}</td>
                                    </tr>
                                )
                                    :
                                    <tr>
                                        <td>No Data</td>
                                        <td>No Data</td>
                                        <td>No Data</td>
                                        <td>No Data</td>
                                        <td>No Data</td>

                                    </tr>
                                }
                            </tbody>
                        </Table>

                    </Modal.Body>
                </Modal>

                <Modal
                    show={showMiniModal}
                    onHide={() => this.setShowMiniModal(false, '')}
                    size="xl"
                // dialogClassName="modal-style-custom"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Preview</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <FilePreviewer file={{
                            url: modalUrl
                        }}
                        />
                    </Modal.Body>
                </Modal>


                <div>
                    <Container>
                        <Row className="container-row-custom">
                            <Col sm={6} className="container-column-custom">
                                <Card className="text-center card-width">
                                    <Card.Header> Workshop Proposals</Card.Header>
                                    <Card.Body>
                                        <Card.Title>Pending</Card.Title>
                                        <div className="card-text-style">
                                            {
                                                workshopArrayPending.length
                                            }
                                        </div>
                                        <Button variant="primary" onClick={() => this.setShow(true, workshopArrayPending, 'W_PROPOSAL', 'PENDING')}>View Documents</Button>
                                    </Card.Body>
                                    {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
                                </Card>
                            </Col>
                            <Col sm={6} className="container-column-custom">
                                <Card className="text-center card-width">
                                    <Card.Header> Workshop Proposals</Card.Header>
                                    <Card.Body>
                                        <Card.Title>Approved</Card.Title>
                                        <Card.Text className="card-text-style">
                                            {
                                                workshopArrayApproved.length
                                            }
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => this.setShow(true, workshopArrayApproved, 'W_PROPOSAL', 'APPROVED')}>View Documents</Button>
                                    </Card.Body>
                                    {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
                                </Card>
                            </Col>
                        </Row>
                        <Row className="container-row-custom">
                            <Col sm={6} className="container-column-custom">
                                <Card className="text-center card-width">
                                    <Card.Header>Research Papers</Card.Header>
                                    <Card.Body>
                                        <Card.Title>Pending</Card.Title>
                                        <Card.Text >
                                            <p className="card-text-style">{
                                                researchArrayPending.length
                                            }
                                            </p>
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => this.setShow(true, researchArrayPending, 'RESEARCH', 'PENDING')}>View Documents</Button>
                                    </Card.Body>
                                    {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
                                </Card>
                            </Col>
                            <Col sm={6} className="container-column-custom">
                                <Card className="text-center card-width">
                                    <Card.Header>Research Papers</Card.Header>
                                    <Card.Body>
                                        <Card.Title>Approved</Card.Title>
                                        <Card.Text className="card-text-style">
                                            {
                                                researchArrayApproved.length
                                            }
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => this.setShow(true, researchArrayApproved, 'RESEARCH', 'APPROVED')}>View Documents</Button>
                                    </Card.Body>
                                    {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
                                </Card>
                            </Col>
                        </Row>
                    </Container>


                </div>
            </div>
        );
    }
}



const mapStateToProps = (state) => ({
    admin: state.admin,
    // docs : state.document.documents.filter(document => document.status == "PENDING" && document.type == "RESEARCH")
});
export default connect(mapStateToProps, { getAllDocuments, postDocumentApprove, getAllUsers })(adminDashboard);