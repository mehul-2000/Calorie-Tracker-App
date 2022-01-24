import React, { useState } from 'react'
import { NavBar, Meals, DashboardForm } from '../components'
import Wrapper from '../assets/wrappers/SharedLayout'

//importing actions 

function Dashboard() {

    const [currentId, setCurrentId] = useState(null)
    return (
        <Wrapper>
            <NavBar />
            <div className="dashboard-page">
                <h1>
                    Dashboard Page
                </h1>
                <DashboardForm currentId={currentId} setCurrentId={setCurrentId} />
                <Meals currentId={currentId} setCurrentId={setCurrentId} />
            </div>
        </Wrapper>

    )
}

export default Dashboard
