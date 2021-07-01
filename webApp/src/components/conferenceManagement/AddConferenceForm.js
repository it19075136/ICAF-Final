import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { addConference } from '../../redux/actions/conferenceActions'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { TextareaAutosize } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';



class AddConferenceForm extends Component {

    state = {
        conference: {
            conferenceName: '',
            conferenceDescription: '',
            conferenceVenue: '',
            keynoteSpeaker: [{
                speakerName: '',
                speakerDesignation: ''
            }],
            startDate: '',
            endDate: '',
            tracks: [{
                trackName: '',
                trackDescription: ''
            }],
            status: 'not approved',
            other: ''
        },
        alert: {
            open: false
        }
    }

    initalvalues = {
        keynoteSpeaker: [
            {
                speakerName: '',
                speakerDesignation: ''
            }
        ]
    }

    initialTracks = {
        tracks:
        {
            trackName: '',
            trackDescription: ''
        }
    }

    render() {

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(this.state.conference);
            this.props.addConference(this.state.conference);
            this.setState({ ...this.state, alert: { ...this.state.alert, open: true } });
            setTimeout(() => {
                this.setState({
                    ...this.setState, alert: { ...this.state.alert, open: false }
                })
            }, 1000);
        }

        const handleChange = (e) => {
            this.setState({
                ...this.state,
                conference: { ...this.state.conference, [e.target.name]: e.target.value }
            })
        }

        return (
            <div className="body">
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <div>
                        <center><strong><h2>ADD CONFERENCE</h2></strong></center>
                        <br />

                        <h4>ADD KEYNOTE SPEAKERS*</h4>
                        <br />
                        <Formik
                            initialValues={this.initalvalues}
                            onSubmit={(values) => {
                                this.setState({ ...this.state, conference: { ...this.state.conference, keynoteSpeaker: values.keynoteSpeaker } }, () => {
                                    console.log(this.state.conference)
                                })
                            }}
                        >
                            {({ values }) => (
                                <Form class="form-signin">
                                    <FieldArray name="keynoteSpeaker">
                                        {({ insert, remove, push }) => (
                                            <div>
                                                {values.keynoteSpeaker.length > 0 &&
                                                    values.keynoteSpeaker.map((keynote, index) => (
                                                        <div key={index}>
                                                            <Grid item xs={12}>
                                                                <label htmlFor={`keynoteSpeaker.${index}.speakerName`} className="form-label">Speaker Name</label>
                                                                <Field
                                                                    name={`keynoteSpeaker.${index}.speakerName`}
                                                                    placeholder="Speaker Name"
                                                                    fullWidth
                                                                    type="text"
                                                                    className="form-control"
                                                                />
                                                            </Grid>

                                                            <div>
                                                                <label htmlFor={`keynoteSpeaker.${index}.speakerDesignation`} className="form-label">Speaker Designation</label>
                                                                <Field
                                                                    name={`keynoteSpeaker.${index}.speakerDesignation`}
                                                                    placeholder="Speaker Designation"
                                                                    type="text"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                            <br />
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger"
                                                                    onClick={() => remove(index)}
                                                                >
                                                                    <i class="fas fa-trash"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                <br />
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => push({ speakerName: '', speakerDesignation: '' })}
                                                >
                                                    <i class="fas fa-plus-circle"></i>
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>
                                    <br />
                                    <button type="submit" className="btn btn-primary">ADD ALL SPEAKERS</button>
                                </Form>
                            )}
                        </Formik>

                        <br /><br />
                        <hr />
                        <h4>ADD TRACKS*</h4>
                        <br />
                        <Formik
                            initialValues={this.initialTracks}
                            onSubmit={(values) => {
                                this.setState({ ...this.state, conference: { ...this.state.conference, tracks: values.tracks } }, () => {
                                    console.log(this.state.conference)
                                })
                            }}
                        >
                            {({ values }) => (
                                <Form class="form-signin">
                                    <FieldArray name="tracks">
                                        {({ insert, remove, push }) => (
                                            <div>
                                                {values.tracks.length > 0 &&
                                                    values.tracks.map((keynote, index) => (
                                                        <div key={index}>
                                                            <Grid item xs={12}>
                                                                <label htmlFor={`tracks.${index}.trackName`} className="form-label">Track Name</label>
                                                                <Field
                                                                    name={`tracks.${index}.trackName`}
                                                                    placeholder="Track Name"
                                                                    fullWidth
                                                                    type="text"
                                                                    className="form-control"
                                                                />
                                                            </Grid>

                                                            <div>
                                                                <label htmlFor={`tracks.${index}.trackDescription`} className="form-label">Track Description</label>
                                                                <Field
                                                                    name={`tracks.${index}.trackDescription`}
                                                                    placeholder="Track Description"
                                                                    type="text"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                            <br />
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger"
                                                                    onClick={() => remove(index)}
                                                                >
                                                                    <i class="fas fa-trash"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                <br />
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => push({ trackName: '', trackDescription: '' })}
                                                >
                                                    <i class="fas fa-plus-circle"></i>
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>
                                    <br />
                                    <button type="submit" className="btn btn-primary">ADD ALL SPEAKERS</button>
                                </Form>
                            )}
                        </Formik>

                        <br /><br />
                        <hr />
                        <form onSubmit={handleSubmit}>
                            <br />
                            {this.state.alert.open ? <Alert key="1" variant="success" className="container">
                                Record added successfully!
                            </Alert> : (null)}
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="conferenceName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="conferenceName"
                                        label="Conference Name"
                                        autoFocus
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        variant="outlined"
                                        id="conferenceDescription"
                                        label="Conference Description"
                                        name="conferenceDescription"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="conferenceVenue"
                                        label="Conference Venue"
                                        name="conferenceVenue"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <label htmlFor="startDate" className="form-label">Start Date</label>
                                    <input
                                        variant="outlined"
                                        type="Date"
                                        fullWidth
                                        className="form-control"
                                        id="startDate"
                                        name="startDate"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <label htmlFor="endDate" className="form-label">End Date</label>
                                    <input
                                        variant="outlined"
                                        type="Date"
                                        fullWidth
                                        className="form-control"
                                        id="endDate"
                                        name="endDate"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <label htmlFor="description" className="form-label">Other Infomation</label>
                                    <TextareaAutosize
                                        required
                                        fullWidth
                                        className="form-control"
                                        variant="outlined"
                                        id="other"
                                        name="other"
                                        onChange={handleChange}
                                    />
                                </Grid>


                            </Grid>
                            <br />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"

                            >
                                ADD CONFERENCE
                            </Button>
                        </form>
                        <br/><br/><br/>
                    </div>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    conference: state.conference
});
export default connect(mapStateToProps, { addConference })(AddConferenceForm);
