import React, { Component } from 'react'
import Footer from './Footer';
import HomeSlide from './HomeSlide';
import WorkshopCard from './WorkshopCard'
import ConferenceList from './ConferenceList';

class LandPage extends Component {
    render() {
        return (
            <div className="landpage-main">
                <div className="main-body">
                    <div className="homeslide">
                        <HomeSlide />
                    </div>
                    <div>
                        <WorkshopCard />
                    </div>
                    <br/><br/><br/>
                    <div>
                        <ConferenceList/>
                    </div>
                </div>

                <div>
                    <Footer />
                </div>
            </div>

        )
    }
}

export default LandPage;