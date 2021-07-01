import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Download, FileWord, XLg } from 'react-bootstrap-icons';
import { Badge, Modal, Button } from 'react-bootstrap';
import FilePreviewer from 'react-file-previewer';
import { connect } from 'react-redux';
import { getAllDocuments } from '../../redux/actions/documentActions'
import './list.css'
import { RESEARCH } from '../../redux/constants';

class templates extends Component {

  constructor(props) {
    super(props);

    this.onChangeNic = this.onChangeNic.bind(this);
    this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
    this.onChangeCvc = this.onChangeCvc.bind(this);
    this.onChangeExpMonth = this.onChangeExpMonth.bind(this);
    this.onChangeExpYear = this.onChangeExpYear.bind(this);
    this.handlePaymentMethod = this.handlePaymentMethod.bind(this);
    this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
    this.onChangePinNumber = this.onChangePinNumber.bind(this);
    this.SetShow = this.SetShow.bind(this);
    this.showPayModal = this.showPayModal.bind(this);
    this.paymentComplete = this.paymentComplete.bind(this);
    this.onChangeMobileNumber = this.onChangeMobileNumber.bind(this);

    this.state = {
      show: false,
      fileUrl: '',
      payModal: false,

      itemName: '',
      userID: '',
      userMail: '',
      noOfItems: '',
      totalAmount: '',
      NIC: '',
      PhoneNumber: '',
      CardNumber: '',
      ExpirationMonth: '',
      ExpirationYear: '',
      CVC: '',

      paymentMethod: 'card',
      pinNumber: ''
    }
  }

  componentDidMount() {
    this.props.getAllDocuments();
  }

  SetShow(show, url) {
    console.log('url: ', url);
    this.setState({
      fileUrl: url,
      show: show
    })
  }

  showPayModal(data) {
    this.setState({
      payModal: data
    })

  }

  onChangeNic(e) {
    this.setState({
      NIC: e.target.value
    })
  }

  onChangeCardNumber(e) {

    this.setState({
      CardNumber: e.target.value
    })
  }

  onChangeExpMonth(e) {

    e.target.value > 12 ? alert("Please enter a number between 1 and 12") : (  //validations for the input fields

      this.setState({
        ExpirationMonth: e.target.value
      })
    )


  }

  onChangeExpYear(e) {

    this.setState({
      ExpirationYear: e.target.value
    })

  }

  paymentComplete() {
    // alert('Payment Successfull');
    this.showPayModal(false);
  }

  onChangeCvc(e) {
    this.setState({
      CVC: e.target.value
    })
  }

  handlePaymentMethod(e) {
    console.log('handleChangeDelivery: ran');

    let method = null;
    if (e.target.value == 'card') {  //assigning method according to the values
      method = 'card';
    } else if (e.target.value == 'mobile') {
      method = 'mobile';
    }
    this.setState({
      paymentMethod: method

    })

  }

  onChangeMobileNumber(e) {
    this.setState({
      PhoneNumber: e.target.value
    })
  }

  onChangePinNumber(e) {
    this.setState({
      pinNumber: e.target.value
    })
  }

  render() {

    console.log(this.props.user)

    return (
      <div className="main">
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.payModal}
          onHide={() => this.showPayModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Payment Information
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h3 className="payment-text">Payment Information</h3>
              <form onSubmit={this.onSubmit} className="container">
                <label>Choose a Payment Method</label>

                <br></br>
                <select
                  value={this.state.paymentMethod}
                  onChange={this.handlePaymentMethod}
                >
                  <option value="card">Card Payments</option>
                  <option value="mobile">Mobile Payment</option>
                </select>
                <br></br>
                <br></br>


                {this.state.paymentMethod === 'card' ?

                  <div>
                    <div className="form-group nic-card">
                      <label>Enter your NIC</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        value={this.state.NIC}
                        onChange={this.onChangeNic}
                      />
                    </div>



                    <br></br>
                    <div className="form-group nic-card">
                      <label>Card Number</label>
                      <input
                        type="text"
                        pattern="[0-9]*"
                        required
                        className="form-control"
                        value={this.state.CardNumber}
                        onChange={this.onChangeCardNumber}
                      />
                    </div>

                    <br></br>
                    <div className="form-group month-year">
                      <label>Expiration Month</label>
                      <input
                        type="text"
                        pattern="[1-9]*"
                        required
                        className="form-control"
                        maxLength="2"
                        min="1"
                        max="12"
                        value={this.state.ExpirationMonth}
                        onChange={this.onChangeExpMonth}
                      />
                    </div>
                    <br></br>
                    <div className="form-group month-year">
                      <label>Expiration Year</label>
                      <input
                        type="text"
                        pattern="[0-9]*"
                        required
                        className="form-control"
                        maxLength="4"
                        min="2020"
                        max="2050"
                        value={this.state.ExpirationYear}
                        onChange={this.onChangeExpYear}
                      />
                    </div>
                    <br></br>
                    <div className="form-group">
                      <label>CVC</label>
                      <input
                        type="text"
                        pattern="[0-9]*"
                        required
                        className="form-control cvc"
                        maxLength="3"
                        min="1"
                        value={this.state.CVC}
                        onChange={this.onChangeCvc}
                      />
                    </div>
                    <br></br>
                  </div>
                  :
                  <div>


                    <br></br>
                    <div className="form-group nic-card">
                      <label>Mobile Number</label>
                      <input
                        type="text"
                        pattern="[0-9]*"
                        required
                        className="form-control"
                        // value={ users.profile.phone}
                        onChange={this.onChangeMobileNumber}
                      />
                    </div>



                    <br></br>
                    <div className="form-group month-year">
                      <label>Four Digit Pin Number</label>
                      <input
                        type="text"
                        pattern="[0-9]*"
                        required
                        className="form-control"
                        maxLength="4"
                        value={this.state.pinNumber}
                        onChange={this.onChangePinNumber}
                      />
                    </div>
                    <br></br>

                  </div>
                }
              </form>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.paymentComplete()}>Pay Now</Button>
          </Modal.Footer>
        </Modal>

        <div className="row">
          {this.props.user && this.props.user != {} ? this.props.documents ? (
            this.props.documents.map((document) => {
              return (
                <div className="column">
                  <div className="card">
                    <Card className="root">
                      <CardHeader
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={
                          document.type == RESEARCH
                            ? "Research Paper"
                            : "Workshop Proposal"
                        }
                        subheader={
                          "Last Modified: " + document.updatedAt.split("T")[0]
                        }
                      />
                      <FileWord size={XLg} />
                      <h1 classname="center">
                        <Badge bg="secondary">{document.status}</Badge>
                      </h1>
                      <CardActions disableSpacing>
                        <IconButton aria-label="download">
                          <a href={document.fileUrl} target="_blank" download>
                            <Download />
                          </a>
                        </IconButton>
                        <IconButton
                          onClick={() => this.SetShow(true, document.fileUrl)}
                        >
                          View File
                        </IconButton>
                        <IconButton onClick={() => this.showPayModal(true)} >Pay Now</IconButton>
                        <Modal
                          show={this.state.show}
                          onHide={() => this.SetShow(false, "")}
                          size="xl"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Preview</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <FilePreviewer
                              file={{
                                url: this.state.fileUrl,
                              }}
                            />
                          </Modal.Body>
                        </Modal>
                      </CardActions>
                    </Card>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>Loading...</h1>
          ) : null}
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  user: state.user.user,
  documents: state.user.user ? state.document.documents.filter(document => document.userId == state.user.user._id):null
})

export default connect(mapStateToProps, { getAllDocuments })(templates)