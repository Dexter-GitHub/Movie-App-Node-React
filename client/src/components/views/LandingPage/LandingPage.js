import { FaCode } from "react-icons/fa"
// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'

function LandingPage() {
    return (
        <>
            <div className="app">
                <FaCode style={{ fontSize: '4rem' }} /><br />
                <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
            </div>
            <div style={{ textAlign: 'right' }}>Thanks For Using This Boiler Plate</div>
        </>
    )
}

export default LandingPage
