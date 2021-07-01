import React, { Component } from 'react'
import './HomeSlide.css'

class HomeSlide extends Component {
    render() {
        return (
            <section id="slideshow">

                <div className="entire-content">
                   
                    <div className="content-carrousel">
                    <div className="sub-heading">WELCOME!!!</div>
                        <figure className="shadow"><img src="/images/1.jpg" /></figure>
                        <figure className="shadow"><img src="/images/2.jpg" /></figure>
                        <figure className="shadow"><img src="/images/3.jpg" /></figure>
                        <figure className="shadow"><img src="/images/4.jpg" /></figure>
                        <figure className="shadow"><img src="/images/1.jpg" /></figure>
                        <figure className="shadow"><img src="/images/3.jpg" /></figure>
                        <figure className="shadow"><img src="/images/2.jpg" /></figure>
                        <figure className="shadow"><img src="/images/1.jpg" /></figure>
                        <figure className="shadow"><img src="/images/4.jpg" /></figure>
                    </div>
                </div>
            </section>
        )
    }
}

export default HomeSlide;