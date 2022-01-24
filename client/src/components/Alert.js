import React from 'react'
import { useSelector } from 'react-redux'

function Alert() {

    const alerts = useSelector((state) => state.alerts)
    return (
        <div className={`alert alert-${alerts.alertType}`}>
            {alerts.alertText}
        </div>
    )
}

export default Alert
