import React, { Component } from 'react'
import './ConferenceList.css'
import { connect } from 'react-redux'
import { getAllConference } from '../redux/actions/conferenceActions'

class ConferenceList extends Component {

    constructor(props) {
        super(props);
        this.props.getAllConference();
    }

    render() {
        console.log(this.props.conferences)
        return (


            
            <div>  
                    <center><h1>All Conferences</h1></center>
                
                {this.props.conferences != 0 ? this.props.conferences.filter(conf => conf.status == "Approved").map(conference => {
                    return (
                        <div>
                            <section className="black">
                                <div className="wrap">
                                    <h3>{conference.conferenceName}</h3>
                                    <p className="p-style-custom">{conference.conferenceDescription}</p>
                                    <div className="separator01"></div>
                                    <p className="p-style-custom">Start Date: {conference.startDate.split('T')[0]} | End Date: {conference.endDate.split('T')[0]} | Location: {conference.conferenceVenue}</p>
                                    <h4>Speakers</h4>
                                    {conference.keynoteSpeaker.map(speaker => {
                                        return (
                                            <p className="p-style-custom"><i class="fas fa-star-of-life"></i> {speaker.speakerName} - {speaker.speakerDesignation}</p>
                                        )
                                    })}
                                    <h4>Tracks</h4>
                                    {conference.tracks.map(track => {
                                        return (
                                            <p className="p-style-custom"><i class="fas fa-star-of-life"></i> {track.trackName} -{track.trackDescription}</p>
                                        )
                                    })}
                                </div>
                            </section>

                            <section className="white">
                                <div className="wrap">
                                    <p className="p-style-custom">“All our dreams can come true, if we have the courage to pursue them.” – Walt Disney</p>
                                    <div className="separator02"></div>
                                    <br />
                                    <p className="p-style-custom">“It is only when we take chances, when our lives improve. The initial and the most difficult risk that we need to take is to become honest. —Walter Anderson</p>
                                </div>
                            </section>
                        </div>
                    )

                }) : null}
               
            </div>

          

        )
    }
}

const mapStateToProps = (state) => ({
    conferences: state.conference.conferences
})
export default connect(mapStateToProps, { getAllConference })(ConferenceList);