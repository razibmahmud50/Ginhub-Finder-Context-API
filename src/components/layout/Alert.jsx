import React from 'react'

const Alert = ({ alert }) => {
    return (
        alert !== null && (
            <div className={alert.type}>
                <p><i className="fas fa-info-circle"></i>{alert.msg}</p>
            </div>

        )
    )
}

export default Alert;
