import React from 'react'
import carpet from '../images/carpet.jpg';
import maid from '../images/maid.jpg';
import marble from '../images/marble.jpg';


const Home = () => {
    return (
        <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={carpet} className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src={maid} className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src={marble} className="d-block w-100" alt="..."/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Home
