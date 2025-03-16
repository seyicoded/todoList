import React from 'react'
import "../guest.css"
import viteLogo from '/vite.svg'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function SignUp() {
    const history = useHistory();
    const processAction = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.stopPropagation();
        history.push("/home/default");
    }
  return (
    <div id="content" className='content-guest'>
        <h2 id='app-title'>Sign Up</h2>

        <form onSubmit={e => {
            e.preventDefault();
            // @ts-ignore
            processAction(null);
        }} className='w3-container' style={{ height: 500 }}>
            <div>
                <input placeholder='Enter email/username' className='w3-input w3-white' required/>
                <label className='w3-label w3-validate w3-small w3-left'>Email/Username</label>
            </div>
            <br />

            <div>
                <input placeholder='Enter First Name' className='w3-input w3-white' required/>
                <label className='w3-label w3-validate w3-small w3-left'>First Name</label>
            </div>
            <br />

            <div>
                <input placeholder='Enter Last Name' className='w3-input w3-white' required/>
                <label className='w3-label w3-validate w3-small w3-left'>Last Name</label>
            </div>
            <br />

            <div>
                <input placeholder='Enter Password' className='w3-input w3-white' type='password' required/>
                <label className='w3-label w3-validate w3-small w3-left'>Password</label>
            </div>

            <br />
            <br />

            <button type='button' onClick={(e)=> processAction(e)} className='w3-btn w3-blue w3-block'>Submit</button>
        </form>
        <div>
            <div>
                Don't have an account,  
                <Link to={"/signin"}><a> click to sign up</a></Link>
            </div>

            <Link to={"/"}>
                <button className='w3-button w3-white'> <FontAwesomeIcon icon={faChevronLeft} /> Go Back</button>
            </Link>
        </div>
    </div>
  )
}
