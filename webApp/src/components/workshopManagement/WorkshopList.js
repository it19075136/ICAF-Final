import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllWorkshops } from '../../redux/actions/workshopActions';
import { getAllConference } from '../../redux/actions/conferenceActions';

class WorkshopList extends Component {
    state = {
        workshop: {
            workshopName: '',
            workshopDescription: '',
            flyerURL: '',
            resourcePersons: [],
            conferenceId: ''
        }
    }

    componentDidMount() {
        this.props.getAllWorkshops();
        this.props.getAllConference();
    }
    render() {
        console.log(this.props.workshops)
        console.log(this.props.conferences)
        return (
            <div>
                <center><h2>ALL WORSHOPS</h2></center>
                {this.props.workshops && this.props.conferences.length !=0 ? this.props.workshops.map(workshop => {
                    return (
                        <div className="container mt-3">
                            <div className="card">
                                <div className="row">
                                    <div className="col-md-3">
                                        <img src={workshop.flyerURL} className="img-fluid" />
                                    </div>
                                    <div className="col-md-8">
                                        <h2 classsName="card-title mt-2">Conference -{this.props.conferences != 0 ? this.props.conferences.filter(conf => conf._id == workshop.conferenceId)[0].conferenceName : <strong>Canceled!</strong>} </h2>
                                        <h3 className="card-title mt-2">Workshop - {workshop.workshopName} </h3>
                                        <p>{workshop.workshopDescription}</p>
                                        {/* <h5 class="card-title">Speakers</h5> */}
                                        {/* {workshop}
                                        <ul class="list-group list-group-horizontal">
                                            <li class="list-group-item">An item</li>
                                            <li class="list-group-item">A second item</li>
                                        </ul> */}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }): <span className="container">No Workshop Found!!!</span>}

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    workshops: state.workshop.workshops,
    conferences: state.conference.conferences
})
export default connect(mapStateToProps, { getAllWorkshops, getAllConference })(WorkshopList);