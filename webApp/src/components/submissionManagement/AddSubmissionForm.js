import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Form, Alert } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../admin.css'
import { addSubmission } from '../../redux/actions/submissionActions'
import { getAllConference } from '../../redux/actions/conferenceActions'

class AddSubmissionForm extends Component {

  state = {
    submission: {
      topic: '',
      description: '',
      conferenceId: '',
      deadline: null
    },
    alert: {
      open: false
    }
  }

  componentDidMount() {
    this.props.getAllConference();
  }

  render() {

    console.log(this.props.conferences)

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.state.submission);
      this.props.addSubmission(this.state.submission).then((res) => {
        console.log(this.props.submission.success);
        this.setState({ ...this.state, alert: { ...this.state.alert, open: true } }, () => {
          setTimeout(() => {
            this.setState({ ...this.state, alert: { ...this.state.alert, open: false } })
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
    return (
      <div className="body">
        <Form className="container" onSubmit={handleSubmit}>
          <br />
          {this.state.alert.open ? <Alert key="1" variant="success" className="container">
            Record added successfully!
          </Alert> : (null)}
          <Form.Group>
            <Form.Label>Topic</Form.Label>
            <Form.Control type="text" name="topic" placeholder="Enter a topic" onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Select conference</Form.Label>
            <Form.Control as="select" name="conferenceId" onChange={(e) => this.setState({ ...this.state, submission: { ...this.state.submission, conferenceId: e.target.value } })}>
              <option>Select a conference</option>
              {this.props.conferences ? this.props.conferences.filter(conf => conf.status == "Approved").map(conference => {
                return <option key={conference._id} value={conference._id}>{conference.conferenceName}</option>
              }) : (null)}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Deadline</Form.Label><br />
            <DatePicker selected={this.state.submission.deadline ? this.state.submission.deadline : new Date()} name="deadline" onChange={(date) => this.setState({ ...this.state, submission: { ...this.state.submission, deadline: date } })} />
          </Form.Group>
          <br />
          <Button type="submit" color="primary">Add Submission</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  submission: state.submission,
  conferences: state.conference.conferences,
});

export default connect(mapStateToProps, { addSubmission, getAllConference })(AddSubmissionForm)