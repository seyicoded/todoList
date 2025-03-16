import React from 'react'
import "../guest.css"
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom'

export default function HomeGuest() {
  return (
    <div id="content" className='content-guest'>
        <h2 id='app-title'>TO DO List</h2>
        <img id="app-icon" src={viteLogo} />
        <div>
            <Link to={"/signin"}>
                <button className='w3-btn w3-block w3-blue'>Sign In</button>
            </Link>
            <Link to={"/signup"}>
                <button className='w3-btn w3-block w3-blue'>Sign Up</button>
            </Link>
        </div>
    </div>
  )
}
