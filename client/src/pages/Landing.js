import React from 'react'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link } from 'react-router-dom'
function Landing() {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        Calorie <span>Tracking</span> App
                    </h1>
                    <p>
                        I'm baby brooklyn succulents direct trade, intelligentsia keytar marfa raw denim. Swag raw denim banh mi chillwave. Disrupt cloud bread helvetica iPhone vaporware, readymade small batch brunch pork belly flexitarian prism fanny pack selvage banh mi. Helvetica drinking vinegar austin, vexillologist deep v selvage craft beer mlkshk kogi fashion axe tofu bicycle rights lumbersexual taiyaki. Mixtape vinyl cornhole small batch, pok pok tote bag twee.

                    </p>
                    <Link to="/register" className="btn btn-hero">Login/Register</Link>
                </div>
                <img src={main} alt="calorie-img" className="img main-img" />
            </div>
        </Wrapper>
    )
}


export default Landing
