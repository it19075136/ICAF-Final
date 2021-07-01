import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap';
import { connect } from 'react-redux'
import { getAllConference } from '../redux/actions/conferenceActions';
import './WebSlider.css'

class WebSlider extends Component {

    constructor(props) {
        super(props);
        this.props.getAllConference();
    }

    render() {
        console.log(this.props.conferences)
        return (
            <div className="slider">
                <Carousel>
                {this.props.conferences.map((conf,index) => {
                    return (
                        
                            <Carousel.Item interval={1000}>
                                <img
                                    className="d-block w-100"
                                    src="/images/1.jpg"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>{conf.conferenceName}</h3>
                                    <p>{conf.conferenceDescription}</p>
                                    <button type="button" class="btn btn-secondary btn-lg btn-block">Start Date: {conf.startDate.split('T')[0]}</button>
                                    <br/>
                                    <button type="button" class="btn btn-secondary btn-lg btn-block">End Date: {conf.endDate.split('T')[0]}</button>
                                </Carousel.Caption>
                            </Carousel.Item>
                    )
                })}
                 </Carousel>

            </div>

        )
    }

}
const mapStateToProps = (state) => ({
    conferences: state.conference.conferences
})

export default connect(mapStateToProps, { getAllConference })(WebSlider);