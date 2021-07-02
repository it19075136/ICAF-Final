import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAllWorkshops } from '../redux/actions/workshopActions'

class WorkshopCard extends Component {

    constructor(props) {
        super(props);
        this.props.getAllWorkshops();
    }

    render() {
        console.log(this.props.workshop)
        return (
            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <h3 className="mb-3">Available Workshops</h3>
                        </div>
                        <div className="col-6 text-right">
                            <a className="btn btn-primary mb-3 mr-1" href="#carouselExampleIndicators2" role="button" data-slide="prev">
                                <i className="fa fa-arrow-left"></i>
                            </a>
                            <a className="btn btn-primary mb-3 " href="#carouselExampleIndicators2" role="button" data-slide="next">
                                <i className="fa fa-arrow-right"></i>
                            </a>
                        </div>

                        <div className="col-12">
                            <div id="carouselExampleIndicators2" className="carousel slide" data-ride="carousel">

                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="row">
                                            {this.props.workshop != 0 ? this.props.workshop.map(work => {
                                                return (
                                                    <div className="col-md-4 mb-3">
                                                        <div className="card">
                                                            <img className="img-fluid" alt="100%x280" src={work.flyerURL} />
                                                            <div className="card-body">
                                                                <h4 className="card-title">{work.workshopName}</h4>
                                                                <p className="card-text">{work.workshopDescription}</p>
                                                                <button type="button" class="btn btn-primary" href="#" onClick={() => window.location.href= "/viewWorkshops"}>Read More</button>  
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                )
                                            }) : (null)}

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}

const mapStateToProps = (state) => ({
    workshop: state.workshop.workshops
})

export default connect(mapStateToProps, { getAllWorkshops })(WorkshopCard);